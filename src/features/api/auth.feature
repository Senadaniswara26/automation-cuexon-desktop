@api @smoke
Feature: DummyJSON authentication
  As an API consumer
  I want to authenticate and request my profile
  So that protected user data is available

  Scenario: Login and get the authenticated profile
    Given the test environment is configured
    Given I authenticate via API as "emilys" with password "emilyspass"
    Then the API login response should be successful
    When I request my profile via API
    Then the API profile username should be "emilys"