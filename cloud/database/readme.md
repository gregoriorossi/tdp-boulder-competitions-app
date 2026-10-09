# PostgreSQL Database Deployment on Google Cloud

The database instance configuration is managed through Terraform and enables the automated provisioning of a new Cloud SQL PostgreSQL instance. This guide describes the steps required to deploy the infrastructure and, if available, restore the database content from a backup.

## Prerequisites

- Terraform installed on the local workstation.
- Google Cloud SDK (`gcloud`) installed and configured.
- Appropriate permissions on the target Google Cloud project.
- Access to the target Google Cloud environment.

## Authentication

Authenticate with Google Cloud:

```bash
gcloud auth application-default login
```

Set the target project:

```bash
gcloud config set project <project-name>
```

## Terraform Initialization

Navigate to the folder containing the Terraform files and run:

```bash
terraform init
```

This command downloads the required providers and initializes the working directory.

## Configuration Validation

Validate the Terraform configuration:

```bash
terraform validate
```

Generate an execution plan:

```bash
terraform plan
```

This command displays the changes Terraform will apply without modifying any resources.

## Database Instance Deployment

To create the Cloud SQL instance, execute:

```bash
terraform apply
```

Confirm the operation by typing:

```text
yes
```

Alternatively, to deploy without manual confirmation:

```bash
terraform apply -auto-approve
```

Once the execution is complete, a new PostgreSQL instance will be created according to the configuration defined in the Terraform files.

## Database Restore

If a backup was previously created using `pg_dump`, the database content can be restored with:

```bash
pg_restore \
  -h <HOSTNAME_OR_IP> \
  -U <USERNAME> \
  -d <DATABASE_NAME> \
  backup.dump
```

If only a SQL schema file is available:

```bash
psql \
  -h <HOSTNAME_OR_IP> \
  -U <USERNAME> \
  -d <DATABASE_NAME> \
  -f schema.sql
```

## Infrastructure Updates

Any modifications made to the Terraform files can be applied by running:

```bash
terraform plan
terraform apply
```

Terraform will compare the deployed infrastructure with the desired state defined in the configuration and apply only the necessary changes.

## Instance Removal

To remove all resources managed by Terraform:

```bash
terraform destroy
```

Before destroying the instance, ensure that a complete database backup has been performed to prevent permanent data loss.

## Project Structure

```text
.
├── provider.tf
├── tdp-database.tf
├── terraform.tfvars
└── README.md
```

## Troubleshooting

### Provider Not Initialized

If Terraform reports missing or uninitialized providers, run:

```bash
terraform init
```

### Invalid Google Cloud Credentials

Reauthenticate using:

```bash
gcloud auth application-default login
```

### Verify Managed Resources

To list all resources managed by Terraform:

```bash
terraform state list
```

To inspect a specific resource:

```bash
terraform state show google_sql_database_instance.tdp_database
```