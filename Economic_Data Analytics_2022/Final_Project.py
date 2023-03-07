# FinalProject.py
# Merging imports
# Authors: Isaiah Williams, David Cheng

from typing import Dict
from regex import A
from sympy import Sum, false, product

# Analytics import
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sb
import numpy as np
import zipfile

# GUI Imports
import gui
import webbrowser
import warnings

# Turn off deprecated method warnings
warnings.filterwarnings("ignore")

# Reading the specified CSV files and furthermore specifying necessary columns to reduce data size being imported
def read_csv_files():
    """
    Read csv and excel data specifying the necessary columns to import for analysis from each datasource
    Returns:
    1) naics_lookup_table (DataFrame): Pandas DataFrame containing unique codes registered to each industry by North American Standard 
    2) wage_employment_data (DataFrame): Pandas DataFrame containing information regarding employment by province, year and sector as well as average salaries for each 
    3) unemployment_rate_data (DataFrame): Pandas DataFrame containing information regarding unemployment rate by province, year and sector
    4) hours_worked_data (DataFrame): Pandas DataFrame containing information regarding average hours worked by province, year and sector
    """
    # Extracting csv files from zip
    zipfile.ZipFile('Hours Worked.csv.zip').extractall() 
    zipfile.ZipFile('Total compensation and number of jobs.csv.zip').extractall()
    zipfile.ZipFile('Unemployment Rate.csv.zip').extractall()

    # Importing number of people employed and salary data
    wage_employment_data = pd.read_csv(
        "Total compensation and number of jobs.csv", usecols=[0, 1, 3, 4, 5, 7, 11]
    )
    # Importing unemplyment rate data and renaming columns for clarity of use
    unemployment_rate_data = pd.read_csv(
        "Unemployment Rate.csv", usecols=[0, 1, 3, 4, 5, 6, 7, 13]
    ).rename(columns={"VALUE": "Unemployment_Rate"})

    # Importing average hourse worked per week data and renaming columns for clarity of use
    hours_worked_data = pd.read_csv(
        "Hours Worked.csv", usecols=[0, 1, 3, 4, 5, 6, 7, 13]
    ).rename(columns={"VALUE": "Standard_Hours"})

    # Importing North American Industry Classification System lookup table of sector names and job codes, renaming columns for clarity of use
    naics_lookup_table = pd.read_excel(
        "North American Industry Classification System (NAICS).xlsx",
        usecols=[1, 2],
        dtype=str,
    ).rename(
        columns={"2022 NAICS US   Code": "Sector", "2022 NAICS US Title": "Job_Title"}
    )

    return (
        naics_lookup_table,
        wage_employment_data,
        unemployment_rate_data,
        hours_worked_data,
    )


# Querying each of the passed tables and returning the desired rows of information
def query_csv_files(wage_employment_data, unemployment_rate_data, hours_worked_data):
    """
    Querying argument DataFrames by individual specific criteria to reduce DataFrames to only pertinent information for analysis of DataFrames
    Args:
        1) wage_employment_data (DataFrame): Pandas DataFrame containing information regarding employment by province, year and sector as well as average salaries for each 
        2) unemployment_rate_data (DataFrame): Pandas DataFrame containing information regarding unemployment rate by province, year and sector
        3) hours_worked_data (DataFrame): Pandas DataFrame containing information regarding average hours worked by province, year and sector
    Returns:
        1) wage_employment_data (DataFrame): Pandas DataFrame filtered to only contain information assocaited with "Total number of jobs" and "Total compensation per job", excluding rows pertaining to Canada rather than individual provinces and years prior to 2011
        2) unemployment_rate_data (DataFrame): Pandas DataFrame filtered to only contain information assocaited with "Unemployment rate" and "Both sexes", excluding rows pertaining to Canada rather than individual provinces and years prior to 2011
        3) hours_worked_data (DataFrame): Pandas DataFrame filtered to only contain information assocaited with "Average actual hours (worked in reference week, main job), "Employees" and  "Both sexes", excluding rows pertaining to Canada rather than individual provinces and years prior to 2011
    """
    # Filtering dataframes by listed criteria
    wage_employment_data.query(
        "(`Labour statistics` == 'Total number of jobs' or `Labour statistics` == 'Total compensation per job') and GEO != 'Canada' and REF_DATE>2010",
        inplace=True,
    )
    unemployment_rate_data.query(
        "`Labour force characteristics` == 'Unemployment rate' and GEO != 'Canada' and REF_DATE>2010 and `Sex`=='Both sexes'",
        inplace=True,
    )
    hours_worked_data.query(
        "`Actual hours worked` == 'Average actual hours (worked in reference week, main job)' and GEO != 'Canada' and REF_DATE>2010 and `Class of worker`=='Employees' and `Sex`=='Both sexes'",
        inplace=True,
    )
    return (
        wage_employment_data,
        unemployment_rate_data,
        hours_worked_data,
    )  # Returning DataFrames


# Extracting all NAICS job codes from text job name descriptions
def extract_keys(column_for_extract):
    """
   Using regular expressions to parse DataFrame columns containing varying formatted sector names for stringently upheld job codes linked to individual sectors
    Args:
        1) column_for_extract (DataSeries): Pandas DataSeries containing information regarding the sectors each line in the excel sheet refer too
    Returns:
        1) Pandas DataSeries containing lists of job codes contained in each sector description
    """
    return column_for_extract.str.findall(
        r"[\[\,]?([A-Z]?[0-9]+[\-]?[0-9]+[A-Z]?)[\]\,]?"
    )


# Return a boolean array identifying whether or not NAICS_codes were extracted for each text job name descriptions
def mask_codes(naics_codes):
    """
    Masking list outputs in NAICS_Codes column of DataFrames to see if any of the rows do not contain an extracted code following extract_keys(column_for_extract) function. Removes rows associated with high level totalling
    
    Args:
        1) naics_codes (DataSeries): Pandas DataSeries with each row containing a list of NAICS_Codes extracted from sector descriptions
    Returns: 
        1) Boolean Pandas DataSeries masking regarding weather or not job codes can be associated with each row
    """
    try:
        count = len(naics_codes)  # Checking length of list in DataSeries item
    except:
        return False  # Return false if error generated when getting length of list in column, due to absence of NAISC_Codes or unexpected data in column
    return (
        count >= 1
    )  # Return false if an empty list is within the column, return true if a list of NAISC codes is within the column


