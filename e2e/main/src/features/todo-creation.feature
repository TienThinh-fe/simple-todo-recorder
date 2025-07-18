Feature: Todo Creation and Management
  As a user of the Todo application
  I want to create and manage my todos
  So that I can keep track of my tasks

  # Background runs before each scenario in this feature
  Background:
    Given I open the todo application
    And the todo application is ready

  @TodoModule @smoke @CreateTodo @HappyPath
  Scenario: Create a simple todo successfully
    When I add a todo "Buy groceries"
    Then I should see "Buy groceries" in the todo list
    And the todo counter should show "1 todo item"

  @TodoModule @regression @CreateTodo @HappyPath
  Scenario: Create todo with high priority
    When I enter "Important meeting preparation" in the todo name field
    And I select "high" priority
    And I click the add todo button
    Then I should see "Important meeting preparation" in the todo list
    And the todo should show "HIGH PRIORITY" label

  @TodoModule @regression @CreateTodo @HappyPath
  Scenario: Create todo with due date
    When I enter "Submit project report" in the todo name field
    And I set the due date to "2025-12-31"
    And I click the add todo button
    Then I should see "Submit project report" in the todo list
    And the todo should show due date information

  @TodoModule @regression @CreateTodo @HappyPath
  Scenario: Create todo with all details
    When I fill in the todo form with "Complete automation framework" and "high" priority and "2025-08-01" due date
    And I click the add todo button
    Then I should see "Complete automation framework" in the todo list
    And the todo should show "HIGH PRIORITY" label
    And the todo should show due date information

  @TodoModule @regression @CreateTodo @MultipleItems
  Scenario: Create multiple todos and verify counter
    When I add a todo "First task"
    And I add a todo "Second task"
    And I add a todo "Third task"
    Then I should see 3 todos in the list
    And I should see "First task" in the todo list
    And I should see "Second task" in the todo list
    And I should see "Third task" in the todo list
