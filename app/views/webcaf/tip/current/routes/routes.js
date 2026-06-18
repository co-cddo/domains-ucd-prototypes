//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// --------------------------------------------------
// Existing routes
// --------------------------------------------------

// Dynamically render report version history
router.get('/webcaf/review/current/report-history', function (req, res) {
  const reportVersions = [
    {
      version: '2 (current)',
      ref: 'IARR-2024-0002',
      date: '29 November 2024',
      author: 'Alex Smith',
      status: 'Current'
    },
    {
      version: '1',
      ref: 'IARR-2024-0001',
      date: '15 November 2024',
      author: 'Alex Smith',
      status: 'Superseded'
    }
  ]

  const rows = reportVersions.map(v => {
    return [
      { text: v.version },
      { text: v.ref },
      { text: v.date },
      { text: v.author },
      {
        html: v.status === 'Current'
          ? "<strong class='govuk-tag govuk-tag--green'>Current</strong>"
          : "<strong class='govuk-tag govuk-tag--grey'>Superseded</strong>"
      },
      {
        html:
          `<a class='govuk-link' href='/webcaf/review/current/report/${v.ref}'>View</a><br>
           <a class='govuk-link' href='/webcaf/review/current/report/${v.ref}/download-pdf'>Download PDF</a>`
      }
    ]
  })

  res.render('report-history2', { rows })
})

// Show reopening logic
router.get('/webcaf/review/current/draft-review', function (req, res) {
  const reopened = req.query.reopened === 'true'
  const latestVersion = 3

  res.render('webcaf/review/current/draft-review', {
    reopened,
    latestVersion
  })
})

// --------------------------------------------------
// TIP helpers
// --------------------------------------------------

function riskText(index, outcome) {
  const riskIds = ['RP13', 'RP14', 'RP15', 'RP16', 'RP17']
  const riskVariants = [
    `Evidence supporting ${outcome} is incomplete, which may reduce confidence that controls are consistently operating across the system.`,
    `Control coverage for ${outcome} appears uneven across components, creating gaps that could weaken resilience under stress or attack.`,
    `Ownership and assurance for ${outcome} are not sufficiently traceable, increasing the risk that weaknesses remain unidentified for longer than expected.`,
    `The current evidence set for ${outcome} does not clearly demonstrate repeatable practice, which may limit assurance and slow remediation decisions.`,
    `Weaknesses linked to ${outcome} could make it harder to evidence that the system is meeting the expected Government CAF profile in a sustained way.`
  ]

  return {
    riskId: riskIds[(index - 1) % riskIds.length],
    riskText: riskVariants[(index - 1) % riskVariants.length]
  }
}

function getTipPrimaryAction(tipStatus) {
  if (tipStatus === 'To do') {
    return {
      text: 'Start TIP',
      href: '/webcaf/tip/current/draft-tip'
    }
  }

  if (tipStatus === 'In progress') {
    return {
      text: 'Continue TIP',
      href: '/webcaf/tip/current/draft-tip'
    }
  }

  if (tipStatus === 'Pending approval') {
    return {
      text: 'View TIP',
      href: '/webcaf/tip/current/tip-output'
    }
  }

  if (tipStatus === 'Completed') {
    return {
      text: 'View TIP',
      href: '/webcaf/tip/current/tip-output'
    }
  }

  return {
    text: 'Start TIP',
    href: '/webcaf/tip/current/draft-tip'
  }
}

function recommendationText(index, outcome) {
  const shortVariants = [
    `Strengthen control implementation and evidence traceability for ${outcome}, and document the actions needed to improve assurance.`,
    `Improve ownership, operating evidence and review discipline for ${outcome} so that the control position can be demonstrated more clearly.`,
    `Define and implement a clearer remediation approach for ${outcome}, supported by named owners and stronger evidence capture.`
  ]

  const longVariantA =
    `Establish a structured improvement plan for ${outcome} that closes the most material assurance gaps and makes the control position easier to evidence over time.<br>` +
    `Define the target operating approach and the minimum control expectations.<br>` +
    `Identify the services, components or teams that are currently out of line.<br>` +
    `Assign a named owner for remediation activity.<br>` +
    `Set a review cadence for tracking progress.<br>` +
    `Capture evidence in a more consistent and reusable format.<br>` +
    `Use the outputs to support future review and governance decisions.`

  const longVariantB =
    `Improve how ${outcome} is governed, evidenced and reviewed so that control effectiveness can be demonstrated in a more complete and repeatable way.<br>` +
    `Clarify which parts of the system are in scope for this control area.<br>` +
    `Document the expected control standard and any exceptions.<br>` +
    `Introduce a more reliable evidence index or audit trail.<br>` +
    `Confirm who is accountable for maintaining the position.<br>` +
    `Review the control regularly and record decisions made.<br>` +
    `Use those records to support subsequent assurance activity.`

  if (index % 5 === 0) return longVariantA
  if (index % 7 === 0) return longVariantB
  return shortVariants[(index - 1) % shortVariants.length]
}

