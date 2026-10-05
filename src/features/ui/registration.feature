@registration @smoke
Feature: Purpos business account registration
  As a new business owner
  I want to register my Mie SS business
  So that I can use the Purpos management application

  Scenario: Register a Mie SS Rungkut business account
    Given I open the Purpos registration form
    When I submit the configured business registration details
    Then I should see the registration confirmation