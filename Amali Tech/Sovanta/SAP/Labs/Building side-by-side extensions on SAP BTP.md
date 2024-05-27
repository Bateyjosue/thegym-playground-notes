> SAP BTP is a cloud-based development platform that focused on business-centricity. 

### Three application runtimes
1. the SAP BTP, ABAP Runtime
2. SAP BTP, Cloud Foundry Runtime
3. SAP BTP, Kyma runtime
### SAP Build
1. SAP Build Apps
2. SAP Build Process Automation
3. SAP Build Work Zone

![[Pasted image 20240521101016.png]]

## Introducing the OData protocol
### What is OData
>OData, or Open Data Protocol, is an OASIS standard for creating and using RESTful APIs efficiently, allowing developers to concentrate on business logic rather than the technical details of implementing APIs. 
> It offers guidelines on various API aspects, facilitates operations like tracking changes and batch requests, and can be extended for custom needs. OData makes APIs easy to use, with metadata that supports the development of generic client tools, enabling interaction without detailed protocol knowledge

### OData  Basics
> OData simplifies interactions with web resources by applying familiar HTTP verbs to perform database-like operations. 
> These include using GET to retrieve resources, POST to create new ones, PUT and PATCH for updates—with PUT replacing an entire resource and PATCH modifying parts of it—and DELETE to eliminate resources. 
> This approach leverages standard web protocols for managing resource operations, making it an efficient way to handle data via web APIs.

### OData Service
> OData supports two main formats for resource representation: the XML-based AtomPub and JSON, with JSON being preferred for its lower overhead and ease of use with JavaScript and SAPUI5 frameworks. 
> Each OData service is identified by a unique service root URI (Uniform Resource Identifier), enabling the access and interaction with resources over a network. 
> This approach allows for straightforward access to resources via URLs (Uniform Resource Locators), specifying how to locate and interact with these resources using protocols such as OData.

### Types of Documents associated with each OData service
Each OData service includes two crucial documents: the service document and the service metadata document.

1. **The Service Document**: This document provides a list of entity sets, functions, and singletons available in the service. It serves as a guide for clients to navigate the model in a way that's driven by hypermedia. The document is accessible through a URL in the format `http://<host>:<port>/<service>/`.

2. **The Service Metadata Document**: This document offers detailed descriptions of the types, sets, functions, and actions the OData service recognizes. It is essential for clients to understand how to query and interact with the entities within the service. The metadata is accessed via a URL formatted as `http://<host>:<port>/<service>/$metadata`, and it returns XML metadata describing the service's Entity Data Model. The response for a service metadata document is exclusively in XML.

### OData and CAP
In a CAP (Cloud Application Programming Model) based application, services are crafted using Core Data Services (CDS) models and overseen by the CAP runtime environment. The framework treats every functional component as a service, encapsulating the interactive features of a specific domain. This includes the definition of entities (data structures) that services expose, actions (operations) services enable, and events services can trigger, facilitating a comprehensive and interactable representation of the application's domain logic. This approach allows for clear modeling and management of application services and their interactions, streamlining the development process and enhancing application functionality and scalability.
![[Pasted image 20240521112819.png]]
## Explaining JSON/YAML
### JSON and YAML
#### JSON
> JSON (JavaScript Object Notation) is a widely adopted, open-standard format designed for storing and exchanging data. It utilizes straightforward, readable text to represent data objects comprising key-value pairs and arrays, making it a preferred choice for web applications to transmit data between clients and servers. Despite its roots in JavaScript's syntax, JSON functions as an independent format, compatible across many programming languages, ensuring its versatility as a data interchange medium. Files in JSON format typically bear a ".json" extension, highlighting their specific data structure.

JSON's structure revolves around two primary constructs that make it simple yet incredibly flexible for data representation:

1. **Key-Value Pairs:** This structure resembles what many programming languages refer to as an 'object'. It encapsulates data within a collection of pairs, where each pair consists of a unique key and its corresponding value. This format is particularly useful for representing complex data by associating identifiable labels (keys) with specific values, making the data easy to understand and access programmatically.

2. **Arrays:** A sequentially ordered collection of values, recognized as an 'array' in most programming languages. An array in JSON holds a list of values that can include numbers, strings, objects, or even other arrays. This structure is ideal for handling lists of elements where each item can be accessed by its position within the sequence.

