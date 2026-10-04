# AOM LAUNDRY MANAGEMENT SYSTEM

## Project Context & Development Reference

> This document is the persistent project context for the AOM Laundry Management System.
>
> It should be referred to whenever implementing, modifying, debugging, or extending the application.
>
> Do not invent business rules that are not defined here. If a business rule is marked as **TBD / Requires Confirmation**, do not permanently assume an implementation without confirmation.

---

# 1. PROJECT OVERVIEW

## Business

**The AOM Industrial Laundry Service**

The AOM is a B2B / industrial laundry business serving hotels and other businesses around Pondicherry / Auroville.

Current laundry operations involve manually managing:

* Customers
* Laundry materials
* Material quantities
* Soil/dirty laundry received
* Fresh/clean laundry delivered
* Pending laundry balances
* Customer-specific pricing
* Monthly billing
* Invoices
* Historical records

The goal of this project is to digitize these operations into a centralized responsive web application.

---

# 2. WHAT WE ARE BUILDING

This is a **business operations management web application**, not a marketing website.

The application has three primary portals:

1. **Admin Portal**
2. **Employee Portal**
3. **Customer / Hotel Portal**

The application must work through a web browser on:

* Desktop
* Laptop
* Tablet
* Mobile

A separate native Android or iOS application is NOT part of the current application.

---

# 3. PRIMARY OBJECTIVES

The system should:

* Reduce manual work.
* Reduce calculation mistakes.
* Centralize customer information.
* Track laundry material movement.
* Track customer-specific material configurations.
* Support customer-specific pricing.
* Automatically calculate pending laundry balances.
* Maintain historical laundry records.
* Simplify monthly billing.
* Generate and manage invoices.
* Provide useful operational reports.
* Give customers visibility into their own laundry activity.
* Provide secure role-based access.
* Provide a clean foundation for future SaaS expansion.

---

# 4. CORE BUSINESS CONCEPT

The core relationship of the application is:

```text
Customer
    ↓
Customer Materials
    ↓
Customer-specific Pricing
    ↓
Laundry Transactions
    ↓
Balance
    ↓
Billing
    ↓
Invoice
    ↓
Reports
```

These relationships are important and should not be treated as independent modules.

For example:

A customer's price for Bedsheet affects future billing.

A price change must NOT change old invoices.

A customer must only see transactions belonging to that customer.

---

# 5. USER ROLES

There are three primary user types.

---

## 5.1 ADMIN

Admin has full access to the application.

Admin can manage:

* Dashboard
* Customers
* Employees
* Materials
* Customer-material configuration
* Customer-specific pricing
* Laundry operations
* Laundry history
* Billing
* Invoices
* Reports
* Settings
* User access

Admin can view information across the entire AOM business.

---

## 5.2 EMPLOYEE

Employees primarily work with daily laundry operations.

Employee capabilities may include:

* Login
* View assigned/relevant customers
* Select customer
* Select material
* Record soil/dirty laundry received
* Record fresh/clean laundry delivered
* View daily records
* View permitted historical records
* Correct permitted entries

Employees should not have unrestricted access to:

* User administration
* Customer pricing management
* System settings
* Sensitive administrative information

Exact employee permissions may be refined later.

---

## 5.3 CUSTOMER / HOTEL

Each customer gets their own account.

Customers can view only their own organization's/business data.

Potential capabilities:

* Login
* Dashboard
* Laundry activity
* Current pending balance
* Historical transactions
* Billing information
* Invoices
* Issue/complaint reporting if enabled

A customer must never be able to access another customer's data.

---

# 6. ADMIN PORTAL

Recommended navigation:

```text
Dashboard
Customers
Materials
Pricing
Laundry Operations
Invoices
Reports
Employees
Settings
```

---

## 6.1 ADMIN DASHBOARD

The dashboard should provide a quick operational overview.

Potential KPI cards:

* Active Customers
* Today's Soil Received
* Today's Fresh Delivered
* Pending Laundry
* Today's Laundry Value
* Pending Invoices

Potential sections:

### Customer Activity

Customer-wise activity and summary.

### Recent Transactions

Recently recorded laundry transactions.

### Weekly Movement

Visualize:

* Soil Received
* Fresh Delivered

over a selected period.

### Alerts

Examples:

* High pending balance
* Pending invoices
* Other operational warnings

The dashboard should prioritize useful business information over decorative charts.

---

# 7. CUSTOMER MANAGEMENT

Admin should be able to:

* Create customer
* View customer
* Edit customer
* Search customers
* Filter customers
* Activate/deactivate customer
* View customer details
* View customer materials
* View customer pricing
* View customer laundry history
* View customer billing information

Potential customer fields:

```text
Customer ID
Business / Hotel Name
Contact Person
Phone
Email
Address
Billing Address
GST Number
Notes
Status
Created At
Updated At
```

Customer status:

```text
Active
Inactive
```

Inactive customers should not appear in normal active operational selection lists.

Historical records must remain available.

Avoid physically deleting customers if doing so would break historical transactions or invoices.

Prefer deactivation / soft deletion.

---

# 8. MATERIAL MANAGEMENT

AOM has a master list of laundry materials.

Examples:

* Bedsheet
* Pillow Cover
* Bath Towel
* Hand Towel
* Blanket
* Curtain
* Hotel Uniform
* Other materials

Admin should be able to:

* Add material
* Edit material
* View material
* Activate/deactivate material
* Search/filter materials

A master material is not automatically assumed to be used by every customer.

---

# 9. CUSTOMER-SPECIFIC MATERIALS

Different customers may use different materials.

Example:

### Hotel A

* Bedsheet
* Pillow Cover
* Bath Towel

### Hotel B

* Bedsheet
* Blanket
* Hand Towel
* Curtain

Therefore the system needs a relationship between:

```text
Master Material
        +
Customer
        ↓
Customer Material Configuration
```

The same master material can belong to multiple customers.

Each customer can have their own configured material list.

---

# 10. CUSTOMER-SPECIFIC PRICING

The same material can have different prices for different customers.

Example:

### Hotel A

```text
Bedsheet       ₹100
Pillow Cover   ₹5
Bath Towel     ₹15
```

### Hotel B

```text
Bedsheet       ₹80
Pillow Cover   ₹4
Bath Towel     ₹12
```

The system must support customer-specific pricing.

---

# 11. HISTORICAL PRICING RULE

This is a critical business rule.

Changing the current price must NOT modify historical billing records.

Example:

Hotel A:

```text
Old Bedsheet price = ₹100
New Bedsheet price = ₹120
```

An invoice created when the price was ₹100 must continue showing:

```text
Bedsheet × quantity × ₹100
```

It must not automatically become ₹120.

Therefore historical invoices must preserve the actual rate used at the time of billing.

Do not calculate historical invoice amounts using only the current price table.

---

# 12. UNIT / PRICING MODEL

Materials may potentially be billed by different units.

Possible units:

* Piece
* Kilogram
* Other business-defined unit

The exact final unit model is **TBD / Requires Confirmation**.

Do not hard-code the entire system around only "piece" if the business may require kilogram-based pricing.

Potential relationship:

```text
Material
    ↓
Unit
    ↓
Customer-specific Rate
```

---

# 13. LAUNDRY OPERATIONS

Laundry operations are the core operational workflow.

The system tracks movement of materials between:

```text
Customer → AOM Laundry
AOM Laundry → Customer
```

The current business terminology includes:

* Opening Balance
* Soil Sent
* Fresh Received
* Balance
* Total Laundry

The exact UI labels may be improved for clarity, but the underlying business meaning must remain correct.

---

# 14. LAUNDRY TERMINOLOGY

## Opening Balance

The pending laundry quantity carried from previous records/day.

---

## Soil Received

Dirty / soiled material received from the customer by the laundry.