# Return an interpreted list of ranges ex: 16-18 with individual values in range
def convert_ranges(naics_codes):
    """
    Parsing NAISC_Codes column in DataFrames and changing ranges represented as 11-15 into the subsequent range of values
    
    Args:
        1) naics_Codes (DataSeries): Pandas DataSeries with each row containing a list of NAICS_Codes extracted from sector descriptions
    Returns: 
        1) Pandas DataSeries with each row containing a NAISC_codes and all ranges interpreted into individual codes
    """
    final_key = []
    for code in naics_codes:
        code = str(code)  # Converting each code stored in DataSeries item list to str
        code_split = code.split(
            "-:"
        )  # Splitting codes on ":" or "-" operators indicating that a range of values may be represented
        if code in [
            "31-33",
            "44-45",
            "48-49",
        ]:  # Do not convert these codes to ranges of values as these are actual NAISC codes pertaining to sectors Manufacturing (31-33), Retail Trade (44-45) and Transportation and Warehousing (48-49).
            final_key += [
                code
            ]  # Add elements with above format directly back into final NAISC codes list
        elif (
            len(code_split) == 2
        ):  # If split function above results in a list with two values this is a range being represented
            final_key += [
                x for x in range(int(code_split[0]), int(code_split[1]) + 1) if str(x)
            ]  # Based on the split express the items in a loop comprehension for range and return all items in the range, append each item to list of NAISC codes
        else:
            final_key += [
                code
            ]  # If after split function list is a singular value append to refined NAISC job codes list
    return final_key


# Cross joining NAICS Lookup Table of codes with unique list of items
def cross_join(join_data, column_name, naics_lookup_table, unemployment_rate_data):
    """
    This function performs cross joins on the naisc_lookup_table based on the column criteria passed to it. Designed to create a full lookup table with reference to key parameters
    ex: If a column containing unique provinces each row in naics_lookup_table will be duplicated by the number of unique provinces and each assigned to one of the provinces. Provides a reference to each sector in each province
    Args:
        1) join_data (String): Column name of data to be cross joined to the naisc_lookup_table
        2) column_name (String): Pandas Desired column name for data to be cross joined onto the naics_lookup_table
        3) naics_lookup_table (DataFrame): Pandas DataFrame containing unique codes registered to each industry by North American Standard 
        4) unemployment_rate_data (DataFrame): A table by which a unique list of items can be derived based on the user specified join_data 
    Returns:
        1) naics_lookup_table (DataFrame): Pandas DataFrame of unique NAICS job codes registered to each industry cross joined with the join_data passed
    """
    join_data = (
        unemployment_rate_data[join_data].unique().tolist()
    )  # Getting list of unique values in user specified column to be cross joined to naics_lookup_table
    join_data = pd.DataFrame(
        data=join_data, columns=[column_name]
    )  # Converting list of items into DataFrame for merging purposes
    naics_lookup_table = naics_lookup_table.merge(
        join_data, how="cross"
    )  # Perform cross join onto naics_lookup_table
    return naics_lookup_table


# Cross joining groups od descriptiong generating list of NAICS_Codes column with their respective rows
def cross_join_naics_dataframe_lists(row):
    """
     This function performs internal cross joins on the DataFrames which implement this function with their respective lists of extracted codes in the NAICS_Codes column
    ex: Duplicates row in calling DataFrame for each code listed in the respective rows NAICS_Codes lists. Generating a row corresponding to each individual code for joining purposes
    Args:
        1) row (DataFrame): Called within apply function this varaible is auto generated and contains a single row of information at a time
    Returns:
        1) DataFrame: Pandas DataFrame with row duplicated for each NAICS code listed in its NAICS_Codes column
    """
    matching_keys = row["NAICS_Codes"].iloc[0]  # Get list of NAICS codes extracted from sector descriptions and stored in NAICS_codes column
    return (
        pd.concat(
            [row] * len(matching_keys), keys=matching_keys
        )  # Using concat to duplicate rows by the number of items in the list of NAICS codes and then setting each respective code in the list with one of the resulting rows
        .reset_index(
            level=1, drop=True
        )  # Dropping the original incrimental index associated with row
        .rename_axis("NAIC_Code")  # Renaming associated NAICS codes index as NAIC_Code
        .reset_index()  # Converting the index into DataFrame column and values rather than index
    )


def split_wage_employment(final_wage_employment_data):
    """
    This function partitions the Pandas DataFrame final_wage_employment_data into two seperate DataFrames based on the nature of the value in "Labour statistics", as information not conveyed on the same row. 
    Generates 2 tables corresponding to jobs in the sector and average salary respectively.
    Args:
        1) final_wage_employment_data (DataFrame): Pandas DataFrame corresponding to wage and employment data as well as DataFrame final_wage_employment_data
    Returns:
        1) wage_data (DataFrame): Pandas DataFrames associted with annual salries by province, sector and year
        2) jobs_data (DataFrame): Pandas DataFrames associted with employment by province, sector and year
    """
    # Get rows where "Labour statistics" column contains the value "Total compensation per job", correalting to average annual salaries
    wage_data = final_wage_employment_data.loc[
        final_wage_employment_data["Labour statistics"] == "Total compensation per job"
    ]
    wage_data = wage_data.rename(
        columns={"VALUE": "Salary"}
    )  # Rename columns for clarity when conveying data

    # Get rows where "Labour statistics" column contains the value "Total number of jobs", correalting to number of people employed
    jobs_data = final_wage_employment_data.loc[
        final_wage_employment_data["Labour statistics"] == "Total number of jobs"
    ]
    jobs_data = jobs_data.rename(
        columns={"VALUE": "Employed"}
    )  # Rename columns for clarity when conveying data
    return wage_data, jobs_data


