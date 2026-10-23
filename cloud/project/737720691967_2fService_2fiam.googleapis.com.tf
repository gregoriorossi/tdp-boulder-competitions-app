resource "google_project_service" "iam_googleapis_com" {
  project = "737720691967"
  service = "iam.googleapis.com"
}
# terraform import google_project_service.iam_googleapis_com 737720691967/iam.googleapis.com