This may also be referred to internally as:

* Soil Sent
* Sent to Laundry

The final terminology should be confirmed with the business.

---

## Fresh Delivered

Clean/fresh material returned by AOM to the customer.

This may also be referred to internally as:

* Fresh Received
* Received Back

The final terminology should be confirmed with the business.

---

## Balance

Pending laundry remaining after accounting for soil received and fresh delivered.

Current working formula:

```text
Balance =
Opening Balance
+
Soil Received
-
Fresh Delivered
```

Example:

```text
Opening Balance = 0
Soil Received = 10
Fresh Delivered = 8

Balance = 0 + 10 - 8
Balance = 2
```

Therefore 2 items remain pending.

---

# 15. TOTAL LAUNDRY

The business currently uses the term:

**Total Laundry**

A working interpretation is:

```text
Total Laundry =
Soil Received + Balance
```

However, this definition is **NOT YET CONFIRMED**.

Do not permanently implement this as the final business rule until confirmed with AOM.

The exact meaning of "Total Laundry" must be confirmed.

---

# 16. DAILY TRANSACTION MODEL

Preferred operational model:

One transaction can contain both sides of a movement.

Example:

```text
Customer: Hotel A
Material: Bedsheet

Soil Received: 10
Fresh Delivered: 8
```

The system calculates:

```text
Balance = 2
```

Employees should not be forced to create two unrelated records for the same movement unless the business specifically requires it.

---

# 17. MULTIPLE TRANSACTIONS PER DAY

The business may have multiple pickup/delivery movements in the same day.

Example:

### Morning

```text
Soil Received = 20
Fresh Delivered = 15
```

### Evening

```text
Soil Received = 10
Fresh Delivered = 12
```

The system should be architecturally capable of supporting multiple transactions per day.

However, the exact preferred workflow:

* Multiple individual transactions
* One consolidated daily entry
* Both

is **TBD / Requires Confirmation**.

Do not remove the possibility of multiple transactions through an overly restrictive database design.

---

# 18. LAUNDRY TRANSACTION DATA

A laundry transaction may contain:

```text
Transaction ID
Customer ID
Material ID
Transaction Date
Opening Balance
Soil Received
Fresh Delivered
Calculated Balance
Applicable Rate
Unit
Created By
Created At
Updated At
Notes
```

Additional fields may be introduced if business requirements require them.

---

# 19. BALANCE CALCULATION

The system should calculate balances reliably.

Current working formula:

```text
Balance =
Opening Balance
+
Soil Received
-
Fresh Delivered
```

Example:

```text
Opening = 5
Soil = 20
Fresh = 15

Balance = 5 + 20 - 15
Balance = 10
```

Critical rule:

The calculation should not exist only in frontend UI.

The backend/business logic must validate or calculate critical values.

Do not trust a client-submitted balance value.

---

# 20. NEGATIVE BALANCE

The behavior when:

```text
Fresh Delivered > Opening Balance + Soil Received
```

must be confirmed.

Possible interpretations:

* Prevent the transaction
* Allow it with warning
* Allow negative balance
* Treat as correction

Do not choose silently.

Mark as **Business Rule TBD** until confirmed.

---

# 21. LAUNDRY HISTORY

The application must maintain historical laundry records.

Admin should be able to filter by:

* Customer
* Material
* Date
* Date range
* Month

Customers should be able to view their own historical records.

Historical data must remain available even when:

* Customer becomes inactive
* Material becomes inactive
* Employee account is disabled
* Pricing changes

---

# 22. HISTORICAL EDITING

The exact editing rules need confirmation.

Potential model:

* Employees can correct recent/same-day entries.
* Older records require Admin access.
* Important historical changes may require an audit trail.

Potential audit information:

```text
Who changed it
What changed
Previous value
New value
Changed At
```

Do not automatically give employees unrestricted access to historical edits.

---

# 23. CUSTOMER PORTAL

