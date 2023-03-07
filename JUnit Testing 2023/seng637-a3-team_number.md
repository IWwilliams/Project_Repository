**SENG 637 - Dependability and Reliability of Software Systems**

**Lab. Report #3 – Code Coverage, Adequacy Criteria and Test Case Correlation**

| Group \#:      |                   |
| -------------- | ----------------- |
| Student Names: | Kimberley Baldwin |
|                | Tyson Trail       |
|                | Braydon Hart      |
|                | Isaiah Williams   |

(Note that some labs require individual reports while others require one report
for each group. Please see each lab document for details.)

# 1 Introduction

This assignment consisted of performing white box testing on methods previously unit tested in Assignment #2. The team reviewed coverage achieved in the previous assignment and increased it where possible.

# 2 Manual data-flow coverage calculations for X and Y methods

## DataUtilities Class:

### calculateColumnTotal()

```
123    public static double calculateColumnTotal(Values2D data, int column) {
124        ParamChecks.nullNotPermitted(data, "data");
125        double total = 0.0;
126        int rowCount = data.getRowCount();
127        for (int r = 0; r < rowCount; r++) {
128            Number n = data.getValue(r, column);
129            if (n != null) {
130                total += n.doubleValue();
131            }
132        }
133	for(int r2 = 0; r2 > rowCount; r2++) {
134		Number n = data.getValue(r2, column);
135		if(n != null) {
136			total+=n.doubleValue();
137		}
138	}
139     return total;
140    }
```

### 1. Data Flow Graph

<img width="489" alt="image" src="https://user-images.githubusercontent.com/104868364/222484777-7286e74f-9a73-4c63-a5df-673a9588d429.png">

### 2. Def-Use Sets Per Statement