def merge_datasets(
    naics_lookup_table,
    wage_data,
    jobs_data,
    final_hours_worked_data,
    final_unemployment_rate_data,
):
    """
    This function uses the passed Pandas DataFrames and performs join operations
    Args:
        1) naics_lookup_table (DataFrame): Pandas DataFrame containing unique codes registered to each industry by North American Standard and associated with each province and year to be analyzed
        2) wage_data (DataFrame): Pandas DataFrame containing information regarding the average annual salary for each profession based on province and year
        3) jobs_data (DataFrame): Pandas DataFrame containing information regarding the employment for each sector based on province and year
        4) final_hours_worked_data (DataFrame): Pandas DataFrame containing information regarding the average hours worked within each sector based on province and year
        5) final_unemployment_rate_data: (DataFrame): Pandas DataFrame containing information regarding the unemployment rates for each sector based on province and year
    Returns:
        1) naics_lookup_table (DataFrame): Pandas DataFrame containing all the necessary data from each of the parameters passed
    """
    naics_lookup_table = pd.merge(
        naics_lookup_table,
        wage_data[
            ["NAIC_Code", "REF_DATE", "GEO", "Labour statistics", "UOM", "Salary"]
        ],  # Selecting columns to be merged from wage_data DataFrame
        left_on=[
            "Provinces",
            "Sector",
            "Years",
        ],  # Merging based on province, sector and year
        right_on=["GEO", "NAIC_Code", "REF_DATE"],
        how="left",  # Keeping all information in naics_lookup_table and joining corresponding rows
        suffixes=(
            "",
            "_Wage",
        ),  # Changing suffixes for duplicate columns to delineate them in the larger DataFrame being created
    ).drop(
        columns=["GEO", "NAIC_Code", "REF_DATE"], axis=1
    )  # Dropping expendable columns used for merge

    naics_lookup_table = pd.merge(
        naics_lookup_table,
        jobs_data[
            ["NAIC_Code", "REF_DATE", "GEO", "Labour statistics", "UOM", "Employed"]
        ],  # Selecting columns to be merged from wage_data DataFrame
        left_on=[
            "Provinces",
            "Sector",
            "Years",
        ],  # Merging based on province, sector and year
        right_on=["GEO", "NAIC_Code", "REF_DATE"],
        how="left",  # Keeping all information in naics_lookup_table and joining corresponding rows
        suffixes=(
            "",
            "_Jobs",
        ),  # Changing suffixes for duplicate columns to delineate them in the larger DataFrame being created
    ).drop(
        columns=["GEO", "NAIC_Code", "REF_DATE"], axis=1
    )  # Dropping expendable columns used for merge

    naics_lookup_table = pd.merge(
        naics_lookup_table,
        final_hours_worked_data[
            [
                "NAIC_Code",
                "REF_DATE",
                "GEO",
                "Actual hours worked",
                "UOM",
                "Standard_Hours",
            ]
        ],  # Selecting columns to be merged from wage_data DataFrame
        left_on=[
            "Provinces",
            "Sector",
            "Years",
        ],  # Merging based on province, sector and year
        right_on=["GEO", "NAIC_Code", "REF_DATE"],
        how="left",  # Keeping all information in naics_lookup_table and joining corresponding rows
        suffixes=("", "_Hours"),
    ).drop(
        columns=["GEO", "NAIC_Code", "REF_DATE"], axis=1
    )  # Dropping expendable columns used for merge

    naics_lookup_table = pd.merge(
        naics_lookup_table,
        final_unemployment_rate_data[
            ["Labour force characteristics", "UOM", "Unemployment_Rate"]
        ],  # Selecting columns to be merged from wage_data DataFrame
        left_on=[
            "Provinces",
            "Sector",
            "Years",
        ],  # Merging based on province, sector and year
        right_index=True,  # Merging based on DataFrame index of province, sector and year
        how="left",  # Keeping all information in naics_lookup_table and joining corresponding rows
        suffixes=(
            "",
            "_Unemployment",
        ),  # Changing suffixes for duplicate columns to delineate them in the larger DataFrame being created
    )
    return naics_lookup_table


def calculate_min_max(x, **kwarg):
    """
     This function is implemented through an apply function called by DataFrames using groupby. It is designed to analyze the groups within the calling Pandas DataFrame based on the metric value being 
     analyzed name passed to **kwarg, and generates a 2 row sub DataFrame with a column indicating if it contains the min value or the max value within its group.
    Args:
        1) x (DataFrame): Called within apply function this variable is auto generated and contains the information for a single group in the calling DataFrames groupby
    Returns:
        1) **kwarg (String): String of the metric for which information is being calcualted for ex: 'Salary'
        2) minandmax (DataFrame): 2 row Pandas DataFrame with indicating whether the parameter defined column contains the min or max value
    """
    try:
        x = x.sort_values(
            by=[kwarg["col"]], inplace=False
        )  # Sort values in ascending order based on metric passed to function through **kwarg
        x = x[
            ~x[kwarg["col"]].isnull()
        ]  # Select rows that do not contain null values as min will be incorrectly classified as these rows
        x = x.reset_index(drop=True)  # Resolve indexing as first and last row chosen
        minandmax = x.iloc[
            [0, -1], :
        ]  # Locate first and last row in sorted Pandas DataFrame
        minandmax["min_max"] = [
            "min",
            "max",
        ]  # Assign first row as min and second as max
        return minandmax
    except:  # If removal of null operation above results in a a null Pandas DataFrame return nothing
        pass


def format_currency(data):
    """
    This function converts numeric values in a pandas DataFrame into currency format
    Args:
        1) data (DataFrame): Pandas DataFrame on which the values will be converted to currency format
    Returns:
        1) data (DataFrame): Pandas DataFrame with currency formatted values
    """
    for i in range(data.shape[0]):  # Loop over rows of DataFrame
        for y in range(data.shape[1]):  # Loop over columns in DataFrame
            try:
                if (
                    data.iloc[i, y] == np.nan
                ):  # If value is nan do not format as currency
                    continue
                data.iloc[i, y] = "${:,.2f}".format(
                    data.iloc[i, y]
                )  # If the data can be converted to currency format convert
            except:  # If value is not possible to convert to currency format skip
                continue
    return data


