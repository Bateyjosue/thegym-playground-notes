in the Client Server model  

- the Elastic Compute Cloud(EC2) act like a server
- only pay for what you used
- pay for what you need
- Cloud computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing
- deployment models:
> - Cloud-based deployment
> - On-premises deployment
>-  Hybrid deployment

- Benefits of cloud computing
	- Trade upfront expense for variable expense
	- Stop spending money to run and maintain data centers
	- Stop guessing capacity
	- Benefit from massive economies of scale
	- Increase speed and agility
	- Go global in minutes
## - Computer services
- host applications
- provide compute power
- in AWS server are virtual
- EC2 manages service side workloads
- you can terminate EC2 instances anytime you are done using them
- you only pay for what you use
- they use virtual machine and you share the host
- the hypervisor are in charge of sharing  the underlying hardware between machine also called **multitenancy**
- we can vertically scale  a instance by giving a bigger memory or CPU
- you can control the network of the EC2
- Compute as a Service (CaaS)
-  EC2 instances:
	- Instance families or Instance types:
		1. General purpose (balanced resources, diverse workloads, web servers, code repositories)
			- Application servers
			- gaming servers
			- backend servers for enterprise application
			- small and medium databases
		2. compute optimized (compute intensive tasks, gaming servers, high performance computing, scientific modeling)
			- high-performance web servers
			- compute-intensive applications servers
			- dedicated gaming servers
		3. memory optimized(memory intensive tasks)
			- high performance database
			- real-time processing
		4. accelerated computing(floating point number calculations, graphics procession, data pattern matching, hardware accelerators)
		5. storage optimized(high performance for locally stored data)
	> general purpose balances compute, memory and networking resources
- Amazon EC2 pricing:
	- On demand, usually for you started
	- Savings plan, 
	- Reserved instances, with predicted usage
	- spot instance, example for batch workloads
	- dedicated hosts, 
- Scaling Amazon EC2:
	- Amazon EC2 auto scaling ==enables you to automatically add or remove amazon EC2 instances in response to changing application demand==
	- Elastic Load balancing(ELB):  an application that takes request and route them to the instance to be process
		- regional construct runs at the regional level
		- auto scalable 
		- make decoupled architecture
	- Messaging and Queuing
		- **Tightly coupled architecture**: instances communicate directly if one fail can make the other ones to fail as well
		- **loosely coupled**: single failure wont cause cascading failures
		## Messaging Services
		- Amazon Simple Queue Service (Amazon SQS) messaging queuing service
			- send messages
			- store messages
			- receive messages
			- between software components
		- Amazon Simple Notification Service (Amazon SNS) Publish/Subscribe service
			- send notification end user 
			- have a public sub
	## Additional Compute Service
	- serverless
		- AWS lambda a service that let you code without needing to manage servers
	- Container orchestration Tools
		- Amazon Elastic Container Service (Amazon ECS) run application at scale
		- Amazon Elastic Kubernetes Service(Amazon)
		- AWS Fargate: Serverless platform that manages ECS and EKS
## - Global Infrastructure
> high availability and fault tolerance 
- regions closer to business traffic demand
- inside regions we have availability zones
- regional data privacy
- Factors to choose regions
	- compliance
	- proximity
		- latency: the time it takes for data to be sent and received
	- feature availability
		- Amazon Braket
	- Pricing