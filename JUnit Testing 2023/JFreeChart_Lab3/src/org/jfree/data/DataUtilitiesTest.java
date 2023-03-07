package org.jfree.data;

import static org.junit.Assert.*;

import org.jfree.data.DataUtilities;
import org.jfree.data.Values2D;
import org.jmock.Expectations;
import org.jmock.Mockery;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import java.util.Arrays;

/**
 * This class tests the functionality of the DataUtilities class.
 */
public class DataUtilitiesTest {

    // Set a default timeout for tests.
    private static final int DEFAULT_TIMEOUT = 2000;

    // Declare several instance variables.
    private double [][] array_one;
    private double [][] array_two;
    private double [][] array_three;
    private double [][] array_four;
    private double [][] array_five;
    private double [][] array_six;
    private double [][] array_seven;
    private Number[] numbers_empty;
    private double[] doubles_empty;
    private Number[] numbers;
    private double[] doubles;
    private double[][] myCloneArray;
    private double[][] myCloneArray2;
    private Values2D values;
    private Mockery mockingContext;

    /**
     * This method is run before any test methods are executed.
     */
    @BeforeClass public static void setUpBeforeClass() throws Exception {
    }

    /**
     * This method is run before each test method is executed.
     */
    @Before
    public void setUp() throws Exception { 
        // Create a Mockery object for mocking tests.
        mockingContext = new Mockery();

        // Create a Values2D object and define mock behavior for it.
        values = mockingContext.mock(Values2D.class);
        mockingContext.checking(new Expectations() {
            {
                one(values).getRowCount();
                will(returnValue(3));
                one(values).getValue(0, 0);
                will(returnValue(1));
                one(values).getValue(1, 0);
                will(returnValue(2));
                one(values).getValue(2, 0);
                will(returnValue(3));
                one(values).getColumnCount();
                will(returnValue(2));
                one(values).getValue(0, 1);
                will(returnValue(1));
                one(values).getValue(1, 1);
                will(returnValue(null));
                one(values).getValue(2, 1);
                will(returnValue(3));
            }
        });

        // Initialize various arrays to specific values.
        array_one = new double [][] {{Math.sqrt(-1),2}, {3,4}};
        array_two = new double [][] {{(0.0/0.0),2}, {3,4}};
        array_three = new double [][] {{1,2,3}, {3,4,7}};
        array_four = null;
        array_five = null;
        array_six = new double [][] {{1,2}, {3,4}};
        array_seven = new double [][] {{1,2}, {3,4}};
        numbers_empty = new Number[]{};
        doubles_empty = new double[]{};
        numbers = new Number[] {1.0,0.0};
        doubles = new double[] {1.0,0.0};
        myCloneArray = new double[][] {{1,2,3,4},{5,6,7,8},{9,10,11,12}};
        myCloneArray2 = new double[3][4];
        myCloneArray2[2][0]= 9;
        myCloneArray2[2]= null;
        myCloneArray2[0][0]= 1;
    }
	
    //Testing calculateColumnTotal()

    /**
     * Test 1. Testing calculateColumnTotal() with null data
     * This test method tests if an IllegalArgumentException is thrown when null data is passed to calculateColumnTotal() method.
     */
    @Test (timeout = DEFAULT_TIMEOUT, expected=IllegalArgumentException.class)
    public void calculateColumnTotalDataNull() {

        // exercise
        double result = DataUtilities.calculateColumnTotal(null, 1);

        // verify
        assertEquals(3, result, .000000001d);
        // Note: the above assertion will not be executed because an exception is expected
    }

    /**
     * Test 2. Testing calculateColumnTotal() with valid data and column index within range
     * This test method tests if the calculateColumnTotal() method returns the expected sum when valid data and column index within range is passed.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void calculateColumnTotalIsInRange() {

        // exercise
        double result = DataUtilities.calculateColumnTotal(values, 0);

        // verify
        assertEquals(6, result, .000000001d);
    }

    /**
     * Test 3. Testing calculateColumnTotal() with valid data and column index containing at least one null value
     * This test method tests if the calculateColumnTotal() method returns the expected sum when valid data and column index containing at least one null value is passed.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void calculateColumnTotalWithNull() {

        // exercise
        double result = DataUtilities.calculateColumnTotal(values, 1);

        // verify
        assertEquals(result, 4, .000000001d);
    }

    //Testing calculateRowTotal()

    /**
     * Test 1. Testing calculateRowTotal() with null data
     * This test method tests if an IllegalArgumentException is thrown when null data is passed to calculateRowTotal() method.
     */
    @Test (timeout = DEFAULT_TIMEOUT, expected=IllegalArgumentException.class)
    public void calculateRowTotalDataNull() {

        // exercise
        double result = DataUtilities.calculateRowTotal(null, 1);

        // verify
        assertEquals(4, result, .000000001d);
        // Note: the above assertion will not be executed because an exception is expected
    }

