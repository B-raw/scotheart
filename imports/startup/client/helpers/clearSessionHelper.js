export const clearAllSessions = function() {
  Session.set({
    'baselineTroponin': null,
    'threeHourTroponin': null,
    'sixHourTroponin': null,
    'painDurationBoolean': null,
    'patientAge': null,
    'patientGender': null,
    'painDuration': null,
    'historyIschaemia': null,
    'ecgIschaemia': null,
    'showBaselineTropQuestion': null,
    'showThreeHourTropQuestion': null,
    'showSixHourTropQuestion': null
  });
}
