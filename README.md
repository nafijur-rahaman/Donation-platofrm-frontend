
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



## API Endpoints

### User Authentication

- **Register a New User**  
  `POST` [https://donation-platform-backend-psi.vercel.app/api/users/register/](https://donation-platform-backend-psi.vercel.app/api/users/register/)
  
- **Log in a User**  
  `POST` [https://donation-platform-backend-psi.vercel.app/api/users/login/](https://donation-platform-backend-psi.vercel.app/api/users/login/)
  
- **Log in Admin**  
  `POST` [https://donation-platform-backend-psi.vercel.app/api/manager/login/](https://donation-platform-backend-psi.vercel.app/api/manager/login/)
  
- **Log out a User**  
  `GET` [https://donation-platform-backend-psi.vercel.app/api/users/logout/](https://donation-platform-backend-psi.vercel.app/api/users/logout/)
  
- **Log out Admin**  
  `GET` [https://donation-platform-backend-psi.vercel.app/api/manager/logout/](https://donation-platform-backend-psi.vercel.app/api/manager/logout/)

### Campaign Management

- **List All Campaigns**  
  `GET` [https://donation-platform-backend-psi.vercel.app/api/campaign/list/](https://donation-platform-backend-psi.vercel.app/api/campaign/list/)
  
- **Create a New Campaign**  
  `POST` [https://donation-platform-backend-psi.vercel.app/api/campaign/list/](https://donation-platform-backend-psi.vercel.app/api/campaign/list/)
  
- **Update a Campaign**  
  `PUT` [https://donation-platform-backend-psi.vercel.app/api/campaign/list/campaignId/](https://donation-platform-backend-psi.vercel.app/api/campaign/list/campaignId/)
  
- **Delete a Campaign**  
  `DELETE` [https://donation-platform-backend-psi.vercel.app/api/campaign/list/campaignId/](https://donation-platform-backend-psi.vercel.app/api/campaign/list/campaignId/)

### Donation Management

- **Process a Donation**  
  `POST` [https://donation-platform-backend-psi.vercel.app/api/transactions/initiate-payment/](https://donation-platform-backend-psi.vercel.app/api/transactions/initiate-payment/)
  
- **View Donation History**  
  `GET` [https://donation-platform-backend-psi.vercel.app/api/transactions/list/](https://donation-platform-backend-psi.vercel.app/api/transactions/list/)


### Notes

- Replace `user_id` and `campaignId` in the URLs with the actual user or tuition post ID as required.
- Ensure you handle authentication tokens properly in your requests.


## Support


## Contact

For inquiries or support, please contact:
- **Project Developer**: Md. Nafijur Rahaman
- **Email**: tanjidnafis@gmail.com