Customer portal should be intentionally simpler than Admin.

Potential dashboard:

```text
Current Pending Laundry
Today's Sent Quantity
Today's Received Quantity
Recent Activity
Latest Invoice
Billing Status
```

Customer should be able to access:

* Laundry Activity
* Current Balance
* History
* Invoices
* Profile
* Issues/Support if included

---

# 24. CUSTOMER DATA ISOLATION

This is a critical security requirement.

Customer A must never be able to view:

* Customer B's transactions
* Customer B's invoices
* Customer B's prices
* Customer B's materials
* Customer B's reports

Do not rely only on frontend route protection.

Backend/database queries must enforce customer ownership.

Example:

A customer request should resolve the authenticated customer's identity first and then query only records belonging to that customer.

Do not trust arbitrary customer IDs supplied by the frontend.

---

# 25. EMPLOYEE PORTAL

Employee portal should focus on daily operations.

Potential navigation:

```text
Dashboard
Laundry Operations
Customers
History
Profile
```

Main workflow:

```text
Login
↓
Select Customer
↓
Select Material
↓
Enter Soil Received
↓
Enter Fresh Delivered
↓
System Calculates Balance
↓
Save Transaction
```

Employees should receive clear validation and confirmation feedback.

---

# 26. MONTHLY BILLING

The system should support monthly billing.

Admin should be able to:

* Select customer
* Select billing period
* Review billable records
* Generate invoice
* View previous invoices

The exact billing calculation is **TBD / Requires Confirmation**.

Potential billing bases include:

* Fresh Delivered quantity
* Soil Received quantity
* Another business-defined quantity

Do not assume that "Total Laundry" automatically determines billing.

---

# 27. INVOICE

Potential invoice fields:

```text
Invoice ID
Invoice Number
Customer
Billing Period
Invoice Date
Invoice Items
Quantity
Unit
Rate
Amount
Subtotal
Tax
Grand Total
Status
Created At
```

Invoice item should preserve:

```text
Material
Quantity
Unit
Historical Rate
Amount
```

The rate must not change when the customer's future price changes.

---

# 28. TAX / GST

GST/tax requirements must be confirmed.

Potential invoice fields may include:

```text
Subtotal
Tax
Grand Total
```

Do not hard-code a tax percentage without confirmation.

---

# 29. INVOICE STATUS

Potential statuses:

```text
Draft
Generated
Sent
Paid
Partially Paid
Overdue
Cancelled
```

The exact V1 status workflow may be simplified after business confirmation.

---

# 30. REPORTS

Basic operational reports should include:

* Customer-wise laundry report
* Material-wise report
* Daily report
* Monthly report
* Balance report
* Billing report
* Historical transactions

Useful filters:

```text
Customer
Material
Date
Date Range
Month
Status
```

Reports should prioritize correctness over visual complexity.

---

# 31. ISSUE / COMPLAINT MANAGEMENT

Potential customer issues:

* Missing material
* Quantity mismatch
* Damaged material
* Wrong material
* Other

Potential statuses:

```text
Open
In Progress
Resolved
Closed
```

Potential workflow:

```text
Customer reports issue
↓
Admin/Employee reviews
↓
Status updated
↓
Resolution recorded
```

This module is considered a secondary feature unless confirmed as part of the final scope.

Do not over-engineer it without confirmation.

---

# 32. AUTHENTICATION

The application requires authentication.

Basic flow:

```text
Login
↓
Identify user
↓
Identify role
↓
Load permitted portal
↓
Enforce permissions
```

Authentication must be secure.

Frontend route protection alone is insufficient.

Backend authorization is required.

---

# 33. ROLE-BASED ACCESS CONTROL

Basic model:

### Admin

Full access.

### Employee

Laundry operation access.

### Customer

Own customer data only.

Do not simply hide buttons in the frontend and consider the feature protected.

Authorization must be enforced on backend/data-access operations.

---

# 34. DATABASE

## Production database

**PostgreSQL**