function getOutcomeForObjective(objective, index) {
  const outcomeMap = {
    A: ['A1.a', 'A1.a', 'A1.c', 'A2.b', 'A3.a', 'A4.a'],
    B: ['B1.a', 'B2.d', 'B3.b', 'B4.b', 'B5.c', 'B6.a'],
    C: ['C1.a', 'C1.a', 'C1.b', 'C1.c', 'C1.d', 'C1.e', 'C2.a'],
    D: ['D1.b', 'D2.a']
  }

  const outcomes = outcomeMap[objective] || outcomeMap.C
  return outcomes[(index - 1) % outcomes.length]
}

function getOutcomeTitle(outcome) {
  const map = {
    'A1.a': 'Board Direction',
    'A1.c': 'Governance review',
    'A2.b': 'Risk management',
    'A3.a': 'Asset management',
    'A4.a': 'Supply chain',
    'B1.a': 'Service protection',
    'B2.d': 'Identity and access control',
    'B3.b': 'Data security',
    'B4.b': 'System security',
    'B5.c': 'Resilient networks and systems',
    'B6.a': 'Staff awareness and training',
    'C1.a': 'Security monitoring',
    'C1.b': 'Security monitoring',
    'C1.c': 'Security monitoring',
    'C1.d': 'Security monitoring',
    'C1.e': 'Security monitoring',
    'C2.a': 'Proactive security event discovery',
    'D1.b': 'Response and recovery planning',
    'D2.a': 'Lessons learned'
  }

  return map[outcome] || 'Board Direction'
}

