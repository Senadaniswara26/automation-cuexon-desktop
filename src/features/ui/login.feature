@ui @smoke
Feature: SauceDemo login
  As a store user
  I want to sign in
  So that I can access the product dashboard

  Scenario Outline: Sign in with <credentialSet> credentials
    Given the test environment is configured
    And I open the SauceDemo login page
    When I sign in with the "<credentialSet>" credentials
    Then I should see the "<expectedResult>" login result

    Examples:
      | credentialSet | expectedResult |
      | valid         | success        |
      | invalid       | failure        |