The application has a highly relational data model.

Important relationships include:

```text
User
↓
Role
↓
Customer / Organization

Customer
↓
Customer Materials
↓
Customer Pricing
↓
Laundry Transactions
↓
Invoices
↓
Reports
```

---

# 35. CONCEPTUAL DATABASE ENTITIES

The exact schema can evolve, but the following concepts are expected.

---

## User

Possible fields:

```text
id
name
email
phone
role
customerId / organizationId
status
createdAt
updatedAt
```

Authentication-specific fields depend on the authentication implementation.

---

## Customer / Organization

Possible fields:

```text
id
businessName
contactPerson
phone
email
address
billingAddress
gstNumber
notes
status
createdAt
updatedAt
```

---

## Material

Possible fields:

```text
id
name
unit
status
createdAt
updatedAt
```

---

## CustomerMaterial

Relationship between a customer and master material.

Possible fields:

```text
id
customerId
materialId
status
createdAt
updatedAt
```

---

## CustomerPrice

Possible fields:

```text
id
customerId
materialId
rate
unit
effectiveFrom
status
createdAt
```

The exact pricing-history model can evolve.

---

## LaundryTransaction

Possible fields:

```text
id
customerId
materialId
transactionDate
openingBalance
soilReceived
freshDelivered
balance
applicableRate
unit
createdBy
createdAt
updatedAt
notes
```

---

## Invoice

Possible fields:

```text
id
customerId
invoiceNumber
billingPeriodStart
billingPeriodEnd
subtotal
tax
total
status
generatedAt
```

---

## InvoiceItem

Possible fields:

```text
id
invoiceId
materialId
description
quantity
unit
rate
amount
```

The invoice item should preserve the historical rate.

---

# 36. HISTORICAL DATA INTEGRITY

Historical financial/business records must remain stable.

Example:

Current rate:

```text
Bedsheet = ₹120
```

Old invoice:

```text
Bedsheet
Quantity = 100
Rate = ₹100
Amount = ₹10,000
```

Changing the current rate to ₹120 must NOT change the old invoice.

Therefore invoice records must preserve their historical values.

---

# 37. SOFT DELETION

Avoid hard deletion of records that are referenced by:

* Transactions
* Invoices
* Historical reports

Examples:

If a material is no longer used:

```text
status = inactive
```

rather than deleting it and breaking old transactions.

Same principle applies to customers and users where appropriate.

---

# 38. SAAS-READY ARCHITECTURE

The current application is built for AOM.

However, the architecture should avoid unnecessary single-business assumptions.

Future concept:

```text
Organization / Tenant
    ↓
Users
    ↓
Customers
    ↓
Materials
    ↓
Customer Pricing
    ↓
Transactions
    ↓
Invoices
    ↓
Reports
```

Future possibilities:

* Multiple laundry businesses
* Separate business accounts
* Organization-level data isolation
* Multiple admins
* Subscription plans
* SaaS billing
* Advanced analytics
* Additional modules

Full SaaS functionality is NOT required in the current V1.

The goal is to keep the architecture reasonably extensible.

---

# 39. TECH STACK

## Frontend

* Next.js
* JavaScript
* Tailwind CSS

## Backend

* Node.js / Next.js backend

## Database

* PostgreSQL

## Hosting

* Cloud-based production hosting

### Important

Do not introduce TypeScript unless explicitly requested.

Do not replace PostgreSQL with another database without explicit project-level decision.

---

# 40. UI / UX PRINCIPLES

The application should feel like a modern B2B business application.

Design characteristics:

* Clean
* Professional
* Simple
* Trustworthy
* Practical
* Responsive
* Easy to scan
* Consistent
* Not unnecessarily flashy

The users may include business staff who are not highly technical.

Therefore:

* Use clear labels.
* Avoid unnecessary technical terminology.
* Keep forms straightforward.
* Use useful empty states.
* Use clear validation messages.
* Use clear success/error feedback.
* Avoid unnecessarily complicated workflows.