def format_percent(data):
    """
    This function converts numeric values in a pandas DataFrame into percent format
    Args:
        1) data (DataFrame): Pandas DataFrame on which the values will be converted to percent format
    Returns:
        1) data (DataFrame): Pandas DataFrame with percent formatted values
    """
    for i in range(data.shape[0]):  # Loop over rows of DataFrame
        for y in range(data.shape[1]):  # Loop over columns in DataFrame
            try:
                if (
                    data.iloc[i, y] == np.nan
                ):  # If value is nan do not format as currency
                    continue
                data.iloc[i, y] = "{:,.2f}%".format(
                    data.iloc[i, y]
                )  # If the data can be converted to currency format convert
            except:  # If value is not possible to convert to currency format skip
                continue
    return data


def project_spans(data, factor):
    """
    Creates yearly rate of change measuring columns and prints a DataTable conveying the information
    Args:
        1) data (DataFrame): Pandas DataFrame on which growth rate will be calculated
        2) factor (String): The factor that growth rate will be measured on
    Returns:
        1) data (DataFrame): Pandas DataFrame with year over year growth rate columns created ex: 2010-2011, 2011-2012...
    """
    unique_years = data["Years"].unique()  # Generate list of years picked by the user
    data = (
        data.groupby(["Provinces", "Job_Title", "Years"])[factor]
        .mean()
        .unstack(level=2)
    )  # Generate a table with a heierarchial index corresponding to Provinces and Job Title, with Years as columns, and factor as values
    created_names = []
    for i, j in enumerate(
        unique_years[0:-1]
    ):  # Iterate over first to N-1 year columns for span creation
        yearstart = unique_years[i]  # Based on index return year
        yearend = unique_years[
            i + 1
        ]  # Based on index return subsequent year in DataFrame
        col_name = "{}-{}".format(
            yearstart, yearend
        )  # Create column name corresponding to time span over which growth calculated ex: 2012-2015, 2015-2016, 2016-2017... if the user has selected these years
        data[col_name] = (
            (data[yearend] - data[yearstart]) / data[yearstart]
        ) * 100  # Calculating rate of change
        created_names += [col_name]  # Creating list of newly created column names
    data = data[
        created_names
    ]  # Selecting only columns corresponding to growth rate spans
    data["Overall Trend"] = data.mean(
        axis=1
    )  # Create an overall mean rate of change for the row
    data = data.sort_values(by=["Overall Trend"], ascending=False).head(
        10
    )  # Sort the Overall Trend from highest to lowest rates of change
    return data


def high_level_metrics(data, level1, level2, factor, method):
    """
    Pandas DataTable generatorimplements 2 level groupby and summarization by metric, based on parameters passed to the function
    Args:
        1) data (DataFrame): Pandas DataFrame on which summarization calculations will be performed
        2) level1 (String): The first level of the heierarchial groupby operation
        3) level2 (String): The second level of the heierarchial groupby operation will be the columns
        4) factor (String): The metric value on which calculations will be performed 
        5) method (String): The mathematical operation that will be applied to the factor
    Returns:
        1) data (DataFrame): Pandas DataFrame to the parameter specifications with row totals calculated as Overall Mean
    """
    data = data.groupby([level1, level2]).agg({factor: method})
    data = data.unstack(
        level=1
    )  # Convert second level of heierarchial index into columns
    data["Overall Mean"] = data.mean(axis=1)  # Create total column by row
    data = data[
        ~data["Overall Mean"].isnull()
    ]  # Remove rows with null data for sorting puposes
    data = data.sort_values(by=["Overall Mean"], ascending=False).round(
        2
    )  # Display data to two decimal places
    return data


def get_filtered_df(search_array, df):
    """ Returns filtered dataframe given array of search parameters, 
    Args:
        search_array (array): [Province, Industry, year]
        df (Dataframe): MultiIndex Pandas DataFrame 
    Returns:
        (DataFrame): filtered df for search parameters
    """
    try:
        df = df.drop(columns=["Unnamed: 0"])
    except:
        pass

    for i in range(len(search_array)):
        # if "all" value in search_array element replace empty string with for all unique
        # values so that the search returns all values
        if search_array[i] == "all":
            search_array[i] = df.index.get_level_values(i).unique()
        else:
            search_array[i] = search_array[i]

    # if year is chosen from user, convert year choice to integer
    if isinstance(search_array[2], str):
        search_array[2] = int(search_array[2])

    return df.loc[(search_array[0], search_array[1], search_array[2])]


def get_multi_dataframe(collective_dataset):
    """Retrieves dataframe and converts to multidimentional based on province, job title and year
    Returns:
        multi_df (DataFrame): Multidimentional DataFrame with 3 levels
    """

    multi_df = collective_dataset.set_index(
        ["Provinces", "Job_Title", "Years"]
    ).sort_index(level=0)
    return multi_df


def display_describe_dataframe(collective_dataset):
    """Display aggregate stats for the entire dataset
    Args:
        collective_dataset (DataFrame): Dataframe of entire dataset
    """
    print("The overall metrics for the datasets are: ")
    print(collective_dataset.describe().round(2), end="\n\n")


def generate_new_features(collective_dataset):
    """Generate earning/hour, employement rate and number unemployed as new columns and return in place
    Args:
        collective_dataset (DataFrame): MultiIndex Pandas DataFrame
    Returns:
        collective_dataset (DataFrame): MultiIndex Pandas DataFrame
    """

    # Earnings/ Hour = ((Salary(Annual) / 52(Weeks)) / (Standard_Hours))
    collective_dataset["Earnings per hour"] = pd.Series.divide(
        (collective_dataset["Salary"] / 52), collective_dataset["Standard_Hours"]
    )

    # Employment_Rate = (1 - Unemployment_Rate(%) / 100), Employed = Total Sector Job Demand * (Employment_Rate)) => Total Sector Job Demand = Employed / Employment_Rate
    collective_dataset["Total Sector Job Demand"] = pd.Series.divide(
        collective_dataset["Employed"],
        (1 - (collective_dataset["Unemployment_Rate"] / 100)),
    )

    # Unemployed = Total Sector Job Demand * (Unemployment_Rate))
    collective_dataset["Unemployed"] = collective_dataset["Total Sector Job Demand"] * (
        collective_dataset["Unemployment_Rate"] / 100
    )
    return collective_dataset