function buildTipState(sessionData) {
  const needsReset =
    !sessionData.tipJourney ||
    !sessionData.tipJourney.priorityCount ||
    sessionData.tipJourney.priorityCount !== 125 ||
    !sessionData.tipJourney.otherRecommendations

  if (needsReset) {
    const tipJourney = {
      system: {
        id: 'SYS-0001',
        name: 'Microsoft CS version 3',
        organisation: 'Cabinet Office',
        finalReportReference: 'CAF24092025FDMH',
        finalReportDate: '17 December 2025'
      },
      priorityCount: 125,
      otherCount: 16,
      recommendations: {
        'REC-21': {
          recId: 'REC-21',
          riskId: 'RP13',
          outcome: 'A1.a',
          outcomeTitle: 'Board Direction',
          objective: 'A',
          type: 'priority',
          reviewed: false,
          addAction: null,
          noActionReason: '',
          actionDetails: null,
          locked: false
        },
        'REC-22': {
          recId: 'REC-22',
          riskId: 'RP14',
          outcome: 'A1.a',
          outcomeTitle: 'Board Direction',
          objective: 'A',
          type: 'priority',
          reviewed: true,
          addAction: false,
          noActionReason: 'The recommendation has been considered and no separate TIP action will be added because existing delivery activity already covers it.',
          actionDetails: null,
          locked: false
        },
        'REC-23': {
          recId: 'REC-23',
          riskId: 'RP15',
          outcome: 'A1.c',
          outcomeTitle: 'Governance review',
          objective: 'A',
          type: 'priority',
          reviewed: true,
          addAction: true,
          noActionReason: '',
          actionDetails: {
            actionText: 'Introduce a quarterly governance evidence review and assign named owners for maintaining the evidence set.',
            owner: 'Morgan Ellis',
            resourceAvailable: 'yes',
            budgetAvailable: 'yes',
            canProvideTargetDate: 'yes',
            targetDate: {
              day: '30',
              month: '6',
              year: '2026'
            },
            noTimingReason: ''
          },
          locked: false
        },
        'REC-24': {
          recId: 'REC-24',
          riskId: 'RP16',
          outcome: 'A2.b',
          outcomeTitle: 'Risk management',
          objective: 'A',
          type: 'priority',
          reviewed: false,
          addAction: null,
          noActionReason: '',
          actionDetails: null,
          locked: false
        }
      },
      otherRecommendations: {
        'REC-201': {
          recId: 'REC-201',
          riskId: 'RP13',
          outcome: 'B1.a',
          outcomeTitle: 'Service protection',
          objective: 'B',
          type: 'other',
          reviewed: false,
          addAction: null,
          noActionReason: '',
          actionDetails: null,
          locked: false
        }
      }
    }

    // Generate REC-25 to REC-145 so total priority recommendations = 125
    for (let recNumber = 25; recNumber <= 145; recNumber++) {
      const recId = `REC-${recNumber}`

      let objective = 'C'
      if (recNumber >= 25 && recNumber <= 28) objective = 'A'
      else if (recNumber >= 29 && recNumber <= 31) objective = 'B'
      else if (recNumber >= 140 && recNumber <= 145) objective = 'D'

      const index = recNumber - 20
      const outcome = getOutcomeForObjective(objective, index)
      const risk = riskText(index, outcome)

      tipJourney.recommendations[recId] = {
        recId,
        riskId: risk.riskId,
        outcome,
        outcomeTitle: getOutcomeTitle(outcome),
        objective,
        type: 'priority',
        reviewed: false,
        addAction: null,
        noActionReason: '',
        actionDetails: null,
        locked: true
      }
    }

    // Generate REC-202 to REC-216 so total other recommendations = 16
    for (let recNumber = 202; recNumber <= 216; recNumber++) {
      const recId = `REC-${recNumber}`
      const objectiveCycle = ['B', 'B', 'C', 'C', 'D']
      const objective = objectiveCycle[(recNumber - 202) % objectiveCycle.length]
      const outcome = getOutcomeForObjective(objective, recNumber - 200)
      const risk = riskText(recNumber - 200, outcome)

      tipJourney.otherRecommendations[recId] = {
        recId,
        riskId: risk.riskId,
        outcome,
        outcomeTitle: getOutcomeTitle(outcome),
        objective,
        type: 'other',
        reviewed: false,
        addAction: null,
        noActionReason: '',
        actionDetails: null,
        locked: true
      }
    }

    sessionData.tipJourney = tipJourney
  }

 


  return sessionData.tipJourney
}

// --------------------------------------------------
// Priority recommendation helpers
// --------------------------------------------------

function getPriorityJourneyIds() {
  return ['REC-21', 'REC-22', 'REC-23', 'REC-24']
}

function getPriorityTaskHref() {
  return '/webcaf/tip/current/task/1/priority-c'
}

function getRecommendationStatus(rec) {
  if (!rec || rec.locked) return 'locked'
  if (!rec.reviewed) return 'not_reviewed'

  if (rec.addAction === false) {
    return 'no_action_planned'
  }

  if (rec.addAction === true) {
    if (rec.actionDetails && rec.actionDetails.actionDetailsDeferred === true) {
      return 'in_progress'
    }

    if (hasCompleteActionDetails(rec.actionDetails)) {
      return 'action_added'
    }

    return 'in_progress'
  }

  return 'not_reviewed'
}

function hasLaterActionAnswer(actionDetails) {
  if (!actionDetails) return false

  return [
    actionDetails.canProvideActionText,
    actionDetails.canProvideOwner,
    actionDetails.resourceAvailable,
    actionDetails.budgetAvailable,
    actionDetails.canProvideTargetDate
  ].includes('later')
}

function hasCompleteActionDetails(actionDetails) {
  if (!actionDetails) return false

  if (actionDetails.actionDetailsDeferred === true) {
    return false
  }

  const hasActionText =
    (actionDetails.actionText || '').trim() !== ''

  const hasOwner =
    (actionDetails.owner || '').trim() !== ''

  const resourcesAnswered =
    ['yes', 'no', 'unknown'].includes(actionDetails.resourceAvailable)

  const budgetAnswered =
    ['yes', 'no', 'unknown'].includes(actionDetails.budgetAvailable)

  const targetDateAnswered =
    ['yes', 'no'].includes(actionDetails.canProvideTargetDate)

  const targetDateComplete =
    actionDetails.canProvideTargetDate !== 'yes' ||
    (
      actionDetails.targetDate &&
      actionDetails.targetDate.day &&
      actionDetails.targetDate.month &&
      actionDetails.targetDate.year
    )

  const noDateReasonComplete =
    actionDetails.canProvideTargetDate !== 'no' ||
    (actionDetails.noTimingReason || '').trim() !== ''

  return (
    hasActionText &&
    hasOwner &&
    resourcesAnswered &&
    budgetAnswered &&
    targetDateAnswered &&
    targetDateComplete &&
    noDateReasonComplete
  )
}

