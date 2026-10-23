resource "google_project_service" "bigquery_googleapis_com" {
  project = "737720691967"
  service = "bigquery.googleapis.com"
}
# terraform import google_project_service.bigquery_googleapis_com 737720691967/bigquery.googleapis.com