def display_pivot_data(data_subset):
    """Pivot table outlining hourly earning, annual salarys, and Weekly Salarys. 
    Args:
        data_subset (DataFrame): Dataframe of filtered data
    """

    if isinstance(data_subset, pd.Series):
        print("Statistics for job demand based on selections\n")
        print(data_subset)
        return

    print(
        "\n\nThis is a pivot table outlining hourly wage, annual salary, and standard hours for each sector on a province basis:"
    )

    pvt1 = data_subset.pivot_table(
        ["Earnings per hour", "Standard_Hours", "Salary"],
        index=["Provinces", "Job_Title"],
        columns="Years",
        aggfunc="mean",
    )
    print(pvt1)
    print(
        "\n\nThis is a pivot table outlining stats for job demand based on your selections:"
    )
    pvt1 = data_subset.pivot_table(
        ["Employed", "Unemployed", "Total Sector Job Demand",],
        index=["Provinces", "Job_Title"],
        columns="Years",
        aggfunc=sum,
    )

    print(pvt1.replace([0], np.nan))


def get_valid_choices(index):
    """Returns lists of each unique value in each index level
    Args:
        index (list of tuples): index for the dataframe
    Returns:
        valid_provinces, valid_job_title, valid_year : unique values for each category
    """

    valid_provinces = list(set([i[0] for i in index]))
    valid_job_title = list(set([i[1] for i in index]))
    valid_year = list(set([str(i[2]) for i in index]))
    valid_provinces.append("all")
    valid_job_title.append("all")
    valid_year.append("all")
    return valid_provinces, valid_job_title, valid_year


def get_user_input(multi_index_dataframe):
    """Get user input for selection 
    Args:
        multi_index_dataframe (Dataframe): Dataframe of dataset
    Returns:
        province, job_selection, year: User selections validated with data
    """
    # get valid list of choices for each index
    valid_provinces, valid_job_title, valid_year = get_valid_choices(
        multi_index_dataframe.index
    )

    # get user input and validate against list of possible choices
    province = get_valid_cli_input(valid_provinces, "province")
    job_selection = get_valid_cli_input(valid_job_title, "job title")
    year = get_valid_cli_input(valid_year, "year")

    return province, job_selection, year


def get_valid_cli_input(valid_array, category):
    """Prompts user for input through the command line interface, validates input if in array and returns input if valid else raise ValueError
    Args:
        valid_array (array): String array containing valid input
        category (string): Category of input to validate ie. "province", 'job outlook"
    Raises:
        ValueError: user_input is not in array
    Returns:
        user_input (str): User inputted
    """

    while True:
        try:
            user_input = input(
                f"\nEnter {category} or 'all' for all {category} data, if you would like to see options press 'o'\n"
            )
            if user_input == "o":
                print(f"{category} choices\n")
                print(*valid_array, sep="\n")
            elif user_input not in valid_array:
                raise ValueError(f"{category} not found")
            else:
                break

        except ValueError:
            print(f"Input for {category} is not valid.\n")
            if (
                input(
                    f"Enter 'y' to display choices for {category} or any other key to try again!\n"
                )
                == "y"
            ):
                print(f"{category} choices\n")
                print(*valid_array, sep="\n")
            continue
    return user_input


