package org.jfree.data;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;

import org.jfree.data.Range;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 * A class to test the methods of the Range class in the org.jfree.data package.
 */
public class RangeTest {
	
	private static final int DEFAULT_TIMEOUT = 2000;
	
    private Range exampleRange;
    private int upper;
    private int lower;
    
    @BeforeClass
    public static void setUpBeforeClass() throws Exception {
    }

    /**
     * Initialize the Range object before running each test.
     */
    @Before
    public void setUp() throws Exception {
        // create a new Range object with values -1 and 1
        exampleRange = new Range(-1, 1);
        upper = -1;
        lower = 1;
    }

    // Testing getCentralValue()
    
    /**
     * Test the getCentralValue() method of the Range class.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void centralValueShouldBeZero() {
        // the central value of the range [-1, 1] should be 0
        assertEquals("The central value of -1 and 1 should be 0", 0, exampleRange.getCentralValue(), .000000001d);
    }
    
    // Testing getLowerBound()
    
    /**
     * Test the getLowerBound() method of the Range class.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void getLowerBound() {
    	// the lower bound of the range [-1, 1] should be -1
    	assertEquals("The Lower bound returned is incorrect", -1, exampleRange.getLowerBound(), .000000001d);
    }
    
    // Testing getUpperBound()
    
    /**
     * Test the getUpperBound() method of the Range class.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void getUpperBound() {
    	// the upper bound of the range [-1, 1] should be 1
    	assertEquals("The Upper bound returned is incorrect", -1, exampleRange.getLowerBound(), .000000001d);
    }
    
    // Testing getLength()
    
    /**
     * Test the getLength() method of the Range class.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void getLength() {
    	// the length of the range [-1, 1] should be 2
    	assertEquals("The Length returned is incorrect", 2, exampleRange.getLength(), .000000001d);
    }
    
    /**
     * Test the getLength() method of the Range class when the lower and upper bounds are inverted.
     * An IllegalArgumentException is expected to be thrown.
     */
    @Test (timeout = DEFAULT_TIMEOUT, expected=IllegalArgumentException.class)
    public void getLengthInverted() {
    	// create a new Range object with inverted lower and upper bounds
    	Range exampleRange2 = new Range(lower, upper);
    	// calling getLength() method on the inverted range should throw an IllegalArgumentException
    	exampleRange2.getLength();
    }
    
     // Testing expandToInclude()
        /**
     * Test the expandToInclude() method of the Range class when the value to be included is within the current range.
     * The upper and lower bounds should not be changed.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void expandToIncludeValueIsInRange() {
    	assertEquals("The Upper bound should not have changed", 1, Range.expandToInclude(exampleRange, 0.0).getUpperBound(), .000000001d);
    	assertEquals("The Lower bound should not have changed", -1, Range.expandToInclude(exampleRange, 0.0).getLowerBound(), .000000001d);
    }
    
    /**
     * Test the expandToInclude() method of the Range class when the value to be included is below the lower bound.
     * The lower bound should be updated to include the new value.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void expandToIncludeValueIsBelowLowerBound() {
    	assertEquals("The Lower bound was not changed as expected", -1.5, Range.expandToInclude(exampleRange, -1.5).getLowerBound(), .000000001d);
    }
    
    /**
     * Test the expandToInclude() method of the Range class when the value to be included is above the upper bound.
     * The upper bound should be updated to include the new value.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void expandToIncludeValueIsAboveUpperBound() {
    	assertEquals("The Upper bound was not changed as expected", 1.5, Range.expandToInclude(exampleRange, 1.5).getUpperBound(), .000000001d);
    }
    
    /**
     * Test the expandToInclude() method of the Range class when the range parameter is null.
     * Both the upper and lower bounds should be updated to include the new value.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void expandToIncludeRangeIsNull() {
    	assertEquals("The Upper bound was not changed as expected", 1.5, Range.expandToInclude(null, 1.5).getUpperBound(), .000000001d);
    	assertEquals("The Lower bound was not changed as expected", 1.5,Range.expandToInclude(null, 1.5).getLowerBound(), .000000001d);
    }

    //Testing expand()
    /**
     * Test the behavior of the expand() method when the bounds are not changed.
     * The lower bound should remain unchanged and the upper bound should remain unchanged.
     */
    @Test(timeout = DEFAULT_TIMEOUT)
    public void expandBoundsNoChange() {
        assertEquals("The Lower bound should not have changed", -1, Range.expand(exampleRange, 0, 0).getLowerBound(), .000000001d);
        assertEquals("The Upper bound should not have changed", 1, exampleRange.getUpperBound(), .000000001d);
    }

