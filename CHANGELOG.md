# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - Post-Trip Flow

### Added

- Expenses Justification
- Expense Approval
- Expense Validation

## [0.2.0]: 2025-05-16: Request Follow-Up

### Added

- Applicant visualization of inactive requests (history of past trips).
- Applicant ability to edit active requests before approval.
- Applicant cancellation of active requests before they are approved.
- New Applicant draft requests page with continuous editing support.
- Pages for all authorization, attention, and reimbursement with pagination by role.

### Changed

- Confirmation modals added for critical actions.
- Adjusted href routes in navigation buttons to fix navigation issues.

## [0.1.0] - 2025-05-05: Pre-Trip Flow

### Added

- Personalized page header displaying the user’s name and role.
- Navigational sidebar accessible to all users.
- Role-based navigation ensuring each user sees only the sections relevant to their role.
- User profile page showing personal details.
- Applicant dashboard with a list of pending travel requests.
- Applicant ability to create new travel requests through a complete request form.
- Applicant history page showing all completed, approved, or rejected requests.
- Authorizer dashboard listing all pending requests awaiting authorization.
- Authorizer detailed request view with all necessary information to approve or reject requests.  
- Accounts Payable dashboard showing all pending budgeting requests to be quoted.
- Accounts Payable detailed request view with the ability to assign budgets and mark requests as attended.
- Travel Agency dashboard listing all pending travel arrangement requests.
- Travel Agency detailed request view with options to quote hotel and airfare costs, and mark requests as attended.

[unreleased]: https://github.com/101-Coconsulting/TC3005B.501-Frontend/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/101-Coconsulting/TC3005B.501-Frontend/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/101-Coconsulting/TC3005B.501-Frontend/releases/tag/v0.1.0