def merge_datasets_to_dataframe():
    # Calling a function to parse CSV files and assign their contents as Pandas DataFrames to variables
    (
        naics_lookup_table,
        wage_employment_data,
        unemployment_rate_data,
        hours_worked_data,
    ) = read_csv_files()

    # Calling a function to reduce dataframe size to the content pertaining to what is required for analysis
    wage_employment_data, unemployment_rate_data, hours_worked_data = query_csv_files(
        wage_employment_data, unemployment_rate_data, hours_worked_data
    )

    # Extracting all NAICS job codes from North American Industry Classification System (NAICS) varying text job name descriptions in DataFrames
    wage_employment_data["NAICS_Codes"] = extract_keys(
        wage_employment_data["North American Industry Classification System (NAICS)"]
    )
    unemployment_rate_data["NAICS_Codes"] = extract_keys(
        unemployment_rate_data["North American Industry Classification System (NAICS)"]
    )
    hours_worked_data["NAICS_Codes"] = extract_keys(
        hours_worked_data["North American Industry Classification System (NAICS)"]
    )

    # Dropping any rows that do not have an associated NAICS Table job profile
    wage_employment_data = wage_employment_data[
        wage_employment_data["NAICS_Codes"].apply(mask_codes)
    ]
    unemployment_rate_data = unemployment_rate_data[
        unemployment_rate_data["NAICS_Codes"].apply(mask_codes)
    ]
    hours_worked_data = hours_worked_data[
        hours_worked_data["NAICS_Codes"].apply(mask_codes)
    ]

    # Converting ranges extracted from NAICS Code Descriptions into actual range of numbers
    wage_employment_data["NAICS_Codes"] = wage_employment_data["NAICS_Codes"].apply(
        convert_ranges
    )
    unemployment_rate_data["NAICS_Codes"] = unemployment_rate_data["NAICS_Codes"].apply(
        convert_ranges
    )
    hours_worked_data["NAICS_Codes"] = hours_worked_data["NAICS_Codes"].apply(
        convert_ranges
    )

    # Removing rows with null values in metric positions
    wage_employment_data = wage_employment_data[wage_employment_data["VALUE"].notnull()]
    unemployment_rate_data = unemployment_rate_data[
        unemployment_rate_data["Unemployment_Rate"].notnull()
    ]
    hours_worked_data = hours_worked_data[hours_worked_data["Standard_Hours"].notnull()]

    # Masking NAICS Sector codes lookup table to extract only highest level pertaining to sector related information
    naics_lookup_table = naics_lookup_table.loc[
        (naics_lookup_table["Sector"].str.len() == 2)
        | (naics_lookup_table["Sector"].isin(["31-33", "44-45", "48-49"]))
    ]

    # Cross joining NAICS table with list of provinces in Canada and Years 2011 to 2021
    naics_lookup_table = cross_join(
        "GEO", "Provinces", naics_lookup_table, unemployment_rate_data
    )
    naics_lookup_table = cross_join(
        "REF_DATE", "Years", naics_lookup_table, unemployment_rate_data
    )

    # Internally Cross joining extracted NAICS codes listed in column NAICS_Codes with associated DataFrame row
    final_tables_dict = {}
    for (index_Final_Data_Table, Initial_Data_Table) in dict(  # Creating a dictionary to store below function call returned DataFrames
        {
            "final_wage_employment_data": wage_employment_data,
            "final_unemployment_rate_data": unemployment_rate_data,
            "final_hours_worked_data": hours_worked_data,
        }).items():
        FinalTable = pd.DataFrame(data=[])  # Create an empty DataFrame for data to be iteratively appended to
        final_tables_dict[index_Final_Data_Table] = FinalTable.append(
            Initial_Data_Table.groupby("North American Industry Classification System (NAICS)").apply(cross_join_naics_dataframe_lists,)
        )
        final_tables_dict[index_Final_Data_Table] = final_tables_dict[index_Final_Data_Table].reset_index(level=0, drop=True)  # Reset index after append operations
        final_tables_dict[index_Final_Data_Table] = final_tables_dict[index_Final_Data_Table].iloc[:, :-1 ]  # Remove row column with listing of extracted NACIS codes as a row has been created for each of them

    # Assigning dicitonary DataFrames back to variables
    final_unemployment_rate_data = final_tables_dict["final_unemployment_rate_data"]
    final_hours_worked_data = final_tables_dict["final_hours_worked_data"]
    final_wage_employment_data = final_tables_dict["final_wage_employment_data"]

    # Splitting up final_wage_employment_data into two sub DataFrames, for merging purposes, containing information for number of jobs and salary respectively
    wage_data, jobs_data = split_wage_employment(final_wage_employment_data)

    # Grouping final_unemployment_rate_data by keys to remove data dependencies on alternate factors in the sheet for example multiple rows pertaining to "age of person" in each province, sector for each year.
    final_unemployment_rate_data = final_unemployment_rate_data.groupby(
        ["GEO", "NAIC_Code", "REF_DATE"]
    ).agg(
        {
            "Labour force characteristics": "first",
            "North American Industry Classification System (NAICS)": "first",
            "Sex": "first",
            "Age group": "first",
            "UOM": "first",
            "Unemployment_Rate": "mean",
        }
    )

    # Merging all datasets together to create complete dataset for reporting
    collective_dataset = merge_datasets(
        naics_lookup_table,
        wage_data,
        jobs_data,
        final_hours_worked_data,
        final_unemployment_rate_data,
    )
    try:
        collective_dataset = collective_dataset.drop(columns=["Unnamed: 0"])
    except:
        pass
    return collective_dataset


def display_general_statistics(collective_dataset):
    """ Display General Statistics for datafame
    Args:
        collective_dataset (Dataframe): Dataframe of full dataset
    """

    print(
        "*********** Below are an array of tables to assist you in your market analysis ***********",
        end="\n\n",
    )
    # Printing results of describe method on DataFrame
    display_describe_dataframe(collective_dataset)

    # Calculating province with top salarys from highest to lowest over the last 10 years
    group = high_level_metrics(
        collective_dataset, "Provinces", "Years", "Salary", "mean"
    )
    group = format_currency(group)

    print("\n\n")
    print("The 10 top salarys by province for the last 10 years are:")
    print(group.head(10), end="\n\n")
    print("\n\n")

    # Computing salarys for all sectors across provinces from highest to lowest
    group = high_level_metrics(
        collective_dataset, "Job_Title", "Provinces", "Salary", "mean"
    )
    print(
        "The 10 top salarys for all sectors based on province from highest to lowest are:"
    )
    group = format_currency(group)
    print(group.head(10), end="\n\n")
    print("\n\n")

    # Calcualting top salarys across years for each sector
    group = high_level_metrics(
        collective_dataset, "Job_Title", "Years", "Salary", "mean"
    )
    group = format_currency(group)
    print("The 10 top salarys for all sectors for the last 10 years are:")
    print(group.head(10), end="\n\n")
    print("\n\n")

    # Calcualting highest unemployment rates by province and year
    group = high_level_metrics(
        collective_dataset, "Provinces", "Years", "Unemployment_Rate", "mean"
    )
    print("The 10 highest unemployment rates for the last 10 years are:")
    print(group.head(10), end="\n\n")
    print("\n\n")

    # Jobs with over 40 hour work weeks and the hourly wage hours worked ratio
    try:
        group = (
            collective_dataset[collective_dataset["Standard_Hours"] > 40]
            .groupby(["Job_Title"])["Standard_Hours", "Earnings per hour"]
            .mean()
        )
        group = group.reset_index(drop=False)
        group["Weighting"] = group["Earnings per hour"] / group["Standard_Hours"]
        group = group.sort_values(by=["Weighting"], ascending=False).head(10)
        print("Job hour expectations relative to earnings per hour:")
        print(group.head(10), end="\n\n")
        print("\n\n")
    except:
        pass