function getRecommendationHref(tip, recId) {
  const rec = tip.recommendations[recId]

  if (!rec || rec.locked) {
    return '#'
  }

  return `/webcaf/tip/current/task/1/${recId.toLowerCase()}/review`
}

function isTipPendingApproval(sessionData) {
  return sessionData.tipPendingApproval === true &&
    sessionData.tipSubmitAndDownloadComplete !== true
}


function getTipStatus(tip, sessionData) {
  if (sessionData.tipSubmitAndDownloadComplete === true) {
    return 'Completed'
  }

  if (isTipPendingApproval(sessionData)) {
    return 'Pending approval'
  }

  if (
    isPriorityTaskComplete(tip) ||
    isOtherTaskComplete(tip, sessionData) ||
    isCheckAnswersConfirmed(sessionData)
  ) {
    return 'In progress'
  }

  return 'To do'
}



function getNextUnreviewedRecId(tip, currentRecId) {
  const ids = getPriorityJourneyIds()
  const currentIndex = ids.indexOf(currentRecId)

  for (let i = currentIndex + 1; i < ids.length; i++) {
    const rec = tip.recommendations[ids[i]]
    if (rec && !rec.reviewed) {
      return ids[i]
    }
  }

  return null
}

function isPriorityTaskComplete(tip) {
  return getPriorityJourneyIds().every((recId) => {
    const rec = tip.recommendations[recId]
    const status = getRecommendationStatus(rec)

    return status === 'action_added' || status === 'no_action_planned'
  })
}

function buildPriorityRows(tip) {
  return Object.values(tip.recommendations).map((rec) => {
    const recNumber = Number(rec.recId.replace('REC-', ''))
    const index = recNumber - 20
    const outcome = rec.outcome || getOutcomeForObjective(rec.objective, index)

    let riskId = rec.riskId
    let riskTextValue = rec.riskText

    if (!riskId || !riskTextValue) {
      const generatedRisk = riskText(index, outcome)
      riskId = generatedRisk.riskId
      riskTextValue = generatedRisk.riskText
    }

    return {
      ...rec,
      objective: rec.objective,
      outcome,
      outcomeTitle: rec.outcomeTitle || getOutcomeTitle(outcome),
      riskId,
      riskText: riskTextValue,
      recommendationText: rec.recommendationText || recommendationText(index, outcome),
      status: getRecommendationStatus(rec),
      href: getRecommendationHref(tip, rec.recId)
    }
  })
}

function getPriorityProgress(tip) {
  const rows = buildPriorityRows(tip).filter((row) => !row.locked)
  const total = tip.priorityCount
  const reviewed = rows.filter((row) => row.status !== 'not_reviewed').length
  const actionAdded = rows.filter((row) => row.status === 'action_added').length
  const inProgress = rows.filter((row) => row.status === 'in_progress').length
  const noActionPlanned = rows.filter((row) => row.status === 'no_action_planned').length

  return {
    total,
    reviewed,
    actionAdded,
    inProgress,
    noActionPlanned,
    notReviewed: total - reviewed
  }
}

// --------------------------------------------------
// Other recommendation helpers
// --------------------------------------------------

function getOtherTaskHref() {
  return '/webcaf/tip/current/task/2/other-recommendations-summary'
}

function isOtherTaskComplete(tip, sessionData) {
  const rec = tip.otherRecommendations['REC-201']
  const rec201Complete = rec && rec.reviewed === true
  const bulkReviewComplete = sessionData && sessionData.otherBulkReviewConfirmed === true

  return rec201Complete || bulkReviewComplete
}

function getOtherRecommendationStatus(rec) {
  if (!rec || rec.locked) return 'locked'
  if (!rec.reviewed) return 'not_reviewed'
  if (rec.addAction === true) return 'action_added'
  if (rec.addAction === false) return 'reviewed_no_action'
  return 'not_reviewed'
}

