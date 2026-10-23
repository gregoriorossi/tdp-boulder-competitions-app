resource "google_pubsub_topic" "container_analysis_occurrences_v1" {
  labels = {
    goog-managed-by = "artifact-analysis"
    managed-by-cnrm = "true"
  }

  name    = "container-analysis-occurrences-v1"
  project = "teste-di-pietra"
}
# terraform import google_pubsub_topic.container_analysis_occurrences_v1 projects/teste-di-pietra/topics/container-analysis-occurrences-v1