---

# 41. RESPONSIVE DESIGN

The application must work properly on:

* Desktop
* Laptop
* Tablet
* Mobile browser

Laundry operations may frequently be performed from mobile/tablet devices.

Do not design only for desktop and add mobile support later.

Responsive behavior should be considered from the beginning.

---

# 42. ADMIN NAVIGATION

Recommended:

```text
Dashboard
Customers
Materials
Pricing
Laundry Operations
Invoices
Reports
Employees
Settings
```

---

# 43. EMPLOYEE NAVIGATION

Recommended:

```text
Dashboard
Laundry Operations
Customers
History
Profile
```

May be simplified depending on actual workflow.

---

# 44. CUSTOMER NAVIGATION

Recommended:

```text
Dashboard
Laundry Activity
Balance
Invoices
Issues / Support
Profile
```

May be simplified depending on final requirements.

---

# 45. PROTOTYPE

The initial prototype is being developed before production implementation.

Prototype portals:

### Phase 1

Admin Portal

### Phase 2

Employee Portal

### Phase 3

Customer Portal

The Admin portal is intentionally being built first because it establishes most of the core business configuration and workflow.

---

# 46. PROTOTYPE PURPOSE

The prototype exists to validate:

* UX
* Navigation
* Business workflow
* Information architecture
* Dashboard layout
* Customer workflow
* Material workflow
* Pricing workflow
* Laundry operation workflow
* Billing workflow
* Portal separation

The prototype may use mock data.

---

# 47. PROTOTYPE VS PRODUCTION

Do not assume the prototype is production-ready.

Prototype may contain:

* Mock data
* Simulated interactions
* Frontend-only workflows
* Demonstration login
* Simulated invoices

Production must contain:

* Real authentication
* Real PostgreSQL database
* Secure backend
* Backend authorization
* Real business logic
* Real transaction persistence
* Validation
* Error handling
* Testing
* Deployment

---

# 48. CURRENT ADMIN PROTOTYPE MOCK DATA

Example demonstration values:

```text
Active Customers: 57

Today's Soil Received: 1,248

Today's Fresh Delivered: 1,087

Pending Laundry: 161

Today's Laundry Value: ₹84,560

Pending Invoices: 8
```

These values are ONLY prototype/demo data.

They must not be treated as actual AOM production data.

---

# 49. BUSINESS RULES THAT REQUIRE CONFIRMATION

The following must be confirmed before finalizing production logic.

## Laundry

* Exact Opening Balance definition
* Exact Balance formula
* Exact Total Laundry definition
* Multiple transactions per day
* Consolidated vs individual entries
* Negative balance behavior

## Materials

* Final material list
* Units
* Piece/kg/mixed model
* Customer-specific material configuration

## Pricing

* Customer-specific rates
* Rate effective dates
* Price history
* Discounts if any

## Billing

* Billing quantity
* Billing period
* GST/tax
* Discounts
* Invoice numbering
* Payment tracking

## Employees

* Exact permissions
* Customer visibility
* Historical editing permissions

## Customers

* Customer fields
* Customer portal requirements
* Issue/dispute workflow

## Operations

* Pickup/delivery workflow
* Challans
* Damaged materials
* Missing materials
* Quantity disputes

## Business structure

* Multiple branches
* Multiple locations
* Multiple customer contacts

---

# 50. IMPORTANT EDGE CASES

Consider these during implementation, but do not invent their final business behavior.

### Case 1

Fresh Delivered > available pending quantity.

Need business confirmation.

### Case 2

Customer sends soil but receives no fresh material that day.

Should be supported.

### Case 3

Customer receives fresh material but sends no soil that day.

Business behavior must be confirmed.

### Case 4

Multiple transactions for the same customer/material on the same day.

Architecture should support this.

### Case 5

Customer price changes.

Historical invoices remain unchanged.

### Case 6

Customer becomes inactive.

Historical data remains available.