function getOtherRecommendationHref(rec) {
  if (!rec || rec.locked) return '#'

  return `/webcaf/tip/current/task/2/${rec.recId.toLowerCase()}/review`
}

function buildOtherRows(tip) {
  return Object.values(tip.otherRecommendations).map((rec, index) => {
    const rowIndex = index + 1
    const outcomes = ['B1.a', 'B2.d', 'C1.a', 'C1.b', 'C2.a', 'D2.a']
    const outcome = rec.outcome || outcomes[(rowIndex - 1) % outcomes.length]
    const risk = riskText(rowIndex, outcome)

    return {
      ...rec,
      outcome,
      outcomeTitle: rec.outcomeTitle || getOutcomeTitle(outcome),
      riskId: rec.riskId || risk.riskId,
      riskText: rec.riskText || risk.riskText,
      recommendationText: rec.recommendationText || recommendationText(rowIndex, outcome),
      status: getOtherRecommendationStatus(rec),
      href: getOtherRecommendationHref(rec)
    }
  })
}


// --------------------------------------------------
// Check answers helpers
// --------------------------------------------------

function canStartTipCheckAnswers(tip, sessionData) {
  return isPriorityTaskComplete(tip) && isOtherTaskComplete(tip, sessionData)
}

function isCheckAnswersConfirmed(sessionData) {
  return sessionData.tipCheckAnswersConfirmed === true
}

function formatDateParts(dateObj) {
  if (!dateObj) return ''
  const day = dateObj.day || ''
  const month = dateObj.month || ''
  const year = dateObj.year || ''

  if (!day && !month && !year) return ''
  return `${day}/${month}/${year}`
}





// --------------------------------------------------
// Check answers builders
// --------------------------------------------------
function buildCheckAnswersRows(recommendations, taskNumber) {
  return Object.values(recommendations)
    .filter((rec) => !rec.locked)
    .map((rec) => {
      const rows = []
      let summaryType = ''

      const changeHref = `/webcaf/tip/current/task/${taskNumber}/${rec.recId.toLowerCase()}/review?returnTo=check-answers`

      rows.push({
        key: { text: 'Reviewer recommendation' },
        value: {
          html: rec.recommendationText || 'Not provided'
        }
      })

      if (rec.addAction === false) {
        summaryType = 'No action added'

        rows.push(
          {
            key: { text: 'No action planned' },
            value: { text: rec.noActionReason || 'Not provided' }
          },
        )
      }

      if (rec.addAction === true && rec.actionDetails) {
        summaryType = 'Action added'

        rows.push(
          {
            key: { text: 'Action' },
            value: { text: rec.actionDetails.actionText || 'Not provided' }
          },
          {
            key: { text: 'Action owner' },
            value: { text: rec.actionDetails.owner || 'Not provided' }
          },
          {
            key: { text: 'Resources available' },
            value: { text: rec.actionDetails.resourceAvailable || 'Not provided' }
          },
          {
            key: { text: 'Budget approved' },
            value: { text: rec.actionDetails.budgetAvailable || 'Not provided' }
          }
        )

        if (rec.actionDetails.canProvideTargetDate === 'yes') {
          rows.push({
            key: { text: 'Estimated target completion date' },
            value: { text: formatDateParts(rec.actionDetails.targetDate) || 'Not provided' }
          })
        }

        if (rec.actionDetails.canProvideTargetDate === 'no') {
          rows.push({
            key: { text: 'Reason no target date given' },
            value: { text: rec.actionDetails.noTimingReason || 'Not provided' }
          })
        }
      }

      return {
        recId: rec.recId,
        outcome: rec.outcome,
        outcomeTitle: rec.outcomeTitle,
        type: rec.type,
        summaryType,
        rows,
        changeHref
      }
    })
}

router.post('/webcaf/tip/current/check-answers', function (req, res) {
  req.session.data.confirmAnswers = req.body.confirmAnswers

  const confirmed = req.body.confirmAnswers === 'yes'

  req.session.data.tipCheckAnswersConfirmed = confirmed

  if (!confirmed) {
    req.session.data.tipPendingApproval = false
  }

  return res.redirect('/webcaf/tip/current/draft-tip')
})

