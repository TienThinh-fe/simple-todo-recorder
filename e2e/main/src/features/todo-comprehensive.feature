Feature: Todo Application Core Functionality
  As a user
  I want to interact with the todo application
  So that I can manage my daily tasks effectively

  @TodoModule @regression @HappyPath @CompleteFlow
  Scenario: Complete todo management workflow
    Given I open the todo application
    And the todo application is ready
    When I enter "Automation test for todo creation" in the todo name field
    And I select "high" priority
    And I set the due date to "2025-12-31"
    And I click the add todo button
    Then I should see "Automation test for todo creation" in the todo list
    And the todo should show "HIGH PRIORITY" label
    And the todo should show due date information

  @TodoModule @smoke @BasicValidation
  Scenario: Verify todo application loads correctly
    Given I open the site "/"
    Then I wait on element "todoNameInput" for 60000ms to be displayed
    And I expect that the title is "Simple Todo Recorder"
    And I expect that element "todoNameInput" is displayed
    And I expect that element "addButton" is displayed
    And I expect that element "todoCounter" is displayed
    Then the todo application should be ready

  @TodoModule @regression @FormValidation @HappyPath
  Scenario: Create todo with detailed form interaction
    Given I open the site "/"
    Then I wait on element "todoNameInput" for 60000ms to be displayed
    And I expect that the title is "Simple Todo Recorder"
    When I pause for 1000ms
    And I wait on element "todoNameInput" for 60000ms to be enabled
    And I wait on element "todoNameInput" for 60000ms to be clickable
    And I click on the element "todoNameInput"
    When I set "High priority task with deadline" to the inputfield "todoNameInput"
    And I wait on element "prioritySelect" for 60000ms to be enabled
    And I click on the element "prioritySelect"
    And I pause for 1000ms
    And I select "high" priority
    And I wait on element "dueDateInput" for 60000ms to be enabled
    And I wait on element "dueDateInput" for 60000ms to be clickable
    And I click on the element "dueDateInput"
    When I set "2025-07-20" to the inputfield "dueDateInput"
    And I pause for 1000ms
    And I wait on element "addButton" for 60000ms to be enabled
    And I wait on element "addButton" for 60000ms to be clickable
    When I click on the element "addButton"
    Then I pause for 2000ms
    And I should see "High priority task with deadline" in the todo list
    And the todo should show "HIGH PRIORITY" label
    And the todo should show due date information

  @TodoModule @regression @MultipleItems @HappyPath
  Scenario: Create multiple todos with different priorities
    Given I open the site "/"
    Then I wait on element "todoNameInput" for 60000ms to be displayed
    And I expect that the title is "Simple Todo Recorder"
    
    # Create first todo - High priority
    When I wait on element "todoNameInput" for 60000ms to be enabled
    And I set "Urgent task - high priority" to the inputfield "todoNameInput"
    And I select "high" priority
    And I click on the element "addButton"
    Then I pause for 1000ms
    
    # Create second todo - Medium priority
    When I wait on element "todoNameInput" for 60000ms to be enabled
    And I set "Regular task - medium priority" to the inputfield "todoNameInput"
    And I select "medium" priority
    And I click on the element "addButton"
    Then I pause for 1000ms
    
    # Create third todo - Low priority
    When I wait on element "todoNameInput" for 60000ms to be enabled
    And I set "Optional task - low priority" to the inputfield "todoNameInput"
    And I select "low" priority
    And I click on the element "addButton"
    Then I pause for 1000ms
    
    # Verify all todos are created
    Then I should see "Urgent task - high priority" in the todo list
    And I should see "Regular task - medium priority" in the todo list
    And I should see "Optional task - low priority" in the todo list
    And I should see 3 todos in the list