![image](https://user-images.githubusercontent.com/104868364/222485142-ff29b976-f353-45c3-9f69-dc50dd64f121.png)

### 3. DU-Pairs Per Variable

![image](https://user-images.githubusercontent.com/104868364/222485325-55270ac6-3d41-4156-9c42-f3037b1b04ca.png)

### 4. Du-Pairs Covered Per Test Case

Test Case #1 (data = null, column = 1)
![image](https://user-images.githubusercontent.com/104868364/222485870-f04bb683-f9cf-4c7f-9922-c84ee02f8373.png)

Test Case #2 (data=values, column = 0) _Column within range_
![image](https://user-images.githubusercontent.com/104868364/222485925-cc23082b-7a69-4818-8881-f82c3f44011f.png)

Test Case #3 (data=values, column = 1) _Column with some null values_
![image](https://user-images.githubusercontent.com/104868364/222485960-4a5c708d-9d31-47c6-9959-d4f6a61dab19.png)

### 5. Calculate DU-Pair Coverage

![image](https://user-images.githubusercontent.com/104868364/222486481-0df7d468-8425-4213-8bd1-e662030f9636.png)

## Range Class:

### getLength()

```
143    public double getLength() {
144		If(lower>upper) {
145			String msg = “Range(double, double):require lower(“
146			+ lower+”) <= upper (“ + upper + “)”;
147			Throw new IllegalArgumentException(msg);
148		}
149        return (this.upper - this.lower);
150    }
```

### 1. Data Flow Graph

<img width="468" alt="image" src="https://user-images.githubusercontent.com/104868364/222487148-8730c2df-5525-45ff-8d48-f1adad8056bd.png">

### 2. Def-Use Sets Per Statement

![image](https://user-images.githubusercontent.com/104868364/222487442-bd77cf56-4f10-4e95-9410-d40a1c0875f8.png)

### 3. DU-Pairs Per Variable

![image](https://user-images.githubusercontent.com/104868364/222487494-b870f729-703b-4803-96b4-0895ec6491d3.png)

### 4. Du-Pairs Covered Per Test Case

Test Case #1 (upper = 1, lower = -1)

![image](https://user-images.githubusercontent.com/104868364/222487679-63bb509a-7739-497b-8efb-c4183f6fbd59.png)

### 5. Calculate DU-Pair Coverage

![image](https://user-images.githubusercontent.com/104868364/222487780-25607a23-3fb6-4e22-802f-16161c5a9482.png)

# 3 A detailed description of the testing strategy for the new unit tests

The testing strategy for this assignment followed a coverage testing approach. What this means is the team ran EclEmma to evaluate our existing test coverage from Assignment 2. The initial coverage report allowed us to evaluate lines and branches that were missed. The missed coverage was evaluated and test cases were developed where possible to try and increase coverage, or a detailed description of why the coverage could not be increased. A high level description of the developed test cases is provided in section 4, and detailed results for all methods evaluated are contained in section 5.

# 4 A high level description of five selected test cases you have designed using coverage information, and how they have increased code coverage

#### NOTE: Only two test cases are described because only two test cases could be created to increase coverage for chosen methods. All other methods under 100% have unreachable code that is addressed in Section #5

### Test case added #1:

clone() – The branch coverage was increased from 75.0% to 100% by adding another test case. A test case with a null row needed to be included to ensure that a branch condition was met. There was no else statement after the if statement so this change was mostly inconsequential.

    public static double[][] clone(double[][] source) {
        ParamChecks.nullNotPermitted(source, "source");
        double[][] clone = new double[source.length][];
        for (int i = 0; i < source.length; i++) {
            if (source[i] != null) {
                double[] row = new double[source[i].length];
                System.arraycopy(source[i], 0, row, 0, source[i].length);
                clone[i] = row;
            }
        }
        return clone;
    }

![image](https://user-images.githubusercontent.com/104868364/222561943-629a52d8-a6c0-46a0-a237-606b0c32a8c0.png)

### Test case added #2:

Equal() - The base line statement and branch coverages for equal were 90.0% and 91.7% respectively. Leveraging the color-based coverage tagging available in eclipse we were able to surmise that the oversight in our prior test case was in respect to the comparison of arrays with differing lengths. To resolve this discrepancy an additional mock object was added with dimensions [3][2] this was in turn compared to a pre-existent mock object with dimensions [2][3]. As expected, the code entered the missed branch and resulted in 100% line and 100% branch coverages.

Mock Objects Compared:
<img width="316" alt="Picture1" src="https://user-images.githubusercontent.com/104895866/222701883-95e38af3-64a4-45a9-9cd6-ccd84f7cf579.png">

Before:
<img width="226" alt="Picture2" src="https://user-images.githubusercontent.com/104895866/222701897-7dc6809e-f392-4488-9dd5-fc7035dddadf.png">

After:
<img width="224" alt="Picture3" src="https://user-images.githubusercontent.com/104895866/222702162-c246a981-bb30-4a8b-ba12-d1be1ff5a9d4.png">

# 5 A detailed report of the coverage achieved of each class and method (a screen shot from the code cover results in green and red color would suffice)

## Range Class

<img width="619" alt="image" src="https://user-images.githubusercontent.com/62910152/222546150-2c2d8643-489e-43e5-94e8-bf41da277aeb.png">

### Comments:

getCentralValue – The branch coverage returns blank when using EclEmma because there is only return statement logic. This testing coverage cannot be improved upon.

<img width="318" alt="image" src="https://user-images.githubusercontent.com/62910152/222547301-c97fc73b-4075-4f35-9496-4c0c79adc1bf.png">

getLowerBound(), getUpperBound(), getLength(), expand() - The line and branch coverage for these methods is unable to be increased because each method contains unreachable code. The code after the logic check for if (lower > upper) for each is unreachable because it is impossible to instantiate a Range object that has a lower bound that is greater than the upper bound (as there is a logic check in the constructor that throws an IllegalArgumentException). There is also no way to set the upper or lower bound instance variables to values that would fail the logic check after the fact because they are private instance variables and there are no Setter methods within the class.

<img width="488" alt="image" src="https://user-images.githubusercontent.com/62910152/222547647-faee3ee8-8692-4918-b0e6-1a795851a904.png">

<img width="459" alt="image" src="https://user-images.githubusercontent.com/62910152/222547912-754c2f66-5dd5-44ef-8ab5-2bedfd80fc53.png">

contains() - The branch coverage for contains() cannot be increased because the method has injected redundant logic checks. The original source code only has the return statement logic.

<img width="376" alt="image" src="https://user-images.githubusercontent.com/62910152/222548122-4b22249f-1469-47a1-9ae6-3341c219b349.png">

Data Utilities Class

<img width="468" alt="Picture1" src="https://user-images.githubusercontent.com/104895866/222851508-e42cee69-950f-488b-b642-8f08fefb051e.png">
 
Comments:
calculateColumnTotal()– Unable to increase line or branch coverage for calculateColumnTotal () method. This method contains 3 lines of unreachable code inside the second for loop. This code will only ever be executed if data.getRowCount() < 0. Since it is impossible to create an array with negative rows this code is unreachable and untestable.

<img width="389" alt="Picture2" src="https://user-images.githubusercontent.com/104895866/222851586-084c2f7b-76fd-428c-8650-5f9f9094589c.png">

CalculateRowTotal() – Unable to increase line or branch coverage for calculateRowTotal method. This method contains 3 lines of unreachable code inside the second for loop. This code will only ever be executed if dtaa.getColumnCount() < 0. Since it is impossible to create an array with negative rows, this code is unreachable and untestable. The second for loop is a mutant that was created for the purposes of this project by the instructor. The original source code does not have this second for loop because it serves no purpose.

<img width="468" alt="Picture3" src="https://user-images.githubusercontent.com/104895866/222851686-9eeace24-7996-4a1b-9446-3f0fa1e7511d.png">

clone() – The branch coverage was increased from 75.0% to 100% by adding another test case. A test case with a null row needed to be included to ensure that a branch condition was met. There was no else statement after the if statement so this change was mostly inconsequential.

 <img width="468" alt="Picture4" src="https://user-images.githubusercontent.com/104895866/222851758-dd8f1e8b-fc3a-4a49-89bd-236cf49c9904.png">
 
Equal() - The base line statement and branch coverages for equal were 90.0% and 91.7% respectively. Leveraging the color-based coverage tagging available in eclipse we were able to surmise that the oversight in our prior test case was in respect to the comparison of arrays with differing lengths. To resolve this discrepancy an additional mock object was added with dimensions [3][2] this was in turn compared to a pre-existent mock object with dimensions [2][3]. As expected, the code entered the missed branch and resulted in 100% line and 100% branch coverages.

Mock Objects Compared:

<img width="316" alt="Picture1" src="https://user-images.githubusercontent.com/104895866/222701883-95e38af3-64a4-45a9-9cd6-ccd84f7cf579.png">

Before:

<img width="226" alt="Picture2" src="https://user-images.githubusercontent.com/104895866/222701897-7dc6809e-f392-4488-9dd5-fc7035dddadf.png">

After:

<img width="224" alt="Picture3" src="https://user-images.githubusercontent.com/104895866/222702162-c246a981-bb30-4a8b-ba12-d1be1ff5a9d4.png">

# 6 Pros and Cons of coverage tools used and Metrics you report

The tests were facilitated using JUnit/ EclEmma due to its pre-configuration and recommendation within the assignment outline. The primary pro of the tool is its ease of integration with the Eclipse IDE and support for mocking. The report generated by the tool is concise and clearly/graphically represents the coverage of test cases. The colour and comment based highlighting of code was exceptionally helpful for the identification and remediation of overlooked test aspects. The multitude of asseritons supported by the library ease the testing process and improve its accuracy. The tool did not experience any crashes and was able to run in a timely manner. The metrics reported and optomized as a result of the tool are Instructions, Branches, Lines, Methods and Complexity. Instructions represents in part the amount of computational work occuring in the function and depicts the coverage of these computational aspects. Branches represents the number of conditional statements in the code. Often this was seen as the oversight or coverage limiting factor. Methods represent the number of functions used during execution. Complexity represents the challenge for testing the code. This was used to evaluate the level of scrutiny needed for improvements to be made and work delegation. Line coverage, branches and graphical code depictions of coverage were very useful during anlysis and were heavily relied upon as a measure of success. The primary con assocaited with the use of EclEmma is its requirments for manual interpreation upon conveyance of coverage. The tool does not provide much insight into how to improve coverage but rather highlight aspects which have been missed leaving it to the end user to suggest improvements. An example is the lack of hihglighting for unreachable or miscoded script leading to poor test evaluation and oweness to identify coding faults deterministic of low coverage, but not necessaruly uncheracteristic performance. Overall these measures did draw attention and lead to code fault identififcation making EclEmma an effective tool.

# 7 A comparison on the advantages and disadvantages of requirements-based test generation and coverage-based test generation.

Requirement based test generation, is a type of testing that determines the extent to which the software meets the specified requirements. It involves analyzing the requirements to identify testable features, and designing tests to ensure that the software performs those functions as intended. This form of testing is to ensure that the software meets the client’s criteria. Requirement based testing is effective at ensuring that the software meets the customer’s needs but may not cover all the code paths in the software. Since tests were not designed to cover all code paths, there could be an undiscovered error in the code that could potentially be discovered by the customer.
Coverage based test generation refers to building a test suite by analyzing how much of the model logic is exercised. This approach involves analyzing loops, branches and other code paths ensuring that as much code is covered as possible. Coverage based testing is effective at ensuring all code functions without fault. However, it does not test whether the software meets the needs of the customer without the assistance of requirement based testing.

# 8 A discussion on how the team work/effort was divided and managed

The team tried to delegate work proportionally to each group member. Work was delegated to people based on their area of interest and also giving each group member an opportunity to learn as many concepts as possible. Kim and Isaiah completed the manual data-flow coverage calculations. Kim also explained why the calculateColumnTotal method coverage could not be improved. Isaiah examined DataUtilities’ equal method to increase the test coverage. Braydon improved cover for the DataUtilities clone method and explained why the calculateRowTotal method could not be improved. Tyson examined the test suite for the Range methods and explained why it was difficult to improve coverage. Each group member was also assigned 10 % of the report.

# 9 Any difficulties encountered, challenges overcome, and lessons learned from performing the lab

This lab provided a valuable opportunity for group members to get experience designing tests using coverage metrics as performance indicators and to understand the theory behind these metrics. The manual coverage calculations required a lot of study to determine the correct methodology. Group members then needed to confer with each other to ensure that the calculations were completed correctly. The group needed to learn about different coverage metrics and how ECLEmma labels these coverage metrics. Each group member had an opportunity to try to improve coverage metrics.
It was challenging finding new ways to increase the coverage from the previous test suite. The group had created a robust test suite in lab 2. Most of the coverage deficiencies for the test suite are consequences of code that was injected into the SUT by the instructor. There is redundant code in the classes provided that cannot be seen in the source code as per the official Javadoc.

# 10 Comments/feedback on the lab itself

The group spent a significant amount of time in project setup section of this lab. Since this lab was so similar to the last lab, it would have saved hours of combined work if the software and developing environment configured in the last assignment could have been utilized again. The group encountered many of the same challenges it experienced in the last lab. For example, an additional Hamcrest library needed to be downloaded and installed so that all the java code could compile. For mac users there was no initial module class or class path created during set up. Users needed to manually create the class path so that ECLEmma could calculate the coverage.
