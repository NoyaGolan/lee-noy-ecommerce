# MERN Ecommerce

## Description

This MERN stack e-commerce application offers a robust platform with different user roles and functionalities:

### User Roles and their Functionalities:

- **Admins:**
  - Oversee the entire store operations.
  - Categorize and manage brands.
  - Approve or reject merchant sign-up requests.
  - Publish user-submitted product reviews after moderation.
  - Group related products to be displayed as collections in the shop.
  - Update the status of orders (e.g., processing, shipped, delivered).
  - Handle product stock status and availability.

- **Merchants:**
  - Initially join the platform as members.
  - Can transition to becoming merchants by signing up and filling out the "Sell with us" form accessible in the site's footer.
  - Once approved by an admin, they can add products to their brand.
  - Manage their brand's product listings and details.
  - Observe their products displayed in the store once the brand is active.

- **Members:**
  - Explore the store's categories, products, and brands.
  - Purchase products and manage their orders.
  - Add products to their wishlist for future consideration.
  - Write and submit reviews for purchased products, including text feedback and a 1-5 star rating system.

### General User Experience:

- **Guests and New Users:**
  - Start as guests with browsing capabilities.
  - Sign-up option available to become a member.
  - Members have the opportunity to apply to become merchants.
  - You can search for products by their name (if activated)

- **Product Availability:**
  - Product listings include stock availability.
  - Out-of-stock products are clearly indicated, ensuring informed purchasing decisions.

- **Order Management:**
  - Users can view the real-time status of their orders within the dashboard under the "Orders" section.
  - Admins maintain oversight of order processing and updates.


## Quick Start

To run the project, please use Node.js version 16.6.0 (nvm use 16.6.0 - install if needed).

Create .env files for both backend (be) and frontend (fe).

For the backend (.env): <br>
PORT=3000 <br>
MONGO_URI=mongodb://127.0.0.1:27017/mern_ecommerce <br>
JWT_SECRET=your_jwt_secret <br>
CLIENT_URL=http://localhost:8080 <br>
BASE_API_URL=api <br>


For the frontend (.env): <br>
NODE_ENV=development <br>
API_URL=http://localhost:3000/api <br>

________________________________________________________________
IMPORTANT NOTE: Enter fornted on **localhost:8080**
________________________________________________________________

* Run `npm install` in both server and client directories.

* Execute `npm run dev` on the server and `npm start` on the client.

* Please ensure you run mongo locally on port 27017.

## Database Seeding

* Run `npm run seed-db` to seed the database with an admin user and two member users, one of which will become a merchant, as per the following instructions:

1. Connect with `merchant@gmail.com` using the password `merchant123`.
2. Navigate to the footer and click "Sell with us" then fill out the form using the email `merchant@gmail.com`.
3. Sign out and log in as the admin user `admin@gmail.com` with the password `admin123`.
4. Approve the merchant through the dashboard by navigating to "Merchants" and clicking the green checkmark.
5. Activate the merchant's brand by going to "Brands," clicking the brand name, and toggling the activation switch.
6. Sign out as admin and sign in with `merchant@gmail.com` using the password `merchant123`.
7. Add a product by going to "Products" in the dashboard and clicking "Add."
8. The brand is now active, and products will appear in the shop.
9. You can like a product and view it in the wishlist through the dashboard.
10. Log in as a member to experience the shop from a member's perspective.
11. continue to explore the shop and its features - see description above!

## Languages & Tools

- Node.js
- Express
- MongoDB with Mongoose
- React
- Webpack

