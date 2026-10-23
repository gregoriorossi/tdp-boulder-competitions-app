resource "google_cloud_run_v2_service" "api" {
  client  = "cloud-console"
  ingress = "INGRESS_TRAFFIC_ALL"

  labels = {
    managed-by-cnrm = "true"
  }

  launch_stage = "GA"
  location     = "europe-west1"
  name         = "api"
  project      = "teste-di-pietra"

  template {
    containers {
      env {
        name  = "Logging__LogLevel__Default"
        value = "Information"
      }

      env {
        name  = "Logging__LogLevel__Microsoft.AspNetCore"
        value = "Warning"
      }

      env {
        name  = "ConnectionStrings__DefaultConnection"
        value = ""
      }

      env {
        name  = "AllowedHosts"
        value = "*"
      }

      env {
        name  = "UseMockDatabase"
        value = "false"
      }

      env {
        name  = "Jwt__Key"
        value = ""
      }

      env {
        name  = "Jwt__Issuer"
        value = "MyApi"
      }

      env {
        name  = "EmailServiceSettings__ApiToken"
        value = ""
      }

      env {
        name  = "EmailServiceSettings__SenderEmail"
        value = "no-reply@info.testedipietra.it"
      }

      image = "europe-west8-docker.pkg.dev/teste-di-pietra/tdp-boulder-competitions-app/api@sha256:50929b2a7a8f6f44b5380da66fd42875f872a11bab39b534c729326ec4aaee48"
      name  = "api-1"

      ports {
        container_port = 8080
        name           = "http1"
      }

      resources {
        cpu_idle = true

        limits = {
          cpu    = "2"
          memory = "2Gi"
        }

        startup_cpu_boost = true
      }

      startup_probe {
        failure_threshold     = 1
        initial_delay_seconds = 0
        period_seconds        = 240

        tcp_socket {
          port = 8080
        }

        timeout_seconds = 240
      }
    }

    max_instance_request_concurrency = 80

    scaling {
      max_instance_count = 20
    }

    service_account = "737720691967-compute@developer.gserviceaccount.com"
    timeout         = "300s"

    vpc_access {
      egress = "PRIVATE_RANGES_ONLY"

      network_interfaces {
        network    = "default"
        subnetwork = "default"
      }
    }
  }

  traffic {
    percent = 100
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
  }
}
# terraform import google_cloud_run_v2_service.api projects/teste-di-pietra/locations/europe-west1/services/api
