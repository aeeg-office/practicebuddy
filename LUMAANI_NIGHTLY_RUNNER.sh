#!/bin/bash
# Lumaani Nightly Assurance — Runner Script
# Called by Hermes cron job. Sets up environment, synchronizes repo, 
# creates directories, and reports status.
#
# Schedule: Daily at 03:30 Cairo time
# Cron expression in Hermes: 0 1 * * * (1:30 UTC = 3:30 Cairo EEST)

set -e

DATE=$(date +%Y-%m-%d)
RUN_ID="LUMAANI-NA-${DATE}-$(date +%s | tail -c 7)"
REPO_DIR="/home/qadir/projects/practicebuddy"
REPORT_DIR="${REPO_DIR}"
ARCHIVE_DIR="/home/qadir/.hermes/profiles/practice-buddy/nightly-assurance"
LOGS_DIR="${ARCHIVE_DIR}/logs"

# Create directories
mkdir -p "${ARCHIVE_DIR}" "${LOGS_DIR}" "${ARCHIVE_DIR}/baselines" "${ARCHIVE_DIR}/reports"

echo "🌙 Lumaani Nightly Assurance — ${DATE} — ${RUN_ID}"
echo "================================================================"

# Verify repo exists
if [ ! -d "${REPO_DIR}/.git" ]; then
    echo "🔴 ERROR: Repository not found at ${REPO_DIR}"
    exit 1
fi

# Record start timestamp
echo "{\"run_id\": \"${RUN_ID}\", \"date\": \"${DATE}\", \"started_at\": \"$(date -Iseconds)\", \"status\": \"running\"}" \
    > "${LOGS_DIR}/${RUN_ID}.json"

echo "✅ Directories ready"
echo "✅ Run ID: ${RUN_ID}"
echo "================================================================"

# The actual orchestration is done by the Hermes cron job prompt
# This script ensures the environment is ready for it
# Exit cleanly — the cron job agent does the real work
exit 0