// --------------------------------------------------
// Check answers summaries on top of check answers page
// --------------------------------------------------
function getCheckAnswersSummary(items) {
  const actionAdded = items.filter((item) => item.summaryType === 'Action added').length
  const noAction = items.filter((item) => item.summaryType === 'No action added').length

  return {
    total: items.length,
    actionAdded,
    noAction
  }
}


// --------------------------------------------------
// TIP routes - Start with Priority routes
// --------------------------------------------------

router.get('/webcaf/tip/current/my-account', function (req, res) {
  const tip = buildTipState(req.session.data)

  const tipStatus = getTipStatus(tip, req.session.data)
  const primaryAction = getTipPrimaryAction(tipStatus)

  const tipSystems = [
    {
      id: tip.system.name,
      finalReportReference: tip.system.finalReportReference,
      finalReportDate: tip.system.finalReportDate,
      tipStatus: tipStatus,
      primaryActionText: primaryAction.text,
      primaryActionHref: primaryAction.href,
      secondaryActionText: 'View final IARR',
      secondaryActionHref: '/webcaf/tip/current/iar-report-v6'
    },
    {
      id: 'GOV.UK Communications Hub',
      finalReportReference: 'CAF24092025ABCD',
      finalReportDate: '18 December 2025',
      tipStatus: 'In progress',
      primaryActionText: 'Continue TIP',
      primaryActionHref: '/webcaf/tip/current/draft-tip',
      secondaryActionText: 'View final Peer Review report',
      secondaryActionHref: '/webcaf/tip/current/peer-review-report'
    },
    {
      id: 'Cabinet HR Portal',
      finalReportReference: 'CAF24092025WXYZ',
      finalReportDate: '19 December 2025',
      tipStatus: 'Completed',
      primaryActionText: 'View TIP',
      primaryActionHref: '/webcaf/tip/current/tip-output',
      secondaryActionText: 'Download TIP (PDF)',
      secondaryActionHref: '/webcaf/tip/current/tip-output',
      thirdActionText: 'Download TIP data (XLS)',
      thirdActionHref: '/webcaf/tip/current/tip-output'
    }
  ]

  res.render('webcaf/tip/current/my-account', {
    tipSystems
  })
})

router.get('/webcaf/tip/current/draft-tip', function (req, res) {
  const tip = buildTipState(req.session.data)

  res.render('webcaf/tip/current/draft-tip', {
  system: tip.system,
  priorityCount: String(tip.priorityCount),
  otherCount: String(tip.otherCount),
  priorityTaskComplete: isPriorityTaskComplete(tip),
  priorityTaskHref: '/webcaf/tip/current/task/1/priority-c',
  otherTaskComplete: isOtherTaskComplete(tip, req.session.data),
  otherTaskHref: getOtherTaskHref(),
  canStartCheckAnswers: canStartTipCheckAnswers(tip, req.session.data),
  checkAnswersComplete: isCheckAnswersConfirmed(req.session.data),
  tipPendingApproval: isTipPendingApproval(req.session.data),
  canStartSubmit: isPriorityTaskComplete(tip) &&
    isOtherTaskComplete(tip, req.session.data) &&
    isCheckAnswersConfirmed(req.session.data),
  submitTaskComplete: req.session.data.tipSubmitAndDownloadComplete === true
})
})

router.get('/webcaf/tip/current/task/1/priority', function (req, res) {
  const tip = buildTipState(req.session.data)

  res.render('webcaf/tip/current/task/1/priority', {
    tip,
    rows: buildPriorityRows(tip),
    progress: getPriorityProgress(tip)
  })
})

router.get('/webcaf/tip/current/task/1/priority-c', function (req, res) {
  const tip = buildTipState(req.session.data)

  res.render('webcaf/tip/current/task/1/priority-c', {
    tip,
    rows: buildPriorityRows(tip),
    progress: getPriorityProgress(tip)
  })
})