> These foundational structures enable JSON to conveniently describe and structure a wide variety of data, including complex entities like a Business Partner, by combining objects and arrays. A JSON representation of a Business Partner, for example, would use key-value pairs to define properties such as name, ID, and contact details, and could use arrays to list multiple addresses or contact numbers, offering a structured and easily interpretable format for data exchange.

![[Pasted image 20240521122451.png]]

#### YAML
> YAML, which stands for YAML Ain't Markup Language, is designed to be a human-friendly and versatile data serialization language, supporting cross-language data interchange with a focus on the common data types seen in dynamic languages. It is particularly valued for its readability and is widely employed for a variety of programming needs, including configuration files, log files, internet messaging, cross-language data sharing, object persistence, and for the debugging of complex data structures. The design of YAML caters to these common use cases by making data straightforward to view and understand, thereby simplifying the programming process.

> YAML files can be identified by the `.yaml` or `.yml` file extensions. Unlike JSON, which strictly uses a compact format comprising arrays and objects, YAML offers features like commenting, support for complex data structures beyond hierarchical models, scalar data quoting in multiple forms, and data typing through tagging. This makes YAML a strict superset of JSON, meaning any valid JSON file is also a valid YAML file, but YAML supports a broader set of features for data representation. As an open format, YAML is developed to facilitate easier creation, reading, and writing of data structures, enhancing its utility in a wide range of applications.![[Pasted image 20240521122606.png]]

## # Serving User Interfaces in CAP
### Frontend Capabilities
![[Pasted image 20240521151918.png]]
CAP (Cloud Application Programming Model) indeed supports the integration of user interfaces, making it a comprehensive framework not just for backend services but also for connecting with the frontend. All services developed using CAP can be consumed by other services and user interfaces (UIs), offering a seamless bridge between the backend logic and the UI layer. This flexibility is essential for modern application development, where interaction between the server-side and client-side components is pivotal for creating responsive and interactive user experiences.

CAP is designed to be open and agnostic regarding the choice of UI frameworks. It enables UI integration through standard AJAX (Asynchronous JavaScript and XML) requests, which are widely supported across various frontend development frameworks and libraries. This means developers are free to choose their preferred frontend technology stack, whether it's React, Angular, Vue.js, or any other, to build user interfaces that interact with CAP-based services. The use of standard web technologies for service consumption ensures that applications built on CAP can be easily extended or integrated with other systems and services, further enhancing the versatility and reach of CAP as a development framework.
The Cloud Application Programming Model (CAP) offers robust support for integrating SAP Fiori elements UIs, simplifying the creation and enhancement of user interfaces in enterprise applications. CAP's compatibility with SAP Fiori extends to its annotations and features geared towards Fiori's distinct architecture, including search capabilities, value helps, and especially the Fiori Draft model. The Draft feature is particularly valuable as it safeguards against data loss during unexpected app terminations and manages edit conflicts when multiple users attempt to modify the same object concurrently.

In a CAP project, it's entirely feasible to house multiple SAP Fiori apps, with each meant to fit seamlessly within the CAP environment. While SAP UI5 development is also supported, the focus on SAP Fiori elements is due to their specialized use of UI-specific annotations in CAP services. These annotations allow for a deeper integration with Fiori elements, enabling the automatic generation of the user interface based on the metadata document and entity definitions provided by the CAP model. This seamless integration facilitates a more fluid development process, where SAP Fiori apps are typically organized into an 'app' folder within the CAP project.

To further enhance UI development for SAP Fiori Elements, SAP provides Fiori tools, a suite designed to accelerate the development workflow. These tools offer advanced features for incorporating and customizing Fiori apps within CAP projects, including comprehensive visual tools aimed at simplifying the design process of Fiori pages. This suite of productivity tools represents a substantial asset for developers, streamlining the creation of intuitive and feature-rich SAP Fiori applications within the flexible and powerful CAP framework.