    /**
     * Test the behavior of the expand() method when the upper bound is increased.
     * The upper bound should increase by the specified amount and the lower bound should remain unchanged.
     */
    @Test(timeout = DEFAULT_TIMEOUT)
    public void expandUpperBound() {
        assertEquals("The Upper bound was not changed as expected", 2, Range.expand(exampleRange, 0, 0.5).getUpperBound(), .000000001d);
    }

    /**
     * Test the behavior of the expand() method when the lower bound is increased.
     * The lower bound should decrease by the specified amount and the upper bound should remain unchanged.
     */
    @Test(timeout = DEFAULT_TIMEOUT)
    public void expandLowerBound() {
        assertEquals("The Lower bound was not changed as expected", -2, Range.expand(exampleRange, 0.5, 0.0).getLowerBound(), .000000001d);
    }

    /**
     * Test the behavior of the expand() method when the lower bound is increased to a negative value.
     * The lower bound should increase to 0 and the upper bound should remain unchanged.
     */
    @Test(timeout = DEFAULT_TIMEOUT)
    public void expandLowerBoundNegative() {
        assertEquals("The Lower bound was not changed as expected", 0, Range.expand(exampleRange, -0.5, 0.0).getLowerBound(), .000000001d);
    }

    /**
     * Test the behavior of the expand() method when the upper bound is increased to a negative value.
     * The upper bound should decrease to 0 and the lower bound should remain unchanged.
     */
    @Test(timeout = DEFAULT_TIMEOUT)
    public void expandUpperBoundNegative() {
        assertEquals("The Upper bound was not changed as expected", 0, Range.expand(exampleRange, 0, -0.5).getUpperBound(), .000000001d);
    }

    
    /**
     * Test the expand method with a null range, expecting an IllegalArgumentException to be thrown.
     */
    @Test (timeout = DEFAULT_TIMEOUT, expected=IllegalArgumentException.class)
    public void expandNull() {
        // Test that an IllegalArgumentException is thrown when a null range is expanded
        assertEquals("The method didn't return IllegalArgumentException as expected", Range.expand(null, 0, 0));
    }

    // Testing contains()

    /**
     * Test that a value inside the range returns true when passed to the contains method.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void containsInsideRange() {
        assertTrue("The value should have returned true in range", exampleRange.contains(0));
    }

    /**
     * Test that a value outside the lower bound returns false when passed to the contains method.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void containsOutsideofLowerBound() {
        assertFalse("The value should have returned false outside of Lower Bound", exampleRange.contains(-1.5));
    }

    /**
     * Test that a value outside the upper bound returns false when passed to the contains method.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void containsOutsideofUpperBound() {
        assertFalse("The value should have returned false outside of Upper Bound", exampleRange.contains(1.5));
    }

    /**
     * Test that a value equal to the lower bound returns true when passed to the contains method.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void containsIsLowerBound() {
        assertTrue("The value should have returned true on Lower Bound", exampleRange.contains(-1));
    }

    /**
     * Test that a value equal to the upper bound returns true when passed to the contains method.
     */
    @Test (timeout = DEFAULT_TIMEOUT)
    public void containsIsUpperBound() {
        assertTrue("The value should have returned true on Upper Bound", exampleRange.contains(1));
    }

    /**
     * Method to be executed after each test.
     */
    @After
    public void tearDown() throws Exception {
        // No actions required for this method
    }

    /**
     * Method to be executed once after all tests have been run.
     */
    @AfterClass
    public static void tearDownAfterClass() throws Exception {
        // No actions required for this method
    }
    }