router.get('/webcaf/tip/current/task/1/:recSlug/review', function (req, res) {
  const tip = buildTipState(req.session.data)
  const recId = req.params.recSlug.toUpperCase()
  const rows = buildPriorityRows(tip)
  const item = rows.find((row) => row.recId === recId)

  if (!item || item.locked) {
    return res.redirect(getPriorityTaskHref())
  }

  item.reviewedRecommendationAndRisk = item.reviewed === true ? 'yes' : item.reviewed === false ? 'no' : ''
  item.addAction = item.addAction === true ? 'yes' : item.addAction === false ? 'no' : ''

  res.render('webcaf/tip/current/task/1/recommendation-review', {
    item,
    prioritySummaryHref: getPriorityTaskHref(),
    returnTo: req.query.returnTo || '',
    canContinueToAnswers: canStartTipCheckAnswers(tip, req.session.data),
    lastPriorityOwner: req.session.data.tipLastPriorityOwner || ''
  })
})
router.post('/webcaf/tip/current/task/1/:recSlug/review', function (req, res) {
  const tip = buildTipState(req.session.data)
  const recId = req.params.recSlug.toUpperCase()
  const item = tip.recommendations[recId]

  if (!item || item.locked) {
    return res.redirect(getPriorityTaskHref())
  }

  const addAction = req.body.addAction === 'yes'
    ? true
    : req.body.addAction === 'no'
      ? false
      : null

  item.reviewed = true
  item.addAction = addAction

  if (addAction === false) {
    item.noActionReason = req.body.noActionReason || ''
    item.actionDetails = null
  }

  if (addAction === true) {
    const saveAsIncomplete =
      req.body.saveIncomplete === 'yes' ||
      req.body.saveMode === 'in_progress'

    item.noActionReason = ''

    item.actionDetails = {
      actionDetailsDeferred: saveAsIncomplete,
      actionText: req.body.actionText || '',
      owner: req.body.owner || '',
      resourceAvailable: req.body.resourceAvailable || '',
      budgetAvailable: req.body.budgetAvailable || '',
      canProvideTargetDate: req.body.canProvideTargetDate || '',
      targetDate: {
        day: req.body['targetDate-day'] || '',
        month: req.body['targetDate-month'] || '',
        year: req.body['targetDate-year'] || ''
      },
      noTimingReason: req.body.noTimingReason || ''
    }

    req.session.data.tipLastPriorityOwner = req.body.owner || ''
  }

  if (req.body.saveIncomplete === 'yes' || req.body.saveMode === 'in_progress') {
    return res.redirect(getPriorityTaskHref())
  }

  if (req.body.saveReturn === 'yes') {
    return res.redirect(getPriorityTaskHref())
  }

  if (canStartTipCheckAnswers(tip, req.session.data)) {
    return res.redirect('/webcaf/tip/current/check-answers')
  }

  const nextRecId = getNextUnreviewedRecId(tip, recId)

  if (nextRecId) {
    return res.redirect(`/webcaf/tip/current/task/1/${nextRecId.toLowerCase()}/review`)
  }

  return res.redirect(getPriorityTaskHref())
})


// --------------------------------------------------
// Other recommendation routes
// --------------------------------------------------




router.get('/webcaf/tip/current/task/2/other-recommendations-summary', function (req, res) {
  const tip = buildTipState(req.session.data)

  res.render('webcaf/tip/current/task/2/other-recommendations-summary', {
    tip,
    rows: buildOtherRows(tip),
    total: 16,
    reviewed: isOtherTaskComplete(tip, req.session.data) ? 1 : 0,
    showBulkReviewMessage: req.session.data.otherBulkReviewMessage === true
  })

  req.session.data.otherBulkReviewMessage = false
})

router.get('/webcaf/tip/current/task/2/:recSlug/review', function (req, res) {
  const tip = buildTipState(req.session.data)
  const recId = req.params.recSlug.toUpperCase()
  const rows = buildOtherRows(tip)
  const item = rows.find((row) => row.recId === recId)

  if (!item || item.locked) {
    return res.redirect(getOtherTaskHref())
  }
item.reviewedRecommendationAndRisk = item.reviewed === true ? 'yes' : item.reviewed === false ? 'no' : ''
item.addAction = item.addAction === true ? 'yes' : item.addAction === false ? 'no' : ''

  res.render('webcaf/tip/current/task/2/other-recommendation-review', {
    item,
    otherSummaryHref: getOtherTaskHref(),
    returnTo: req.query.returnTo || '',
    showBackToAnswers: canStartTipCheckAnswers(tip) || isCheckAnswersConfirmed(req.session.data)
  })
})