### Case 7

Material becomes inactive.

Historical transactions remain available.

### Case 8

Employee leaves.

Historical transactions created by that employee remain intact.

### Case 9

Transaction is corrected.

Consider audit/history requirements.

### Case 10

Invoice has already been generated and pricing later changes.

Existing invoice must remain unchanged.

---

# 51. BACKEND BUSINESS LOGIC

Critical business logic must not exist only in the frontend.

The backend should validate:

* User permissions
* Customer ownership
* Material validity
* Customer-material relationship
* Pricing
* Quantities
* Transaction validity
* Invoice calculations
* Billing data

Frontend calculations can be used for UX, but backend must remain authoritative.

---

# 52. VALIDATION

Important validation areas:

## Customer

* Customer must exist.
* Customer must be active where required.

## Material

* Material must exist.
* Material must be configured for the selected customer.

## Quantity

* Validate numeric values.
* Prevent invalid values.
* Define negative-value behavior explicitly.

## Pricing

* Ensure a valid applicable rate exists when billing requires it.

## Invoice

* Ensure invoice items have valid historical rates.
* Ensure totals are calculated correctly.

## Authorization

* Verify user permissions server-side.

---

# 53. SECURITY PRINCIPLES

Important security requirements:

* Secure authentication
* Role-based authorization
* Server-side authorization
* Customer data isolation
* Input validation
* Secure environment variables
* Do not expose secrets to frontend
* Do not trust client-submitted IDs
* Do not trust client-submitted calculated totals
* Protect sensitive routes/API endpoints

---

# 54. DEVELOPMENT PRINCIPLES

When implementing a new feature:

1. Understand the business requirement.
2. Check this project context.
3. Identify the affected user role.
4. Identify affected database entities.
5. Check whether existing workflows are affected.
6. Check historical-data implications.
7. Implement backend/business logic.
8. Implement frontend UI.
9. Validate permissions.
10. Test edge cases.
11. Test responsive behavior.

---

# 55. DO NOT INVENT BUSINESS RULES

If a requirement is unclear, do not silently make up a permanent business rule.

Examples:

If the user asks:

> "Add billing."

Do not automatically assume:

* Billing is based on fresh delivered quantity.
* GST is 18%.
* Billing is monthly from 1st to 30th.
* Invoice is automatically marked paid.

Those are business decisions.

Instead identify what is known and what needs confirmation.

---

# 56. DO NOT BREAK EXISTING BUSINESS LOGIC

Before changing an existing workflow, check whether it affects:

* Balance calculations
* Historical transactions
* Pricing
* Billing
* Invoice calculations
* Customer data isolation
* Employee permissions

A UI improvement should not accidentally change business calculations.

---

# 57. TESTING PRIORITIES

Testing should particularly focus on:

### Calculation

```text
Opening + Soil - Fresh = Balance
```

### Pricing

Current price changes must not affect historical invoices.

### Authorization

Customer A cannot access Customer B.

### Roles

Employee cannot perform Admin-only actions.

### Billing

Invoice totals are accurate.

### Historical data

Deactivation and pricing changes do not destroy historical records.

### Responsive

All three portals work properly on mobile and desktop.

---

# 58. PRODUCTION-READINESS CHECKLIST

Before production release:

## Authentication

* Login
* Logout
* Session handling
* Password/security flow

## Authorization

* Admin
* Employee
* Customer

## Customers

* CRUD
* Activation/deactivation
* Search/filter

## Materials

* CRUD
* Activation/deactivation
* Customer mapping

## Pricing

* Customer-specific pricing
* Price history
* Historical rate preservation

## Laundry

* Soil received
* Fresh delivered
* Balance
* History
* Corrections

## Billing

* Billing period
* Quantity
* Rate
* Amount
* Tax
* Invoice totals
* Invoice numbering

## Reports

* Filters
* Correct calculations
* Correct data scope

## Responsive

* Mobile
* Tablet
* Desktop

