resource "google_project_service" "monitoring_googleapis_com" {
  project = "737720691967"
  service = "monitoring.googleapis.com"
}
# terraform import google_project_service.monitoring_googleapis_com 737720691967/monitoring.googleapis.com