router.post('/webcaf/tip/current/task/2/:recSlug/review', function (req, res) {
  const tip = buildTipState(req.session.data)
  const recId = req.params.recSlug.toUpperCase()
  const item = tip.otherRecommendations[recId]
  const returnTo = req.query.returnTo

  if (!item || item.locked) {
    return res.redirect(getOtherTaskHref())
  }

  const reviewed = req.body.reviewedRecommendationAndRisk === 'yes'
  const addAction = req.body.addAction === 'yes'
    ? true
    : req.body.addAction === 'no'
      ? false
      : null

  item.reviewed = reviewed

  if (!reviewed) {
    item.addAction = null
    item.noActionReason = ''
    item.actionDetails = null

    if (returnTo === 'check-answers') {
      return res.redirect('/webcaf/tip/current/check-answers')
    }

    return res.redirect(getOtherTaskHref())
  }

  item.addAction = addAction

  if (addAction === false) {
    item.noActionReason = req.body.noActionReason || ''
    item.actionDetails = null
  }

  if (addAction === true) {
    item.noActionReason = ''
    item.actionDetails = {
      actionText: req.body.actionText || '',
      owner: req.body.owner || '',
      resourceAvailable: req.body.resourceAvailable || '',
      budgetAvailable: req.body.budgetAvailable || '',
      canProvideTargetDate: req.body.canProvideTargetDate || '',
      targetDate: {
        day: req.body['targetDate-day'] || '',
        month: req.body['targetDate-month'] || '',
        year: req.body['targetDate-year'] || ''
      },
      noTimingReason: req.body.noTimingReason || ''
    }
  }

  if (returnTo === 'check-answers') {
    return res.redirect('/webcaf/tip/current/check-answers')
  }

  if (req.body.saveReturn === 'yes') {
    return res.redirect(getOtherTaskHref())
  }

  return res.redirect(getOtherTaskHref())
})





router.post('/webcaf/tip/current/task/2/review-all', function (req, res) {
  const tip = buildTipState(req.session.data)
  const bulkConfirmed = req.body.confirmBulkReview === 'yes'
  const bulkNoActionReason = req.body.bulkNoActionReason || ''

  req.session.data.otherBulkReviewConfirmed = bulkConfirmed
  req.session.data.otherBulkReviewMessage = bulkConfirmed

  if (bulkConfirmed) {
    Object.values(tip.otherRecommendations).forEach((rec) => {
      if (!rec.reviewed) {
        rec.reviewed = true
        rec.addAction = false
        rec.noActionReason = bulkNoActionReason
        rec.actionDetails = null
      }
    })
  }

  return res.redirect('/webcaf/tip/current/task/2/other-recommendations-summary')
})

// --------------------------------------------------
// Check answers routes
// --------------------------------------------------

router.get('/webcaf/tip/current/check-answers', function (req, res) {
  const tip = buildTipState(req.session.data)

  if (!isPriorityTaskComplete(tip) || !isOtherTaskComplete(tip, req.session.data)) {
    return res.redirect('/webcaf/tip/current/draft-tip')
  }

  const priorityRows = buildPriorityRows(tip).filter((row) => !row.locked)
  const otherRows = buildOtherRows(tip).filter((row) => !row.locked)

  const priorityRecommendations = buildCheckAnswersRows(
    priorityRows.reduce((acc, row) => {
      acc[row.recId] = row
      return acc
    }, {}),
    1
  )




  const otherRecommendations = buildCheckAnswersRows(
    otherRows.reduce((acc, row) => {
      acc[row.recId] = row
      return acc
    }, {}),
    2
  )

  res.render('webcaf/tip/current/check-answers', {
    system: tip.system,
    priorityRecommendations,
    otherRecommendations,
    prioritySummary: getCheckAnswersSummary(priorityRecommendations),
    otherSummary: getCheckAnswersSummary(otherRecommendations)
  })
})



router.post('/webcaf/tip/current/submit-and-download', function (req, res) {
  const confirmed = req.body.confirmSubmit === 'yes' ||
    req.body.confirmSubmit === 'on' ||
    req.body.confirmSubmit === 'true'

  if (confirmed) {
    req.session.data.tipPendingApproval = true
    req.session.data.tipSubmittedForApproval = true

    return res.redirect('/webcaf/tip/current/confirmation')
  }

  return res.redirect('/webcaf/tip/current/submit-and-download')
})

router.get('/webcaf/tip/current/confirmation', function (req, res) {
  req.session.data.tipPendingApproval = true
  req.session.data.tipSubmittedForApproval = true

  res.render('webcaf/tip/current/confirmation', {
    system: buildTipState(req.session.data).system
  })
})



// End of Routes.js
module.exports = router