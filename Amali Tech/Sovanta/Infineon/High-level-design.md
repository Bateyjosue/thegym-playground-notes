
6. Deployment Architecture
6.1 Deployment Diagram The system will be deployed in a cloud environment with separate instances for development, testing, and production environments. 
6.2 Environment Setup Development: Used for building and testing new features. Testing: Used for integration and performance testing. Production: Live environment for HR administrators.


1. What is tranche weight and how is it different from target weight?
==> trancheWeight = the sum of the target weight 
2, what are possible value for the status
the bonus tranche is complete when the admin

What is **globalId** for, where is coming from, is an association??
==> the id of the participant

0 ==> 60
1 ==> 60 -30 = 30
2 ==>0 + 30 = 30
3 ==> 30 -- 45 = 75
4 ==> 75 + 0
5 ==> 75

----

- add another field to tranche to notify the insertion is not done yet;
- consider scenario where the server goes down, to no loose the data