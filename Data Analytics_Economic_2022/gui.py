import Final_Project
from flask import Flask, render_template, request
import pandas as pd

app = Flask(__name__)


@app.route("/", methods=["POST", "GET"])
def home():

    # import dataframe
    df = pd.read_csv("Final_Dataframe.csv")
    multi_df = Final_Project.get_multi_dataframe(df)
    multi_df = Final_Project.generate_new_features(multi_df)
    provinces, industries, years = Final_Project.get_valid_choices(multi_df.index)

    # general statistics
    # get DataFrame from filtered form data
    df_search = Final_Project.get_filtered_df(["all", "all", "all"], multi_df)

    # if Series is returned, convert to DataFrame
    if isinstance(df_search, pd.Series):
        df_search = df_search.to_frame()

    df_pivot = Final_Project.get_pivot_data(df_search)
    df_pivot = df_pivot.dropna()
    # convert all data DataFrame to html
    display_all_html = df_pivot.to_html(
        classes=["table-bordered", "table-striped", "table-hover"]
    )

    if request.method == "POST":
        # if submit button pressed

        search = [
            "",
            "",
            "",
        ]  # search array initialization, [Province, Industry, Year]

        # get form data
        for key, val in request.form.items():
            if val and key == "prov":
                search[0] = val
            elif val and key == "ind":
                search[1] = val
            elif val and key == "year":
                search[2] = val

        # if nothing in forms
        if search == ["", "", ""]:
            return render_template(
                "index.html",
                msg="No data inputted",
                name="AllData",
                data=display_all_html,
            )

        # Validate form data before making dataframe
        if search[0] and search[0] not in provinces:
            return render_template(
                "index.html",
                msg=f"{search[0]} Province Not Valid",
                data=display_all_html,
                name="All Data",
            )

        if search[1] and search[1] not in industries:
            return render_template(
                "index.html",
                msg=f"{search[1]} Industry Not Valid",
                data=display_all_html,
                name="All Data",
            )

        if search[2] and search[2] not in years:
            return render_template(
                "index.html",
                name="All Data",
                msg=f"{search[2]} Year Not Valid",
                data=display_all_html,
            )

        for i in range(len(search)):
            # if "all" value in search_array element replace empty string with for all unique
            # values so that the search returns all values
            if search[i] == "":
                search[i] = "all"
            else:
                search[i] = search[i]

        # get DataFrame from filtered form data
        df_search = Final_Project.get_filtered_df(search, multi_df)

        # if Series is returned, convert to DataFrame
        if isinstance(df_search, pd.Series):
            df_search = df_search.to_frame()
            # convert DataFrame to html
            display_filtered_html = df_search.to_html(
                classes=["table-bordered", "table-striped", "table-hover"]
            )
            return render_template(
                "index.html",
                name=f"{search[0]}, {search[1]} Jobs in {search[2]}",
                data=display_filtered_html,
            )

        df_pivot = Final_Project.get_pivot_data(df_search)

        # convert DataFrame to html
        display_filtered_html = df_pivot.to_html(
            classes=["table-bordered", "table-striped", "table-hover"]
        )

        return render_template(
            "index.html", name="Filtered Data", data=display_filtered_html
        )

    else:
        return render_template("index.html", name="All Data", data=display_all_html)


@app.route("/plots/", methods=["GET", "POST"])
def plots():
    if request.method == "POST":
        # if home button pressed
        return render_template("index.html")
    else:
        # return render plots
        return render_template("plots.html")