    /**
     * Test 2. Testing calculateRowTotal() with valid data and row index within range
     * This test method tests if the calculateRowTotal() method returns the expected sum when valid data and row index within range is passed.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void calculateRowTotalIsInRange() {

        // exercise
        double result = DataUtilities.calculateRowTotal(values, 0);

        // verify
        assertEquals(2, result, .000000001d);
    }

    /**
     * Test 3. Testing calculateRowTotal() with valid data and row index containing at least one null value
     * This test method tests if the calculateRowTotal() method returns the expected sum when valid data and row index containing at least one null value is passed.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void calculateRowTotalWithNull() {

        // exercise
        double result = DataUtilities.calculateRowTotal(values, 1);

        // verify
        assertEquals(2, result, .000000001d);
    }

    // Testing equal() method

    /**
     * Test to verify if the equal() method returns true when both arrays contain all NaN values
     * This test method tests if the equal() method returns true when two arrays containing all NaN values are compared.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void equalTrueNaN() {
        assertTrue("The value should have returned true for array_one and array_two being equal", DataUtilities.equal(array_one, array_two));
    }

        
    /**
     * Tests that standard 2x2 arrays are equal.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void equalTrue() {
        assertTrue("The value should have returned true for array_six and array_seven being equal", DataUtilities.equal(array_six, array_seven));	
    }

    /**
     * Tests that same length arrays with different numbers are not equal.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void equalSameLengthDiffNum() {
        assertFalse("The value should have returned false for array_one and array_six (same length but different numbers)", DataUtilities.equal(array_one, array_six));	
    }

    /**
     * Tests that arrays with different value lengths are not equal.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void equalDifferentLengths() {
        assertFalse("The value should have returned false for array_one and array_three", DataUtilities.equal(array_six, array_three));	
    }

    /**
     * Tests that arrays with different array lengths are not equal.
     */    
    @Test (timeout = DEFAULT_TIMEOUT)
    public void equalDifferentArrayLengths() {
        assertFalse("The value should have returned false for array_three and array_eight", DataUtilities.equal(array_three, array_eight));    
    }
    /**
     * Tests that an array A is not equal to null when array B is null.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void equalBNullANot() {
        assertFalse("The value should have returned false for array_one as a and array_four as b", DataUtilities.equal(array_one, array_four));	
    }

    /**
     * Tests that an array B is not equal to null when array A is null.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void equalANullBNot() {
        assertFalse("The value should have returned false for array_one as b and array_four as a", DataUtilities.equal(array_four, array_one));	
    }

    /**
     * Tests that two null arrays are equal.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void equalBothNull() {
        assertTrue("The value should have returned true for two null arrays", DataUtilities.equal(array_four, array_five));	
    }

	
    /**
     * Tests the createNumberArray(double[])} method without values.
     * Creates an empty double array, converts it to a Number array, and verifies that the resulting
     * Number array is empty.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void createNumberArrayWithoutValues() {
            
        // exercise 
        Number[] result = DataUtilities.createNumberArray(doubles_empty);
            
        // verify
        assertTrue("Numbers Array was not properly created from double array", Arrays.equals(numbers_empty,result));
        // tear-down: NONE in this test method
    }

    /**
     * Tests the createNumberArray(double[]) method with values.
     * Creates a double array with values, converts it to a Number array, and verifies that the
     * resulting Number array contains the same values.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void createNumberArrayWithValues() {
            
        // exercise 
        Number[] result = DataUtilities.createNumberArray(doubles);
            
        // verify
        assertTrue("Numbers Array was not properly created from double array", Arrays.equals(numbers,result));
        // tear-down: NONE in this test method
    }

    /**
     * Tests the createNumberArray(double[]) method with a null argument.
     * Verifies that the method throws an IllegalArgumentException when null is passed as input.
     */
    @Test (timeout = DEFAULT_TIMEOUT, expected=IllegalArgumentException.class)
    public void createNumberArrayNull() {
            
        // verify
        assertEquals("Illegal argument exception not thrown when passed null", DataUtilities.createNumberArray(null));
        // tear-down: NONE in this test method
    }
	
    /**
     * Test to verify that the DataUtilities.clone() method returns an array with the same elements
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void cloneArray() {
        double[][] result = DataUtilities.clone(this.myCloneArray);
        // verify
        assertTrue("Clone returned an array with the same elements", Arrays.deepEquals(myCloneArray, result));
        // tear-down: NONE in this test method
    }
	
    /**
    * Test to increase coverage. Created a null row in the array
    */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void cloneArrayWithNull() {
    double[][] result = DataUtilities.clone(this.myCloneArray2);
    // verify
    assertTrue("Clone returned an array with the same elements", Arrays.deepEquals(myCloneArray2, result));
    // tear-down: NONE in this test method
    }

    /**
     * Test to verify that the DataUtilities.clone() method returns a different reference
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void cloneArrayReferenceCheck() {
        double[][] result = DataUtilities.clone(this.myCloneArray);
        // verify
        assertNotSame(myCloneArray, result);
        // tear-down: NONE in this test method
    }

    /**
     * Test to verify that the DataUtilities.clone() method throws an exception when passed a null argument
     */
    @Test (timeout = DEFAULT_TIMEOUT, expected = IllegalArgumentException.class)
    public void cloneArrayNull() {
        double[][] result = DataUtilities.clone(null);
    }
    
    @After 
    public void tearDown() throws Exception {
	this.myCloneArray = null;
	array_one = null;
    	array_two  = null;
    	array_three  = null;
    	array_four = null;
    	array_five = null;
    	array_six =  null;
    	array_seven = null;
	numbers_empty = null;
    	doubles_empty = null;
    	numbers = null;
    	doubles = null;
	myCloneArray = null;
    }

    @AfterClass
    public static void tearDownAfterClass() throws Exception {
    }
}
