resource "google_cloud_run_v2_service" "tdp_boulder_competitions_frontend" {
  client         = "gcloud"
  client_version = "588.0.0"
  ingress        = "INGRESS_TRAFFIC_ALL"

  labels = {
    managed-by-cnrm = "true"
  }

  launch_stage = "GA"
  location     = "europe-west8"
  name         = "tdp-boulder-competitions-frontend"
  project      = "teste-di-pietra"

  template {
    containers {
      image = "europe-west8-docker.pkg.dev/teste-di-pietra/tdp-boulder-competitions-app/frontend:latest"

      ports {
        container_port = 8080
        name           = "http1"
      }

      resources {
        cpu_idle = true

        limits = {
          cpu    = "1000m"
          memory = "512Mi"
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
  }

  traffic {
    percent = 100
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
  }
}
# terraform import google_cloud_run_v2_service.tdp_boulder_competitions_frontend projects/teste-di-pietra/locations/europe-west8/services/tdp-boulder-competitions-frontend
