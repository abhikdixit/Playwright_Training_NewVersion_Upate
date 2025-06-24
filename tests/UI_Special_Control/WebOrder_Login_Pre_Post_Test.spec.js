package com.WebOrder;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class WebOrder_Login_TestNG {

    WebDriver driver;

    @BeforeClass
    public void setUp() {
        // Setup ChromeDriver path if not already in system path
        //System.setProperty("webdriver.chrome.driver", "path/to/chromedriver");
        driver = new EdgeDriver();
        driver.manage().window().maximize();
    }

    @Test
    public void testLoginLogout() {
        driver.get("http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx");

        // Fill in Username
        WebElement usernameField = driver.findElement(By.id("ctl00_MainContent_username"));
        usernameField.sendKeys("Tester");

        // Fill in Password
        WebElement passwordField = driver.findElement(By.id("ctl00_MainContent_password"));
        passwordField.sendKeys("test");

        // Click Login button
        WebElement loginButton = driver.findElement(By.id("ctl00_MainContent_login_button"));
        loginButton.click();

        // Click Logout link
        WebElement logoutLink = driver.findElement(By.linkText("Logout"));
        logoutLink.click();
    }

    @AfterClass
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