def display_user_statistics(collective_dataset):
    """Prompts user for input and displays filtered dataset
    Args:
        collective_dataset (Dataframe): Merged datasets as dataframe
    """
    # Import dataframe and transform
    multi_index_dataframe = get_multi_dataframe(collective_dataset)

    multi_index_dataframe = generate_new_features(multi_index_dataframe)

    # generate new features for dataset. Earning/hour, employement rate and # of unemployed

    multi_index_dataframe.to_csv(
        "Final_Dataframe.csv"
    )  # export entire dataframe to csv

    # Statistics across specific years, provinces, and job titles
    province, job_selection, year = get_user_input(multi_index_dataframe)

    # get user input for selection
    user_dataframe = get_filtered_df(
        [province, job_selection, year], multi_index_dataframe
    )

    print("\n\nBelow is all the data corresponding to your selections:")
    print(
        get_filtered_df([province, job_selection, year], multi_index_dataframe),
        end="\n\n",
    )

    # user filtered dataframe
    display_pivot_data(user_dataframe)

    # Creating table displaying highest and lowest paying sectors in each province
    # Try statements below as different graphs will be available depending on the users filter choices
    try:
        data = pd.DataFrame([])
        group = user_dataframe.copy()
        group = group.groupby(["Provinces", "Job_Title", "Years"], as_index=True).agg(
            {"Salary": sum}
        )
        group = group.reset_index(drop=False)
    except:
        pass

    try:
        # Calcualting top salarys across years for each sector
        group2 = high_level_metrics(
            user_dataframe.copy(), "Job_Title", "Years", "Salary", "mean"
        )
        group2 = format_currency(group2)
        print("The 10 top salarys in your selection for the last 10 years are:")
        print(group2, end="\n\n")
        print("\n\n")
    except:
        pass

    try:
        # Creating a table concisting of the min and max salarys for each province and sector
        data = data.append(
            group.groupby(["Provinces", "Job_Title"], as_index=True).apply(
                calculate_min_max, col="Salary"
            )
        )
        data = data.reset_index(drop=True)
        data = data.groupby(["Provinces", "Job_Title", "Years", "min_max"])[
            "Salary"
        ].mean()
        data = data.apply(lambda x: "${:,.2f}".format(x))
        print(
            "Based on your selection the lowest and highest salaries for the province and sector are:"
        )
        print(data, end="\n\n")
        print("\n\n")
    except:
        pass

    try:
        # Displaying relative salary for each sector and province comparative to the yearly average salary for that sector
        # Average salary across Canada for user selected sector by year
        selected_province_salary = ( 
            user_dataframe.groupby(["Provinces", "Job_Title", "Years"], as_index=True)
            .agg({"Salary": "mean"})
            .reset_index(drop=False)
        )
        # Average salary by year for user selected sector and province
        salary_across_canada = (
            collective_dataset.groupby(["Job_Title", "Years"], as_index=True)
            .agg({"Salary": "mean"})
            .reset_index(drop=False)
        )
        # Joining all information
        group = pd.merge(
            selected_province_salary,
            salary_across_canada,
            left_on=["Job_Title", "Years"],
            right_on=["Job_Title", "Years"],
            how="left",
        )
        # Normalizing average salary by year for user selected sector and province by the standard salary for the sector across all provinces
        group["Centered Salary"] = group["Salary_x"] - group["Salary_y"]
        group = group.drop(columns=["Salary_x", "Salary_y"]) # Dropping frivelous columns
        centered_salary_data = group.copy() # Creating a copy of data to be used in following table
        group = group.reset_index(drop=True) # Removing default numerical index
        group = group.set_index(["Provinces", "Job_Title", "Years"]).unstack(2) # Creating a hierarchial index
        group["Net mean"] = group.mean(axis=1) # Creating row total mean
        group = format_currency(group) # Changing table data into currency format

        print(
            "This table displays the salaries for provinces and sectors based on your selection, relative to the average for the sector split by year:"
        )
        print(group, end="\n\n") # Printing data
        print("\n\n")
    except:
        pass

    try:
        # Best and worst year by province and sector for centered salaries
        data = pd.DataFrame([])
        data = data.append(
            centered_salary_data.groupby(["Provinces", "Job_Title"], as_index=True).apply(
                calculate_min_max, col="Centered Salary"
            )
        )
        data = data.reset_index(drop=True)
        data = data.groupby(["Provinces", "Job_Title", "Years", "min_max"])[
            "Centered Salary"
        ].mean()
        data = data.apply(lambda x: "${:,.2f}".format(x))
        print(
            "This table displays the best and worst salary disparities, relative to the average for the sector by year:"
        )
        print(data, end="\n\n")
        print("\n\n")
    except:
        pass

    try:
        # Creating year over year salary change rates
        group = user_dataframe.reset_index(drop=false)
        group = project_spans(group, "Salary")
        if all(
            group["Overall Trend"].isnull()
        ):  # If user selects 1 year do not show these chart as dependent on differences between years
            raise ValueError
        print("Top 10 provinces with the highest growth rate split by sector and year:")
        group = format_percent(group)
        print(group.head(17), end="\n\n")
        print("\n\n")

        # Creating year over year unemployment rate change rates
        group = user_dataframe.reset_index(drop=false)
        group = project_spans(group, "Unemployment_Rate")
        if all(
            group["Overall Trend"].isnull()
        ):  # If user selects 1 year do not show this chart as dependent on differences between years
            raise ValueError
        print("10 provinces with highest unemplyment rate changes by sectors and year")
        group = format_percent(group)
        print(group.head(10), end="\n\n")
        print("\n\n")
    except:
        pass


def plot_highest_comp(collective_dataset):
    """ Filters and displays plot for highest compensation trend by province from 2011 to 2021
    Args:
        collective_dataset (Dataframe): Merged datasets as dataframe
    """
    collective_dataset = collective_dataset[["Provinces", "Years", "Salary"]]
    collective_dataset = collective_dataset.groupby(["Provinces", "Years"]).agg("max")
    collective_dataset = collective_dataset["Salary"].reset_index()
    sb.set(rc={"figure.figsize": (20, 15)})
    sb.barplot(x="Provinces", y="Salary", hue="Years", data=collective_dataset)
    plt.title("High Earners Trend by Province")
    plt.legend(bbox_to_anchor=(1.08, 1.0), fancybox=True, loc="upper right")
    plt.savefig("static/img/highest-comp-plot.png")
    # plt.show()


