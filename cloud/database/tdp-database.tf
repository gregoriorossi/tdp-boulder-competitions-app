resource "google_sql_database_instance" "tdp_database" {
  name             = "tdp-database"
  database_version = "POSTGRES_18"
  region           = "europe-west8"

  deletion_protection = false

  settings {
    tier              = "db-custom-1-3840"
    edition           = "ENTERPRISE"
    availability_type = "ZONAL"

    disk_type           = "PD_SSD"
    disk_size           = 20
    disk_autoresize     = false
    disk_autoresize_limit = 0

    activation_policy = "ALWAYS"

    backup_configuration {
      enabled                        = false
      point_in_time_recovery_enabled = false
      backup_retention_settings {
        retained_backups = 1
        retention_unit   = "COUNT"
      }
    }

    database_flags {
      name  = "cloudsql.iam_authentication"
      value = "on"
    }

    ip_configuration {
      ipv4_enabled    = true
      private_network = "projects/teste-di-pietra/global/networks/default"

      enable_private_path_for_google_cloud_services = true

      ssl_mode = "ALLOW_UNENCRYPTED_AND_ENCRYPTED"

      authorized_networks {
        name  = "mio"
        value = "87.10.75.45"
      }

      authorized_networks {
        name  = "client"
        value = "95.248.233.146"
      }
    }

    location_preference {
      zone = "europe-west8-b"
    }
  }
}