resource "google_project_service" "telemetry_googleapis_com" {
  project = "737720691967"
  service = "telemetry.googleapis.com"
}
# terraform import google_project_service.telemetry_googleapis_com 737720691967/telemetry.googleapis.com