def plot_lowest_comp(collective_dataset):
    """Filters and displays plot for lowest compensation trend by province from 2011 to 2021
    Args:
        collective_dataset (Dataframe): Merged datasets as dataframe
    """
    collective_dataset = collective_dataset[["Provinces", "Years", "Salary"]]
    collective_dataset = collective_dataset.groupby(["Provinces", "Years"]).agg("min")
    collective_dataset = collective_dataset["Salary"].reset_index()
    sb.set(rc={"figure.figsize": (20, 15)})
    sb.barplot(x="Provinces", y="Salary", hue="Years", data=collective_dataset)
    plt.title("Lowest Earners Trend by Province")
    plt.legend(bbox_to_anchor=(1.08, 1.0), fancybox=True, loc="upper right")
    plt.savefig("static/img/lowest-comp-plot.png")
    # plt.show()
    plt.close()


def plot_mean_comp(collective_dataset):
    """ Filters and displays plot for highest compensation trend by province from 2011 to 2021
    Args:
        collective_dataset (Dataframe): Merged datasets as dataframe
    """
    collective_dataset = collective_dataset[["Provinces", "Years", "Salary"]]
    collective_dataset = collective_dataset.groupby(["Provinces", "Years"]).agg("mean")
    collective_dataset = collective_dataset["Salary"].reset_index()
    sb.set(rc={"figure.figsize": (20, 15)})
    sb.barplot(x="Provinces", y="Salary", hue="Years", data=collective_dataset)
    plt.title("Mean Earners Trend by Province")
    plt.legend(bbox_to_anchor=(1.08, 1.0), fancybox=True, loc="upper right")
    plt.savefig("static/img/mean-comp-plot.png")
    plt.close()
    # plt.show()
    plt.close()


def plot_comp_difference(collective_dataset):
    """ Filters and plots difference in compensation from 2011 to 2021 for each province
    Args:
        collective_dataset (Dataframe): Merged datasets as dataframe
    """
    df1_mean = collective_dataset.groupby(["Provinces", "Years"]).agg("mean")
    df1_mean_sub = df1_mean["Salary"].reset_index()
    df2_mean_sub = df1_mean_sub.pivot(index="Provinces", columns="Years")
    df2_mean_sub["Salary", 2021]
    df2_mean_sub["Salary", "Growth"] = (
        df2_mean_sub["Salary", 2021] - df2_mean_sub["Salary", 2011]
    )

    df3 = df2_mean_sub[("Salary", "Growth")]

    df3.sort_values().plot.bar(
        figsize=(10, 10),
        fontsize=15,
        xlabel="PROVINCE",
        ylabel="COMPENSATION",
        title="Difference in Compensation over 10 Years By Province",
    )
    # Turn on the grid
    plt.minorticks_on()
    plt.savefig("static/img/comp-difference-plot.png")
    plt.show()
    plt.close()


def display_plots(collective_dataset):
    """Displays and saves plots of different data views
    Args:
        collective_dataset (Dataframe): Merged datasets as dataframe
    """
    plot_highest_comp(collective_dataset)
    plot_lowest_comp(collective_dataset)
    plot_mean_comp(collective_dataset)
    plot_comp_difference(collective_dataset)


def get_pivot_data(data_subset):
    """Pivot table outlining hourly earning, annual salarys, and Weekly Salarys. 

    Args:
        data_subset (DataFrame): Dataframe of filtered data


    Returns:
        'Dataframe': pivot table of filtered data       
    """

    if isinstance(data_subset, pd.Series):
        return data_subset

    pvt1 = data_subset.pivot_table(
        ["Earnings per hour", "Standard_Hours", "Salary"],
        index=["Provinces", "Job_Title"],
        columns="Years",
        aggfunc="mean",
    )

    return pvt1.replace([0], np.nan)


def index_dataframe_to_excel(collective_dataset):
    multi_dataframe = get_multi_dataframe(collective_dataset)
    multi_dataframe.to_excel("Final_Dataframe.xlsx")


def CLI():
    # CLI USER INTERFACE INPUT
    print(
        "\n****************************************** CANADA ECONOMIC TRENDS *******************************************\n\n"
    )
    # Prompt user if new merge is requested
    if (
        input(
            "Enter 'merge' to get the most current information or any other character to get cached storage\n"
        )
        == "merge"
    ):
        print(
            "\n********************************************** NEW MERGE **********************************************\n"
        )
        collective_dataset = merge_datasets_to_dataframe()
    # Else import pre-merged data
    else:
        print(
            "\n********************************************* IMPORT CSV **********************************************\n"
        )
        collective_dataset = pd.read_csv("Final_Dataframe.csv")
    print(
        "\n********************************************* IMPORT END **********************************************\n"
    )

    # export final indexed dataframe once import is complete
    index_dataframe_to_excel(collective_dataset)

    # General Statistics across all years, provinces, and job titles
    if (
        input(
            "Enter 'general' for general information or any other character to continue to selection\n"
        )
        == "general"
    ):
        print(
            "\n******************************************** GENERAL STATS ********************************************\n"
        )
        display_general_statistics(collective_dataset)
    print(
        "\n******************************************* GENERAL STATS END *****************************************\n"
    )
    if (
        input(
            "Enter 'select' to select specific provinces, job titles and year or any other character to exit\n"
        )
        == "select"
    ):
        print(
            "\n********************************************* USER STATS **********************************************\n"
        )
        display_user_statistics(collective_dataset)
    print(
        "\n******************************************** USER STATS END ******************************************\n"
    )

    if input("Enter 'plot' to save and display interesting plots!\n") == "plot":
        print(
            "\n********************************************* PLOTS INITIATED **********************************************\n"
        )
        display_plots(collective_dataset)
    print(
        "\n******************************************** PLOTS END ******************************************\n"
    )

    print(
        "\n************************************************* EXITING *************************************************\n"
    )


if __name__ == "__main__":
    while True:
        try:
            user_input = input(
                "\n\nEnter 'cli' or 'gui' to enter program from command line interface or graphical user interface\n"
            )
            if user_input not in ["cli", "gui"]:
                raise ValueError(f"Please try again")
            else:
                if user_input == "cli":
                    CLI()
                    break
                else:
                    webbrowser.open("http://127.0.0.1:5000/")
                    gui.app.run()
                    break

        except ValueError:
            print(f"Input not valid.\n")
            continue