### SAP Fiori Tools
**SAP Fiori Tools** are pre-installed in the SAP Business Application Studio and can be used out-of-the-box. You can also install the extension in Visual Studio Code (VS Code), by installing the [SAP Fiori Tools - Extension Pack](https://marketplace.visualstudio.com/items?itemName=SAPSE.sap-ux-fiori-tools-extension-pack).

### Page Map Editor

The Page Map is a feature that comes with the SAP Fiori Tools and can be used as visual productivity tool to change and design the SAP Fiori User Interfaces.
![[Pasted image 20240521165052.png]]

# Serving User Interfaces in CAP
[UI in SAP CAP](https://learning.sap.com/learning-journeys/build-side-by-side-extensions-on-sap-btp/serving-user-interfaces-in-cap_e495a107-badf-4767-9d3d-4178d934437e)
# Explaining Event Handling in CAP
[Event Handling](https://learning.sap.com/learning-journeys/build-side-by-side-extensions-on-sap-btp/exercise-generating-a-user-interface_e71dc8e0-b730-45c5-9ace-4ea4902689fb?userlogin=true)
## Usage Scenario
To implement custom business logic on top of the standard CRUD operations provided by the SAP Cloud Application Programming Model (CAP), you can utilize event handlers. 
Event handlers allow you to extend or override the default behavior of CRUD operations (CREATE, READ, UPDATE, DELETE) and other events within your CAP application. Here's a simplified explanation of how to use event handlers in CAP, particularly focusing on extending the READ operation to include custom logic:

### Understanding Event Handlers in CAP

- **What Are Event Handlers?**
  - Event handlers are methods that you define to respond to specific events occurring within your CAP application. These events can be CRUD operations or other actions triggered by your application.
  - Event handlers enable you to add custom logic to your application, either by extending the processing of an event or by completely overriding its default behavior.

- **How to Use Them?**
  - To use event handlers, you need to register them with the CAP Service SDK for Node.js. This involves defining a method that will be executed when the specified event occurs.
  - For example, to extend the READ operation, you would define a method that gets triggered after a READ operation is performed. Within this method, you can manipulate the data returned by the operation before it is sent back to the client.

### Example: Extending the READ Operation

Let's say you want to add custom logic to the READ operation for a `Risks` entity. You want to change the `criticality` property of each risk based on its `impact` value. Here's how you could implement this using an event handler:

```javascript
// Import the CAP service library
const cds = require('@sap/cds');

// Define the service implementation
module.exports = cds.service.impl(async function() {
    // Extend the READ operation for the Risks entity
    this.after('READ', 'Risks', risksData => {
        // Convert the data to an array if it's not already
        const risks = Array.isArray(risksData)? risksData : [risksData];

        // Loop through each risk and adjust the criticality based on impact
        risks.forEach(risk => {
            if (risk.impact >= 100000) {
                risk.criticality = 1; // High priority
            } else {
                risk.criticality = 2; // Low priority
            }
        });

        // Return the modified data
        return risks;
    });
});
```

In this example, the `this.after('READ', 'Risks',...)` line registers an event handler that gets triggered after a READ operation on the `Risks` entity. The handler loops through each risk, adjusts the `criticality` based on the `impact`, and returns the modified data.

### Impact on the UI

The changes made in the event handler (like adjusting the `criticality`) can be reflected in the UI by using OData annotations. For instance, if you annotate a column in your UI with the `Criticality` annotation, pointing to the `criticality` property, the UI can display different icons or colors based on the `criticality` value.

This approach demonstrates how event handlers in CAP allow for the seamless integration of custom business logic into your application, enhancing both the backend functionality and the frontend presentation.

### Registering Event Handlers

![[Pasted image 20240523120537.png]]
### Request Objects
![[Pasted image 20240522180343.png]]


# The Need for Custom Business Logic
## Usage Scenario
The SAP Cloud Application Programming Model (CAP) offers a high-level abstraction for developing cloud-native or side-by-side applications. However, there are instances where businesses require custom logic to cater to their unique needs or to facilitate integration with external systems. CAP enables developers to extend and modify the default behaviors of the framework, thereby tailoring the application to fit specific requirements and enhancing its functionality.

### Key Points from the Sources:

- **High-Level Abstraction**: CAP simplifies the development process by abstracting away many complexities associated with building cloud applications. This abstraction allows developers to focus on adding value through custom business logic rather than spending time on infrastructure concerns [1].

- **Custom Business Logic**: The ability to introduce custom business logic is crucial for adapting the application to meet specific business needs or integrating with external systems. This capability extends the default functionalities provided by CAP, enabling the creation of highly customized and functional applications [1].

- **Service API for Custom Logic**: CAP introduces a Service API designed specifically for incorporating custom logic. This API facilitates the addition of custom business logic to the application, allowing for greater flexibility and adaptability to unique business requirements [1].

- **Integration and Extension**: CAP supports the integration of existing data models from SAP S/4HANA and the addition of new fields or processes, such as a "propose/approve" workflow for creating new entries. This capability significantly reduces the time required to develop and deploy cloud-based applications, as much of the underlying infrastructure and common functionalities are handled automatically by CAP [2].

- **Focus on Development Tasks**: By leveraging CAP, developers can concentrate on implementing the actual business logic and features of the application, rather than dealing with the intricacies of metadata provisioning, internationalization, localization, auditing, and other administrative tasks. This shift in focus accelerates the development cycle and improves the overall quality of the application [2].

In summary, CAP's support for custom business logic, combined with its high-level abstractions and streamlined development process, empowers developers to rapidly build tailored cloud applications that meet the unique needs of their businesses and seamlessly integrate with external systems.

## Error Handling - CAP Service SDK for Node.js
Good error handling is fundamental to the development of robust, correct, and high-performing applications. It plays a crucial role in managing unexpected situations that arise during the execution of an application, ensuring that the application behaves predictably and gracefully under adverse conditions. Here's why having effective error handling mechanisms is essential, especially in the context of Node.js and the SAP Cloud Application Programming Model (CAP) Service SDK for Node.js:

### Ensuring Robustness

- **Prevents Unhandled Errors**: Without proper error handling, unhandled errors can crash your application or lead to unpredictable behavior. By catching and handling exceptions, you ensure that your application can recover from errors or fail gracefully, preventing crashes and maintaining stability.

### Enhancing Correctness

- **Validating Data**: Error handling mechanisms can validate input data and catch invalid states early, ensuring that your application operates correctly and consistently. This is particularly important in web applications where incorrect data can lead to security vulnerabilities or incorrect business logic execution.

### Improving Performance

- **Optimizing Resource Usage**: Properly handling errors can prevent unnecessary resource consumption. For example, avoiding infinite loops caused by uncaught exceptions can free up resources for other parts of your application to operate efficiently.

### Specific Techniques for CAP Service SDK for Node.js

When working with the CAP Service SDK for Node.js, understanding and implementing error handling becomes even more critical due to the nature of cloud applications and their interactions with databases and external services. Here are some specific techniques:

- **Using Promises and Async/Await**: CAP leverages modern JavaScript features like promises and async/await for asynchronous operations. Properly handling promise rejections and awaiting asynchronous operations can prevent unhandled promise rejection warnings and ensure that your application waits for all asynchronous operations to complete before proceeding.

- **Error Boundaries**: In React applications built with CAP, error boundaries can be used to catch errors in child components and render fallback content instead of crashing the entire application. This technique is particularly useful for handling errors in the UI layer.

- **Logging and Monitoring**: Effective error handling includes logging errors for debugging purposes and monitoring application health. CAP integrates with SAP's monitoring tools, allowing you to track errors and performance metrics in real-time.

- **Custom Middleware**: For custom business logic, you can write middleware functions that catch and handle errors globally across your application. This is useful for logging, transforming errors, or redirecting users to error pages.

Implementing good error handling practices in your Node.js applications, especially those developed with the CAP Service SDK, is essential for building resilient, efficient, and user-friendly applications. It ensures that your application can handle unexpected situations gracefully, improving the overall reliability and user experience.

# Describing Authorization and Trust Management (XSUAA)
## SAP Authorization and Trust Management Service (XSUAA)
The SAP Authorization and Trust Management service, in conjunction with the Extended Services - User Account and Authentication (XSUAA) service, provides a comprehensive solution for securing applications on the SAP Business Technology Platform (BTP) within the Cloud Foundry environment. This combination ensures that applications are protected against unauthorized access, thereby safeguarding both the integrity of the applications and the confidentiality of the data they handle.

### Managing User Authorizations

The SAP Authorization and Trust Management service allows for the management of user authorizations and trust relationships with identity providers. Identity providers serve as the user base for applications, which can range from an identity authentication tenant, an SAP on-premise system, or a custom corporate identity provider. User authorizations are managed through technical roles at the application level, which can then be aggregated into business-level groups and role collections for larger scale cloud scenarios. This modular approach to authorization management facilitates the secure and efficient administration of access rights across complex application landscapes.

### Platform Users vs. Business Users

- **Platform Users**: Typically consist of developers, administrators, or operators who are responsible for deploying, administering, and troubleshooting applications and services on SAP BTP. For platform users, the default identity provider is the SAP ID service.

- **Business Users**: Represent the end-users of the deployed applications or users of subscribed apps or services, such as SAP Business Application Studio or SAP Web IDE. Business users can also be authenticated via a corporate identity provider, offering a seamless integration with existing enterprise identity management systems.

### Extended Services - User Account and Authentication (XSUAA) Service

The XSUAA service plays a pivotal role in authenticating and authorizing users, assigning the appropriate privileges to user sessions. It identifies users by attributes such as email, userId, firstName, and lastName, and checks their roles (scopes) to determine whether a user is authorized to perform specific actions. The XSUAA service is an extension of the open-source UAA OAuth2 Provider of Cloud Foundry, adapted with SAP-specific features to cater to the needs of SAP applications. Notably, the XSUAA service does not store "real" users but relies on external Identity Providers (IdPs) for authentication.

### Summary

By leveraging the SAP Authorization and Trust Management service along with the XSUAA service, organizations can effectively manage user authorizations and trust relationships, ensuring that applications on the SAP BTP are securely accessed and operated. This integrated approach to security and authorization management not only protects applications from unauthorized access but also streamlines the administration of access controls, making it easier to manage permissions across a wide range of applications and services.
![[Pasted image 20240523205741.png]]

The Extended Services - User Account and Authentication (XSUAA) service is a cornerstone for securing applications on the SAP Business Technology Platform (BTP) within the Cloud Foundry environment. It serves as a bridge between your application and the external Identity Providers (IdPs), ensuring that user authentication and authorization are handled securely and efficiently. Here's a breakdown of its significance and how it fits into the broader context of application development on SAP BTP:

### Core Functions of XSUAA

- **User Identification**: XSUAA identifies users by attributes such as Email, UserId, FirstName, and LastName. This identification process is crucial for personalizing the user experience and enforcing access controls.

- **Role-Based Access Control (RBAC)**: It checks the roles (scopes) assigned to a user to determine if they are permitted to perform specific actions. This mechanism ensures that users can only access the parts of the application that are relevant to their roles, enhancing security and privacy.

- **External Identity Providers Integration**: Unlike traditional authentication systems that store user credentials internally, XSUAA trusts external IdPs for user authentication. This approach leverages existing corporate identity management systems, reducing the overhead of managing user identities within the application.

### Development and Configuration

- **xs-security.json Configuration**: Developers configure XSUAA by providing the content of an `xs-security.json` file, which specifies the scopes (roles) and claims (attributes) used by the application. This configuration is crucial for defining the security policies of the application.

- **Creating an XSUAA Instance**: Through the SAP Cloud Platform Cockpit, developers can create an XSUAA instance by navigating to Services > Service Marketplace, selecting the Authorization & Trust Management service, and creating a new instance with the appropriate plan and `xs-security.json` content.

### Challenges and Workarounds

- **Public Clients and Service-to-Service Communication**: For scenarios involving public clients or service-to-service communication, traditional grant flows like the client credentials grant may not be suitable due to security concerns. An alternative approach involves implementing an endpoint in AppRouter that accepts user credentials and communicates with the Authorization endpoint of BTP to obtain tokens. However, this method is limited to SAP Id Service or an Identity Authentication Service (IAS) instance as IdPs, as noted in SAP Note #2766354.

### Conclusion

XSUAA is a vital component for securing applications on SAP BTP, providing a robust framework for user authentication and authorization. Its reliance on external IdPs for user management simplifies security administration and enhances the scalability of applications. Despite challenges in certain scenarios, such as public client authentication and service-to-service communication, XSUAA offers a flexible and secure way to manage access controls in cloud-native applications.
![[Pasted image 20240523210005.png]]

### What is xs-security.json?
The `xs-security.json` file is essentially the declaration of your application's security model within the context of the SAP Business Technology Platform (BTP) and the Extended Services - User Account and Authentication (XSUAA) service. It defines the scopes (roles), attributes, role templates, and role collections that your application will use for authorization and attribute management. This configuration is crucial for determining how users are identified, what actions they are authorized to perform, and how attributes (such as user location) influence access control decisions.

Here's a breakdown of the key components defined in `xs-security.json`:

### Scopes

Scopes represent the permissions or roles that users can have within your application. They are defined as named entities within the `xs-security.json` file. For example:

```json
"scopes": [
    {
        "name": "$XSAPPNAME.scopeforview"
    },
    {
        "name": "$XSAPPNAME.scopeforcreate"
    },
    {
        "name": "$XSAPPNAME.scopeformanage"
    }
]
```

Each scope corresponds to a permission level, such as viewing, creating, or managing resources.

### Attributes

Attributes are additional pieces of information about a user, such as their country of residence. They can be used to make fine-grained access control decisions. For example:

```json
"attributes" : [
    {
        "name" : "Country",
        "valueType" : "string",
        "valueRequired" : "false"
    }
]
```

### Role Templates

Role templates define combinations of scopes and attributes that form a role. They act as blueprints for creating roles that can be assigned to users. For example:

```json
"role-templates": [
    {
        "name": "UserRole",
        "scope-references": ["$XSAPPNAME.scopeforview"]
    },
    {
        "name": "AssistantRole",
        "scope-references": ["$XSAPPNAME.scopeforview", "$XSAPPNAME.scopeforcreate"],
        "attribute-references": [ { "name" : "Country" } ]
    },
    {
        "name": "ManagerRole",
        "scope-references": ["$XSAPPNAME.scopeforview", "$XSAPPNAME.scopeforcreate", "$XSAPPNAME.scopeformanage"]
    }
]
```

### Role Collections

Role collections group together role templates to form predefined sets of roles. This allows for easy assignment of roles to users based on their job function or other criteria. For example:

```json
"role-collections": [
    {
        "name": "UserRoles",
        "role-template-references": [ "$XSAPPNAME.UserRole" ]
    },
    {
        "name": "ManagerRoles",
        "role-template-references": [ "$XSAPPNAME.ManagerRole" ]
    },
    {
        "name": "AssistantRoles",
        "role-template-references": [ "$XSAPPNAME.AssistantRole" ]
    }
]
```

In summary, the `xs-security.json` file is a foundational element in securing your SAP BTP applications, defining the security model that governs user access and attribute management. It allows for flexible and granular control over who can access what within your application, based on their roles and attributes.

# Identifying Deployment Options in CAP

# Describing Continuous Integration and Delivery
## Continuous Integration and Continuous Delivery (CI/CD)
![[Pasted image 20240524112336.png]]![[Pasted image 20240524112338.png]]

### The pipeline
![[Pasted image 20240524112401.png]]
> Putting all these pieces together, you can create a fully automated pipeline to build, test, and deploy your application.

Implementing continuous integration and continuous deployment (CI/CD) for CAP projects offers several pathways, each with its unique advantages. Here's a deep dive into three possibilities: SAP CI/CD Service, Project "Piper", and GitHub Actions.

### SAP CI/CD Service

- **Overview**: SAP Continuous Integration and Delivery (CI/CD) is a service available on SAP BTP (Business Technology Platform) designed to streamline the CI/CD process for CAP projects. It integrates seamlessly with your Git SCM repository, automating the build, test, and deployment phases of your development lifecycle.
- **Key Features**:
  - Ready-to-use pipelines for CAP, suitable for multi-target application (MTA) and Node.js projects.
  - Eliminates the need for hosting your own Jenkins instance.
  - Provides a user-friendly UI for monitoring build statuses and detecting errors early.
- **Benefits**: Simplifies the CI/CD setup, reduces manual intervention, and enhances error detection capabilities.

### Project "Piper"

- **Overview**: Project "Piper" is an open-source initiative offering preconfigured Jenkins pipelines for SAP projects. It includes a shared library (`jenkins-library`) detailing the steps, scenarios, and utilities for Jenkins pipelines, along with a set of Docker images (`devops-docker-images`) promoting best practices.
- **Key Features**:
  - Customizable Jenkins pipelines adapted to your project's needs.
  - Utilizes Docker images for consistency and ease of deployment.
- **Benefits**: Offers flexibility and control over the CI/CD process, aligning closely with SAP's ecosystem.

### GitHub Actions

- **Overview**: GitHub Actions enables automation of software workflows directly in your GitHub repository. It supports building, testing, and deploying CAP applications, integrating seamlessly with the broader GitHub ecosystem.
- **Key Features**:
  - Automates workflows upon push or pull requests to the master branch.
  - Supports building multitarget applications and deploying them to Cloud Foundry.
  - Uses artifacts for efficient transfer of build outputs.
- **Benefits**: Enhances collaboration and streamlines the development process by leveraging GitHub's ecosystem.

### Choosing the Right Approach

- **SAP CI/CD Service** is ideal for those looking for a straightforward, managed solution with minimal setup required.
- **Project "Piper"** is suitable for teams preferring open-source solutions with customizable pipelines and a focus on best practices.
- **GitHub Actions** is beneficial for projects heavily integrated with GitHub, offering tight integration and automation capabilities within the GitHub environment.

Each option caters to different preferences and project requirements, enabling developers to choose the CI/CD pathway that best fits their needs and workflow.