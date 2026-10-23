resource "google_project_service" "cloudtrace_googleapis_com" {
  project = "737720691967"
  service = "cloudtrace.googleapis.com"
}
# terraform import google_project_service.cloudtrace_googleapis_com 737720691967/cloudtrace.googleapis.com
