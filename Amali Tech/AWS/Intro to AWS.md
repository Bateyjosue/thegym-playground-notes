> AWS has an extensive, reliable, and secure global cloud infrastructure with 175 services for a wide range of use cases.

You will be able to do the following:
- Discuss the history of AWS cloud computing
- Describe the AWS global infrastructure
- Discuss the customer and AWS parts of the shared responsibility model
- Describe the well-Architected Framework and discuss how to apply  the pillars
- Define the total cost of ownership and billing considerations
## AWS offerings
- Compute (EC2)
- Storage (S3 Simple storage service )
- Database (RDS => relational Databases service)
- Analytics
- Networking & Content Delivery
- Developer tools
- Business Applications
- Management Governance
- Internet of Things
- Security, Identity & Compliance

## AWS benefits
- On-demand access to over 175 services cloud-based services
- pay-as-you-go pricing
- no upfront capital expenses or commitments
- toolbox of high-end services

## AWS Global Infrastructure benefits
- Performance (high performing, low latency cloud infrastructure with unlimited capacity)
- availability(availability zones are designed for physical redundancy and to provide resilience)
- security
- Reliability
- scalable
- low cost
## Shared responsibility
==> The Customers are responsible for their security  IN the Cloud
==> AWS is responsible for the security OF the Cloud


## AWS Well-architected framework
### Operational Excellence
> the ability to run and monitor systems to deliver business value and to continually improve supporting processes and procedures
	> Performing operations as code
	> annotating documentation
	> anticipating failure
	> frequently making small reversible changes
### Security
> ability to protect information, systems and assets while delivering business value through risk assessments and mitigation strategies
#### Security Best practices
	> Automate security best practices when possible
	> apply security at all layers
	> protect data in transit and rest
### Reliability
> the ability of a system to
	> Recover from infrastructure or service disruptions
	> Dynamically acquire computing resources to meet demand
	> Mitigating disruptions such as transient network issues or misconfigurations
#### Also includes
	> Testing recovery procedures
	> scaling horizontally to increase aggregate system availability
	> automatically rcovery from failure
### Performance efficiency
> the ability to use computing resources efficiently to meet system requirements and to maintain that efficiently as demand changes and technologies evolve

####
### Cost optimization
> the ability to run systems to deliver business value at the lowest price point.


## AWS Well-architected Tool
> Review yours against the five pillars established by the well-architected framework

## Costs and Billing
### Total Cost of Ownership (TCO)
> is a financial metric that is used to estimated and compare direct and indirect costs of a product or service.
> It typically includes the actual costs of the following:
	> Procurement
	> Management
	> Maintenance
	> Decommissioning of hardware resources

### TCO Calculator
	> Summary report
	> comprehensive detailed report
	> FAQ that explains assumptions and methods used
#### To use TCO Calculator
	> Add services
	> Configure service
	> view estimate totals
	
### AWS pricing models
#### Pay-as-you-go
> to easily adapt to changing business needs and improve your responsiveness to changes, without overcommitting your budgets
#### Save when you reserve
> often referred to as purchasing instances.  
> Example:
	> AWS compute
	> AWS machine learning
	> AWS database services
	
> Offer savings over On-demand in exchange for a commitment to use specific amount
#### Pay less by using more
> get volume-based discounts and realize savings as your usage increases. pricing is tiered, which means that the more you use the less you pay per GB. 
> Example: Amazon S3

## AWS Free Tier
> Save money as you learn and  experiment with AWS Free Tier

	> Always free => AWS Lambda gives 1 million free requests per month every month, free to all customers
	> 12 months free => you have access to some services for free for 12 months following your initial sign-up date (AC2 gives 750 hours free usage with the t2.micro instance, )
	> Trials => short-term free trial start from the date you activate a particuar service based on a defined parameters for that sevice (Amazon SageMaker gives 2 months but you are limited on the number of hours of use based on instance size, Amazon GuardDuty offered on a trial basis for only 20 days)
	
## AWS Billing Dashboard
> use to pay your AWS bill,  monitor your usage, and analyze and control your costs

### VPC
> virtual Privacy Cloud

- VPC Only and VPC & more
### IAM
> Identity Access Management

- When you create a AWS you become a account owner
- for all daily tasks create an administrator account

### Lambda
> is a serverless computing service. allows you to run code without provisioning or managing servers, enabling you to focus on writing and deploying code while AWS handles the underlying infrastructures.

	> Designed to scale automatically
	> handle high availablility 
	> execute code in response to events
	
> AWS lambda lets you run code in response to events(HTTP request, a file upload to an S3 bucket or a message in a queue) without worrying about servers

###### Key aspects
1. Serverless: no need to manage servers, OS, or scaling
2. event-driven: triggered by events such as changes in a S3 bucket, API gateway requests or CloudWatch schedule
3. pay-per-use: charged based on the number of requests and the execution time
4. supported languages: support multiple languages Node.js. Python, Java, Go Ruby, and .NET

- create lambda function using a blue print
- verified if the application is accessible online
- add a trigger to invoke the function

### CloudWatch
> is a monitoring and observability service provided by amazon. 
	> collect
	> track
	> analyze metrics
	> logs and 
	> events from AWS resources, application and services in real time
	
###### Used for:
- monitoring the performance
- tracking application logs and system-wide events
- setting up alert and automating response
- gaining insights into resource utilization, application health and system behavior