## Deployment

* Production database
* Environment configuration
* Error handling
* Security
* Deployment
* Basic monitoring/logging as appropriate

---

# 59. PROJECT DIRECTORY / DEVELOPMENT ORGANIZATION

Keep the codebase modular.

Recommended conceptual separation:

```text
Application
├── Authentication
├── Admin
│   ├── Dashboard
│   ├── Customers
│   ├── Materials
│   ├── Pricing
│   ├── Laundry
│   ├── Invoices
│   ├── Reports
│   ├── Employees
│   └── Settings
│
├── Employee
│   ├── Dashboard
│   ├── Laundry
│   ├── Customers
│   └── History
│
├── Customer
│   ├── Dashboard
│   ├── Laundry Activity
│   ├── Balance
│   ├── Invoices
│   └── Profile
│
└── Shared
    ├── Components
    ├── Utilities
    ├── Validation
    └── Business Logic
```

This is a conceptual organization. Adapt it to the actual Next.js architecture being used.

---

# 60. IMPORTANT IMPLEMENTATION RULE

The application should be built as a **single coherent system**, not three completely separate applications.

The three portals share:

* Authentication
* Database
* Customers
* Materials
* Pricing
* Laundry transactions
* Billing
* Invoices
* Reports

Only the permissions and UI experience differ by role.

---

# 61. FUTURE EXPANSION

Potential future features may include:

* Multiple laundry businesses
* SaaS subscriptions
* Online payments
* WhatsApp notifications
* SMS notifications
* Pickup/delivery tracking
* Driver management
* GPS tracking
* Advanced analytics
* Accounting integrations
* Automated invoice delivery
* Customer support
* Mobile applications

These are future possibilities and should not be implemented unless explicitly added to the current requirements.

---

# 62. FINAL PRODUCT DEFINITION

The AOM Laundry Management System is a responsive B2B laundry operations platform that connects:

```text
AOM Admin
      ↓
Employees
      ↓
Laundry Operations
      ↓
Customers / Hotels
      ↓
Materials
      ↓
Pricing
      ↓
Transactions
      ↓
Balances
      ↓
Billing
      ↓
Invoices
      ↓
Reports
```

The system must prioritize:

1. Correct business logic
2. Data integrity
3. Security
4. Accurate calculations
5. Historical record reliability
6. Simple UX
7. Maintainable architecture
8. Responsive design
9. Future extensibility

---

# 63. CRITICAL RULES — QUICK REFERENCE

These rules should be remembered whenever modifying the application:

1. **PostgreSQL is the production database.**
2. **Frontend: Next.js + JavaScript + Tailwind CSS.**
3. **Do not introduce TypeScript unless explicitly requested.**
4. **There are three portals: Admin, Employee, Customer.**
5. **Customers must only access their own data.**
6. **Backend authorization is mandatory.**
7. **Customers can have different materials.**
8. **The same material can have different prices for different customers.**
9. **Historical invoices must preserve the rate used at the time.**
10. **Changing a current price must not modify old invoices.**
11. **Balance currently follows: Opening + Soil Received - Fresh Delivered.**
12. **Total Laundry definition is still subject to confirmation.**
13. **Billing calculation is still subject to confirmation.**
14. **GST/tax rules are still subject to confirmation.**
15. **Multiple transactions per day should be technically supportable.**
16. **Do not hard-delete historical records casually.**
17. **Do not invent unknown business rules.**
18. **Do not trust frontend calculations for critical business logic.**
19. **Prototype/mock data is not production data.**
20. **Native Android/iOS applications are not part of the current system.**
21. **Full SaaS functionality is not part of V1.**
22. **Keep the architecture modular and future-ready.**
23. **Keep the UI simple enough for non-technical business users.**
24. **Test calculations, authorization and historical data behavior carefully.**
25. **When requirements are ambiguous, identify the ambiguity before implementing permanent logic.**

---

# END OF PROJECT CONTEXT
