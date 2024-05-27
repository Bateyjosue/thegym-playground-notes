## Prerequisites
- You’ve finished the tutorial [Create a CAP Business Service with Node.js using Visual Studio Code](https://developers.sap.com/tutorials/cp-apm-nodejs-create-service.html).
- If you don’t have a Cloud Foundry Trial subaccount and dev space on [SAP BTP](https://cockpit.hanatrial.ondemand.com/cockpit/) yet, create your [Cloud Foundry Trial Account](https://developers.sap.com/tutorials/hcp-create-trial-account.html) with **US East (VA) as region** and, if necessary [Manage Entitlements](https://developers.sap.com/tutorials/cp-trial-entitlements.html).
- You’ve downloaded and installed the [cf command line client](https://github.com/cloudfoundry/cli#downloads) for Cloud Foundry as described in the tutorial [Install the Cloud Foundry Command Line Interface (CLI)](https://developers.sap.com/tutorials/cp-cf-download-cli.html).
- You’ve downloaded and installed the [MBT Built Tool](https://sap.github.io/cloud-mta-build-tool/download/).
- You’ve downloaded and installed the [MultiApps CF CLI plugin](https://github.com/cloudfoundry/multiapps-cli-plugin/blob/master/README.md).
- You have to [Use an existing SAP HANA Cloud service instance](https://developers.sap.com/tutorials/btp-app-hana-cloud-setup.html#42a0e8d7-8593-48f1-9a0e-67ef7ee4df18) or [set up a new SAP HANA Cloud service instance](https://developers.sap.com/tutorials/btp-app-hana-cloud-setup.html#3b20e31c-e9eb-44f7-98ed-ceabfd9e586e) to deploy your CAP application.

## Deploy with CI/CD
**Table of contents**
- [SAP CI/CD Service](https://cap.cloud.sap/docs/guides/deployment/cicd#sap-ci-cd-service)
- [CI/CD Pipelines with SAP Piper](https://cap.cloud.sap/docs/guides/deployment/cicd#ci-cd-pipelines-with-sap-piper)
- [GitHub Actions](https://cap.cloud.sap/docs/guides/deployment/cicd#github-actions)

### SAP CI/CD Service
 SAP Continuous Integration and Delivery is a service on SAP BTP that allows you to configure and run predefined continuous integration and delivery pipelines. It connects with your Git SCM repository and provides an easy-to-use user interface for monitoring the status of your builds and detecting errors. 
 The service has a ready-to-use pipeline for CAP that is applicable to Node.js, Java, and multitarget application (MTA) based projects. It does not require you to host your own Jenkins instance and provides an easy, UI-guided way to configure your pipelines. 

## Deploy the app
### Step 1: Project configuration for production
1. run the following command in your terminal to prepare for production
```bash
cds add hana, mta, xsuaa,approuter --for production
```
> This will add hana for dababase, xsuaa for authentification and authorization, approuter for ui

the following file will be add
	- in `package.json` in production section: `db.hana`, `auth.xsuaa`
	- `mta.yaml` reflecting project configuration
	- `xs-security.json` for authentication configuration
2. Update dependencies
```bash
npm update --package-lock-only
```
> this will update dependencies in`package.json` that have been updated to avoid the deployment to break missing the lastest update

### Step 2: Deploy using `cf deploy`
1. Update `xs-security.json` by adding the following code
```json
"oauth2-configuration": {
    "redirect-uris": ["https://*.us10-001.hana.ondemand.com/**"]
}

```
> this would enable the configuration to adapt to the format for redirection

2. Build the project
```bash
mbt build -t gen --mtar mta.tar
```
> The `-t` option defines the target folder of the build result as the `gen` folder of your project. As part of this build implicitly `cds build --production` is executed. This implicit build uses then all the configuration you’ve added in the step 1.2 when using `--for production`.

3. Deploy the project to cloud foundry
```bash
cf deploy gen/mta.tar
```