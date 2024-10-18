
# Donation Platform Frontend

This repository contains the frontend code for a donation platform built with HTML5, CSS, Tailwind CSS, and JavaScript. The platform allows users to browse donation campaigns, make donations, and track their contributions. It is designed to be responsive and user-friendly.



## Features

- User Authentication: User can Register and log in to their profile and  manage.
- Create & Manage Campaigns: Users can create, update, and delete their donation campaigns..
- Browse Campaigns: Optimized for mobile, tablet, and desktop devices using Tailwind CSS.
- Responsive Design: Optimized for mobile, tablet, and desktop devices using Tailwind CSS.
- Make Donations: Securely donate to campaigns through integrated payment gateways.
- Donation History: Track previous donations with detailed receipts.
- Payment Integration: Securely process donations via  payment gateways (e.g. SSLCommerz).





## Tech Stack

**frontend:** Html5,TailwindCSS,Javascript,

**Backend:** Django

**Database:** PostgreSQL

**Payment Gateway:** SSLCommerz

**Cloud Storage:** Cloudinary




## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/donation-platform-frontend.git
cd donation-platform-frontend


```


```bash
Open the project in your editor (e.g., Visual Studio Code).
```
```bash
Now you can see the project use live server.
```



## Api endpoint
#### User Authentication:

- POST /api/register/ – Register a new user

- POST /api/login/ – Log in a user

- POST /api/logout/ – Log out a user
#### Campaign Management:

- GET /api/campaigns/ – List all campaigns

- POST /api/campaigns/create/ – Create a new campaign

- PUT /api/campaigns/update/<id>/ – Update a campaign

- DELETE /api/campaigns/delete/<id>/ – Delete a campaign

#### Donation Management:

- POST /api/donations/ – Process a donation

- GET /api/donations/history/ – View donation history

## Support

For support, email tanjidnafis@.com 

