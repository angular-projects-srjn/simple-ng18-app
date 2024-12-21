# Deploying a Node.js Application on AWS EC2

This guide provides step-by-step instructions to deploy a Node.js application on an AWS EC2 instance.

---

## Testing the Project Locally

1. **Clone the Project**
   ```bash
   git clone https://github.com/angular-projects-srjn/simple-ng18-app.git
   ```

2. **Initialize and Start the Project**
   ```bash
   npm install
   ng build --configuration=development  # For faster bundling during testing
   npm run start
   ```

---

## Setting up an AWS EC2 Instance

1. **Create an IAM User and Login to AWS Console**
   - Access Type: Password
   - Permissions: Admin Access

2. **Create an EC2 Instance**
   - Select an OS Image: Ubuntu
   - Create a New Key Pair: Download the `.pem` file
   - Instance Type: t3.micro (Free Tier eligible)

3. **Connect to the Instance Using SSH**
   ```bash
   ssh -i instance.pem ubuntu@<EC2_PUBLIC_IP>
   ```

---

## Configuring Ubuntu on the Remote VM

1. **Update Outdated Packages and Dependencies**
   ```bash
   sudo apt update
   ```

2. **Install Git**
   Follow this [Guide by DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-22-04).

3. **Install Node.js and npm**
   Follow this [Guide by DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04).

---

## Deploying the Project on AWS

1. **Clone the Project on the Remote VM**
   ```bash
   git clone https://github.com/angular-projects-srjn/simple-ng18-app.git
   ```

   > **Note**: Set up an [Elastic IP Address](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html) for your EC2 instance. This IP will act as your project’s domain.

2. **Initialize and Start the Project**

   ```bash
   npm install
   
   # Build the application for faster bundling during testing
   ng build --configuration=development

   # Address low-resource issues on Free Tier EC2 instances:
   sudo fallocate -l 2G /swapfile
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile

   # Make the swap memory change permanent:
   echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
   
   # Start the server
   npm run start
   ```

3. **Edit Inbound Rules in the EC2 Security Group**
   - Allow traffic on the port your application is using (default: 4200 for this example).
   - Update the rules to allow HTTP traffic from your IP or `0.0.0.0/0` (for testing purposes).

---

## Application Deployment Completed

Your Node.js application is now deployed on AWS EC2 and accessible via the Elastic IP Address. 🎉

---

## Additional Notes

- **Resource Management**:
  If your EC2 instance gets stuck during `ng build`, ensure you have sufficient swap memory to handle resource-intensive processes.

- **Scaling for Production**:
  For production deployments, use `ng build --configuration=production` for optimized builds. Consider upgrading your instance type for better performance.

- **Troubleshooting**:
  Monitor logs using:
  ```bash
  sudo journalctl -u node.service
  ```

