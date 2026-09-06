"use strict";

const COLOR_THEME_KEY = "historical-workbench-color-theme-v87";
const COLOR_THEME_LABELS = {
  cyan: "青色",
  blue: "蓝色",
};
const COLOR_THEME_READER_PALETTES = {
  cyan: {
    text: "#173236",
    header: "#e1f1f1",
    border: "#cfe1e1",
    muted: "#5f777b",
    buttonBorder: "#9bc3c5",
    buttonText: "#0f5055",
  },
  blue: {
    text: "#172844",
    header: "#eef4ff",
    border: "#d8e3f5",
    muted: "#6c7d9b",
    buttonBorder: "#b9cbea",
    buttonText: "#31578f",
  },
};

const elements = {
  workspace: document.querySelector(".workspace"),
  workspaceDivider: document.querySelector("#workspaceDivider"),
  libraryWorkspaceDivider: document.querySelector(
    "#libraryWorkspaceDivider"
  ),
  libraryPanel: document.querySelector(".library-panel"),
  workspaceNavButton: document.querySelector("#workspaceNavButton"),
  favoriteWebsitesNavButton: document.querySelector(
    "#favoriteWebsitesNavButton"
  ),
  historyNavButton: document.querySelector("#historyNavButton"),
  libraryDrawerBackdrop: document.querySelector("#libraryDrawerBackdrop"),
  workspaceContextMenu: document.querySelector("#workspaceContextMenu"),
  workspaceContextDeleteButton: document.querySelector(
    "#workspaceContextDeleteButton"
  ),
  focusReadingButton: document.querySelector("#focusReadingButton"),
  previousMaterialButton: document.querySelector("#previousMaterialButton"),
  nextMaterialButton: document.querySelector("#nextMaterialButton"),
  aiSuggestionNavButton: document.querySelector("#aiSuggestionNavButton"),
  exportNavButton: document.querySelector("#exportNavButton"),
  colorThemeButton: document.querySelector("#colorThemeButton"),
  colorThemeButtonLabel: document.querySelector(
    "#colorThemeButtonLabel"
  ),
  aiSuggestionModal: document.querySelector("#aiSuggestionModal"),
  favoriteWebsitesModal: document.querySelector("#favoriteWebsitesModal"),
  closeFavoriteWebsitesButton: document.querySelector(
    "#closeFavoriteWebsitesButton"
  ),
  favoriteWebsiteSearchInput: document.querySelector(
    "#favoriteWebsiteSearchInput"
  ),
  favoriteWebsiteFolders: document.querySelector("#favoriteWebsiteFolders"),
  favoriteWebsiteListTitle: document.querySelector(
    "#favoriteWebsiteListTitle"
  ),
  favoriteWebsiteEditor: document.querySelector("#favoriteWebsiteEditor"),
  showFavoriteWebsiteEditorButton: document.querySelector(
    "#showFavoriteWebsiteEditorButton"
  ),
  favoriteWebsiteNameInput: document.querySelector(
    "#favoriteWebsiteNameInput"
  ),
  favoriteWebsiteUrlInput: document.querySelector(
    "#favoriteWebsiteUrlInput"
  ),
  favoriteWebsiteCategorySelect: document.querySelector(
    "#favoriteWebsiteCategorySelect"
  ),
  showFavoriteCategoryEditorButton: document.querySelector(
    "#showFavoriteCategoryEditorButton"
  ),
  cancelFavoriteCategoryButton: document.querySelector(
    "#cancelFavoriteCategoryButton"
  ),
  favoriteCategoryManager: document.querySelector(
    "#favoriteCategoryManager"
  ),
  favoriteCategoryNameInput: document.querySelector(
    "#favoriteCategoryNameInput"
  ),
  addFavoriteCategoryButton: document.querySelector(
    "#addFavoriteCategoryButton"
  ),
  favoriteCategoryList: document.querySelector("#favoriteCategoryList"),
  cancelFavoriteWebsiteEditButton: document.querySelector(
    "#cancelFavoriteWebsiteEditButton"
  ),
  saveFavoriteWebsiteButton: document.querySelector(
    "#saveFavoriteWebsiteButton"
  ),
  favoriteWebsiteEditorStatus: document.querySelector(
    "#favoriteWebsiteEditorStatus"
  ),
  favoriteWebsitesList: document.querySelector("#favoriteWebsitesList"),
  closeAiSuggestionButton: document.querySelector("#closeAiSuggestionButton"),
  toggleAiBuilderButton: document.querySelector("#toggleAiBuilderButton"),
  aiSuggestionModalCard: document.querySelector(
    "#aiSuggestionModal .ai-suggestion-modal"
  ),
  aiSuggestionSelectedCount: document.querySelector(
    "#aiSuggestionSelectedCount"
  ),
  aiSuggestionSearchInput: document.querySelector(
    "#aiSuggestionSearchInput"
  ),
  aiSuggestionKindFilters: Array.from(
    document.querySelectorAll("[data-ai-suggestion-kind]")
  ),
  selectVisibleAiMaterialsButton: document.querySelector(
    "#selectVisibleAiMaterialsButton"
  ),
  clearAiMaterialsButton: document.querySelector(
    "#clearAiMaterialsButton"
  ),
  aiSuggestionMaterialList: document.querySelector(
    "#aiSuggestionMaterialList"
  ),
  aiSuggestionIncludeMetadata: document.querySelector(
    "#aiSuggestionIncludeMetadata"
  ),
  aiSuggestionIncludeOcr: document.querySelector(
    "#aiSuggestionIncludeOcr"
  ),
  aiSuggestionIncludeAnnotations: document.querySelector(
    "#aiSuggestionIncludeAnnotations"
  ),
  aiSuggestionIncludeNotes: document.querySelector(
    "#aiSuggestionIncludeNotes"
  ),
  aiSuggestionIncludeTranslations: document.querySelector(
    "#aiSuggestionIncludeTranslations"
  ),
  aiSuggestionTextLimit: document.querySelector(
    "#aiSuggestionTextLimit"
  ),
  aiSuggestionTypeInputs: Array.from(
    document.querySelectorAll("[data-ai-suggestion-type]")
  ),
  aiSuggestionProviderSelect: document.querySelector(
    "#aiSuggestionProviderSelect"
  ),
  aiSuggestionProviderStatus: document.querySelector(
    "#aiSuggestionProviderStatus"
  ),
  aiSuggestionPreview: document.querySelector("#aiSuggestionPreview"),
  aiSuggestionConsent: document.querySelector("#aiSuggestionConsent"),
  generateAiSuggestionButton: document.querySelector(
    "#generateAiSuggestionButton"
  ),
  aiSuggestionRecordCount: document.querySelector(
    "#aiSuggestionRecordCount"
  ),
  aiSuggestionRecordList: document.querySelector(
    "#aiSuggestionRecordList"
  ),
  aiSuggestionRightTabs: Array.from(
    document.querySelectorAll("[data-ai-right-panel]")
  ),
  aiSuggestionRightContents: Array.from(
    document.querySelectorAll("[data-ai-right-content]")
  ),
  aiSuggestionRecordsPanel: document.querySelector(
    "#aiSuggestionRecordsPanel"
  ),
  aiChatPanel: document.querySelector("#aiChatPanel"),
  clearAiChatButton: document.querySelector("#clearAiChatButton"),
  aiChatMessages: document.querySelector("#aiChatMessages"),
  aiChatFontDown: document.querySelector("#aiChatFontDown"),
  aiChatFontSize: document.querySelector("#aiChatFontSize"),
  aiChatFontUp: document.querySelector("#aiChatFontUp"),
  aiChatProviderSelect: document.querySelector("#aiChatProviderSelect"),
  aiChatProviderStatus: document.querySelector("#aiChatProviderStatus"),
  aiChatQuestionInput: document.querySelector("#aiChatQuestionInput"),
  aiChatConsent: document.querySelector("#aiChatConsent"),
  aiChatConsentText: document.querySelector("#aiChatConsentText"),
  aiChatContextSummary: document.querySelector("#aiChatContextSummary"),
  sendAiChatButton: document.querySelector("#sendAiChatButton"),
  chooseFolderButton: document.querySelector("#chooseFolderButton"),
  folderImportButton: document.querySelector("#folderImportButton"),
  importReviewButton: document.querySelector("#importReviewButton"),
  importReviewBadge: document.querySelector("#importReviewBadge"),
  timelineButton: document.querySelector("#timelineButton"),
  newProjectButton: document.querySelector("#newProjectButton"),
  projectList: document.querySelector("#projectList"),
  searchInput: document.querySelector("#searchInput"),
  searchScopeButton: document.querySelector("#searchScopeButton"),
  searchScopePopover: document.querySelector("#searchScopePopover"),
  searchKindInputs: Array.from(
    document.querySelectorAll("[data-search-kind]")
  ),
  searchScopeActions: Array.from(
    document.querySelectorAll("[data-search-scope-action]")
  ),
  kindTabs: Array.from(document.querySelectorAll("[data-kind-tab]")),
  listTitle: document.querySelector("#listTitle"),
  detailsViewButtons: Array.from(
    document.querySelectorAll("[data-details-view]")
  ),
  detailsViewPanels: Array.from(
    document.querySelectorAll("[data-details-panel]")
  ),
  ocrSurfaceButtons: Array.from(
    document.querySelectorAll("[data-ocr-surface]")
  ),
  ocrSurfacePanels: Array.from(
    document.querySelectorAll(
      ".ocr-surface-raw, .ocr-surface-corrected"
    )
  ),
  notesSurfaceButtons: Array.from(
    document.querySelectorAll("[data-notes-surface]")
  ),
  foreignTextModeTabs: document.querySelector("#foreignTextModeTabs"),
  sharedEngineSettingsMount: document.querySelector(
    "#sharedEngineSettingsMount"
  ),
  ocrEngineSettingsDisclosure: document.querySelector(
    "#ocrEngineSettingsDisclosure"
  ),
  engineSettingsButtons: Array.from(
    document.querySelectorAll("[data-engine-settings-tab]")
  ),
  engineSettingsPanels: Array.from(
    document.querySelectorAll("[data-engine-settings-panel]")
  ),
  unifiedTextModeTabs: document.querySelector("#unifiedTextModeTabs"),
  mainTextFloatButton: document.querySelector("#mainTextFloatButton"),
  mainTextOcrButton: document.querySelector("#mainTextOcrButton"),
  mainTextAiButton: document.querySelector("#mainTextAiButton"),
  mainTextTranslationButton: document.querySelector(
    "#mainTextTranslationButton"
  ),
  mainTextClearButton: document.querySelector("#mainTextClearButton"),
  foreignTextModeButtons: Array.from(
    document.querySelectorAll("[data-foreign-text-mode]")
  ),
  notesViewCount: document.querySelector("#notesViewCount"),
  ocrPageInputs: Array.from(document.querySelectorAll("[data-ocr-page-input]")),
  ocrRegionSelects: Array.from(
    document.querySelectorAll("[data-ocr-region-select]")
  ),
  pageOcrEngineSelect: document.querySelector("#pageOcrEngineSelect"),
  cloudOcrSettingsPanel: document.querySelector("#cloudOcrSettingsPanel"),
  cloudProviderSettings: Array.from(
    document.querySelectorAll("[data-cloud-settings]")
  ),
  kandianAccountInput: document.querySelector("#kandianAccountInput"),
  kandianTokenInput: document.querySelector("#kandianTokenInput"),
  kandianDetModeSelect: document.querySelector("#kandianDetModeSelect"),
  kandianVersionSelect: document.querySelector("#kandianVersionSelect"),
  kandianConfiguredStatus: document.querySelector(
    "#kandianConfiguredStatus"
  ),
  baiduApiKeyInput: document.querySelector("#baiduApiKeyInput"),
  baiduSecretKeyInput: document.querySelector("#baiduSecretKeyInput"),
  baiduLanguageTypeSelect: document.querySelector(
    "#baiduLanguageTypeSelect"
  ),
  baiduConfiguredStatus: document.querySelector("#baiduConfiguredStatus"),
  cloudOcrConsent: document.querySelector("#cloudOcrConsent"),
  saveCloudOcrSettingsButton: document.querySelector(
    "#saveCloudOcrSettingsButton"
  ),
  clearCloudOcrButtons: Array.from(
    document.querySelectorAll("[data-clear-cloud-ocr]")
  ),
  ocrServiceStatuses: Array.from(
    document.querySelectorAll("[data-ocr-service-status]")
  ),
  ocrServiceDots: Array.from(
    document.querySelectorAll("[data-ocr-service-dot]")
  ),
  refreshOcrServiceButtons: Array.from(
    document.querySelectorAll("[data-refresh-ocr-service]")
  ),
  manageOcrServiceButtons: Array.from(
    document.querySelectorAll("[data-manage-ocr-service]")
  ),
  aiSentenceConfiguredStatus: document.querySelector(
    "#aiSentenceConfiguredStatus"
  ),
  aiSentenceProviderSelect: document.querySelector(
    "#aiSentenceProviderSelect"
  ),
  aiSentenceEndpointDisplay: document.querySelector(
    "#aiSentenceEndpointDisplay"
  ),
  aiSentenceApiKeyInput: document.querySelector("#aiSentenceApiKeyInput"),
  aiSentenceModelInput: document.querySelector("#aiSentenceModelInput"),
  saveAiSentenceSettingsButton: document.querySelector(
    "#saveAiSentenceSettingsButton"
  ),
  clearAiSentenceSettingsButton: document.querySelector(
    "#clearAiSentenceSettingsButton"
  ),
  translationEngineSelect: document.querySelector(
    "#translationEngineSelect"
  ),
  translationEngineSettingsMount: document.querySelector(
    "#translationEngineSettingsMount"
  ),
  translationEngineSettingsBlock: document.querySelector(
    "#translationEngineSettingsBlock"
  ),
  translationSourceLanguage: document.querySelector(
    "#translationSourceLanguage"
  ),
  translationTargetLanguage: document.querySelector(
    "#translationTargetLanguage"
  ),
  translationPageInput: document.querySelector("#translationPageInput"),
  translationEngineStatus: document.querySelector(
    "#translationEngineStatus"
  ),
  edgeTranslationPanel: document.querySelector("#edgeTranslationPanel"),
  checkEdgeTranslationButton: document.querySelector(
    "#checkEdgeTranslationButton"
  ),
  argosTranslationPanel: document.querySelector("#argosTranslationPanel"),
  argosTranslationStatus: document.querySelector("#argosTranslationStatus"),
  checkArgosTranslationButton: document.querySelector(
    "#checkArgosTranslationButton"
  ),
  installArgosTranslationButton: document.querySelector(
    "#installArgosTranslationButton"
  ),
  downloadArgosModelButton: document.querySelector(
    "#downloadArgosModelButton"
  ),
  cloudTranslationPanel: document.querySelector("#cloudTranslationPanel"),
  cloudTranslationProviderName: document.querySelector(
    "#cloudTranslationProviderName"
  ),
  cloudTranslationConfiguredStatus: document.querySelector(
    "#cloudTranslationConfiguredStatus"
  ),
  cloudTranslationApiKey: document.querySelector(
    "#cloudTranslationApiKey"
  ),
  cloudTranslationModel: document.querySelector("#cloudTranslationModel"),
  cloudTranslationEndpoint: document.querySelector(
    "#cloudTranslationEndpoint"
  ),
  clearCloudTranslationSettingsButton: document.querySelector(
    "#clearCloudTranslationSettingsButton"
  ),
  saveCloudTranslationSettingsButton: document.querySelector(
    "#saveCloudTranslationSettingsButton"
  ),
  translationInput: document.querySelector("#translationInput"),
  translationCloudConsentLabel: document.querySelector(
    "#translationCloudConsentLabel"
  ),
  translationCloudConsent: document.querySelector(
    "#translationCloudConsent"
  ),
  loadTranslationInputButton: document.querySelector(
    "#loadTranslationInputButton"
  ),
  runTranslationButton: document.querySelector("#runTranslationButton"),
  translationOutput: document.querySelector("#translationOutput"),
  copyTranslationOutputButton: document.querySelector(
    "#copyTranslationOutputButton"
  ),
  saveTranslationRecordButton: document.querySelector(
    "#saveTranslationRecordButton"
  ),
  translationWorkspace: document.querySelector("#translationWorkspace"),
  translationRecordList: document.querySelector("#translationRecordList"),
  screenshotPageInput: document.querySelector(
    "#screenshotPageInput"
  ),
  screenshotFolderPath: document.querySelector("#screenshotFolderPath"),
  chooseScreenshotFolderButton: document.querySelector(
    "#chooseScreenshotFolderButton"
  ),
  resetScreenshotFolderButton: document.querySelector(
    "#resetScreenshotFolderButton"
  ),
  exportScreenshotPageButton: document.querySelector(
    "#exportScreenshotPageButton"
  ),
  exportScreenshotRegionButton: document.querySelector(
    "#exportScreenshotRegionButton"
  ),
  screenshotExportPath: document.querySelector("#screenshotExportPath"),
  copyScreenshotExportPathButton: document.querySelector(
    "#copyScreenshotExportPathButton"
  ),
  screenshotImportedText: document.querySelector("#screenshotImportedText"),
  saveScreenshotPageTextButton: document.querySelector(
    "#saveScreenshotPageTextButton"
  ),
  saveScreenshotRegionTextButton: document.querySelector(
    "#saveScreenshotRegionTextButton"
  ),
  pageAiSentenceInput: document.querySelector("#pageAiSentenceInput"),
  pageAiSentenceConsent: document.querySelector("#pageAiSentenceConsent"),
  loadPageAiSentenceInputButton: document.querySelector(
    "#loadPageAiSentenceInputButton"
  ),
  runPageAiSentenceButton: document.querySelector(
    "#runPageAiSentenceButton"
  ),
  pageAiSentenceOutput: document.querySelector("#pageAiSentenceOutput"),
  copyPageAiSentenceOutputButton: document.querySelector(
    "#copyPageAiSentenceOutputButton"
  ),
  usePageAiSentenceOutputButton: document.querySelector(
    "#usePageAiSentenceOutputButton"
  ),
  ocrPendingCard: document.querySelector("#ocrPendingCard"),
  ocrPendingStatus: document.querySelector("#ocrPendingStatus"),
  ocrPendingText: document.querySelector("#ocrPendingText"),
  discardOcrPendingButton: document.querySelector("#discardOcrPendingButton"),
  keepOcrPendingButton: document.querySelector("#keepOcrPendingButton"),
  ocrRawStatus: document.querySelector("#ocrRawStatus"),
  ocrRawText: document.querySelector("#ocrRawText"),
  copyOcrRawButton: document.querySelector("#copyOcrRawButton"),
  floatOcrRawButton: document.querySelector("#floatOcrRawButton"),
  deleteOcrRegionButton: document.querySelector("#deleteOcrRegionButton"),
  ocrCorrectedText: document.querySelector("#ocrCorrectedText"),
  resetOcrCorrectedButton: document.querySelector("#resetOcrCorrectedButton"),
  floatOcrCorrectedButton: document.querySelector(
    "#floatOcrCorrectedButton"
  ),
  saveOcrCorrectedButton: document.querySelector("#saveOcrCorrectedButton"),
  createManualCorrectedButton: document.querySelector(
    "#createManualCorrectedButton"
  ),
  useOcrAsCorrectionButton: document.querySelector(
    "#useOcrAsCorrectionButton"
  ),
  ocrReferenceButtons: Array.from(
    document.querySelectorAll("[data-ocr-reference]")
  ),
  ocrReferenceDisclosure: document.querySelector("#ocrReferenceDisclosure"),
  ocrReferenceStatus: document.querySelector("#ocrReferenceStatus"),
  ocrReferenceText: document.querySelector("#ocrReferenceText"),
  ocrReferencePageInput: document.querySelector("#ocrReferencePageInput"),
  ocrReferencePreviousPageButton: document.querySelector(
    "#ocrReferencePreviousPageButton"
  ),
  ocrReferenceNextPageButton: document.querySelector(
    "#ocrReferenceNextPageButton"
  ),
  ocrReferenceFontDownButton: document.querySelector(
    "#ocrReferenceFontDownButton"
  ),
  ocrReferenceFontValue: document.querySelector("#ocrReferenceFontValue"),
  ocrReferenceFontUpButton: document.querySelector(
    "#ocrReferenceFontUpButton"
  ),
  floatOcrReferenceButton: document.querySelector(
    "#floatOcrReferenceButton"
  ),
  pageOcrReferenceBody: document.querySelector("#pageOcrReferenceBody"),
  quoteOcrSelectionButton: document.querySelector("#quoteOcrSelectionButton"),
  noteReferenceDrafts: document.querySelector("#noteReferenceDrafts"),
  scopeSummary: document.querySelector("#scopeSummary"),
  folderWarning: document.querySelector("#folderWarning"),
  appConfirmModal: document.querySelector("#appConfirmModal"),
  appConfirmMessage: document.querySelector("#appConfirmMessage"),
  appConfirmInput: document.querySelector("#appConfirmInput"),
  appConfirmCancel: document.querySelector("#appConfirmCancel"),
  appConfirmAccept: document.querySelector("#appConfirmAccept"),
  fileCount: document.querySelector("#fileCount"),
  fileList: document.querySelector("#fileList"),
  sortSelect: document.querySelector("#sortSelect"),
  fileType: document.querySelector("#fileType"),
  progressText: document.querySelector("#progressText"),
  emptyPreview: document.querySelector("#emptyPreview"),
  previewStage: document.querySelector("#previewStage"),
  imagePreview: document.querySelector("#imagePreview"),
  pdfPreview: document.querySelector("#pdfPreview"),
  pdfContinuousPreview: document.querySelector("#pdfContinuousPreview"),
  pdfSelectionPreview: document.querySelector("#pdfSelectionPreview"),
  imageTools: document.querySelector("#imageTools"),
  zoomHint: document.querySelector("#zoomHint"),
  pdfModeButton: document.querySelector("#pdfModeButton"),
  annotationToolbar: document.querySelector("#annotationToolbar"),
  annotationPanButton: document.querySelector("#annotationPanButton"),
  annotationModeButton: document.querySelector("#annotationModeButton"),
  annotationPageField: document.querySelector("#annotationPageField"),
  annotationPageInput: document.querySelector("#annotationPageInput"),
  previousAnnotationPageButton: document.querySelector(
    "#previousAnnotationPageButton"
  ),
  nextAnnotationPageButton: document.querySelector(
    "#nextAnnotationPageButton"
  ),
  annotationColorButtons: Array.from(
    document.querySelectorAll("[data-annotation-color]")
  ),
  annotationLayer: document.querySelector("#annotationLayer"),
  zoomOutButton: document.querySelector("#zoomOutButton"),
  zoomInButton: document.querySelector("#zoomInButton"),
  zoomResetButton: document.querySelector("#zoomResetButton"),
  zoomLevel: document.querySelector("#zoomLevel"),
  currentFileName: document.querySelector("#currentFileName"),
  recordId: document.querySelector("#recordId"),
  originalFileName: document.querySelector("#originalFileName"),
  copyIdButton: document.querySelector("#copyIdButton"),
  renameForm: document.querySelector("#renameForm"),
  yearInput: document.querySelector("#yearInput"),
  monthInput: document.querySelector("#monthInput"),
  dayInput: document.querySelector("#dayInput"),
  yearCombobox: document.querySelector("#yearCombobox"),
  monthCombobox: document.querySelector("#monthCombobox"),
  dayCombobox: document.querySelector("#dayCombobox"),
  yearMenu: document.querySelector("#yearMenu"),
  monthMenu: document.querySelector("#monthMenu"),
  dayMenu: document.querySelector("#dayMenu"),
  paperInput: document.querySelector("#paperInput"),
  paperCombobox: document.querySelector("#paperCombobox"),
  paperMenuButton: document.querySelector("#paperMenuButton"),
  paperMenu: document.querySelector("#paperMenu"),
  editionNumberInput: document.querySelector("#editionNumberInput"),
  editionCombobox: document.querySelector("#editionCombobox"),
  editionMenuButton: document.querySelector("#editionMenuButton"),
  editionNumberMenu: document.querySelector("#editionNumberMenu"),
  editionUnitButtons: Array.from(
    document.querySelectorAll("[data-edition-unit]")
  ),
  titleInput: document.querySelector("#titleInput"),
  authorInput: document.querySelector("#authorInput"),
  sourceFields: document.querySelector("#sourceFields"),
  paperFields: document.querySelector("#paperFields"),
  bookFields: document.querySelector("#bookFields"),
  recordKindButtons: Array.from(
    document.querySelectorAll("[data-record-kind]")
  ),
  paperTypeButtons: Array.from(document.querySelectorAll("[data-paper-type]")),
  journalPaperFields: document.querySelector("#journalPaperFields"),
  thesisPaperFields: document.querySelector("#thesisPaperFields"),
  paperAuthorInput: document.querySelector("#paperAuthorInput"),
  paperTitleInput: document.querySelector("#paperTitleInput"),
  journalInput: document.querySelector("#journalInput"),
  issueNumberInput: document.querySelector("#issueNumberInput"),
  issueCombobox: document.querySelector("#issueCombobox"),
  issueMenuButton: document.querySelector("#issueMenuButton"),
  issueNumberMenu: document.querySelector("#issueNumberMenu"),
  issueUnitButtons: Array.from(document.querySelectorAll("[data-issue-unit]")),
  degreeSelect: document.querySelector("#degreeSelect"),
  institutionInput: document.querySelector("#institutionInput"),
  paperYearInput: document.querySelector("#paperYearInput"),
  paperMonthInput: document.querySelector("#paperMonthInput"),
  paperDayInput: document.querySelector("#paperDayInput"),
  bookAuthorInput: document.querySelector("#bookAuthorInput"),
  bookTitleInput: document.querySelector("#bookTitleInput"),
  bookPlaceInput: document.querySelector("#bookPlaceInput"),
  bookPublisherInput: document.querySelector("#bookPublisherInput"),
  bookYearInput: document.querySelector("#bookYearInput"),
  bookMonthInput: document.querySelector("#bookMonthInput"),
  bookDayInput: document.querySelector("#bookDayInput"),
  paperYearOptions: document.querySelector("#paperYearOptions"),
  optionalMonthOptions: document.querySelector("#optionalMonthOptions"),
  optionalDayOptions: document.querySelector("#optionalDayOptions"),
  tagEditor: document.querySelector("#tagEditor"),
  tagChipList: document.querySelector("#tagChipList"),
  tagInput: document.querySelector("#tagInput"),
  tagAddButton: document.querySelector("#tagAddButton"),
  sourceLanguageCard: document.querySelector("#sourceLanguageCard"),
  sourceLanguageButtons: Array.from(
    document.querySelectorAll("[data-source-language]")
  ),
  readingStatusButtons: Array.from(
    document.querySelectorAll("[data-reading-status]")
  ),
  filenamePreview: document.querySelector("#filenamePreview"),
  researchNoteCount: document.querySelector("#researchNoteCount"),
  annotationDraftEditor: document.querySelector("#annotationDraftEditor"),
  annotationDraftLocation: document.querySelector("#annotationDraftLocation"),
  annotationDraftText: document.querySelector("#annotationDraftText"),
  cancelAnnotationDraftButton: document.querySelector(
    "#cancelAnnotationDraftButton"
  ),
  saveAnnotationDraftButton: document.querySelector(
    "#saveAnnotationDraftButton"
  ),
  recognizeAnnotationDraftButton: document.querySelector(
    "#recognizeAnnotationDraftButton"
  ),
  annotationEditBar: document.querySelector("#annotationEditBar"),
  cancelAnnotationEditButton: document.querySelector(
    "#cancelAnnotationEditButton"
  ),
  saveAnnotationEditButton: document.querySelector(
    "#saveAnnotationEditButton"
  ),
  annotationSearchInput: document.querySelector("#annotationSearchInput"),
  annotationSearchCount: document.querySelector("#annotationSearchCount"),
  annotationList: document.querySelector("#annotationList"),
  annotationPagination: document.querySelector("#annotationPagination"),
  researchNoteInput: document.querySelector("#researchNoteInput"),
  addResearchNoteButton: document.querySelector("#addResearchNoteButton"),
  researchNoteList: document.querySelector("#researchNoteList"),
  recentChips: document.querySelector("#recentChips"),
  saveNextButton: document.querySelector("#saveNextButton"),
  saveButton: document.querySelector("#saveButton"),
  undoButton: document.querySelector("#undoButton"),
  operationList: document.querySelector("#operationList"),
  operationCount: document.querySelector("#operationCount"),
  statusMessage: document.querySelector("#statusMessage"),
  toast: document.querySelector("#toast"),
  importReviewModal: document.querySelector("#importReviewModal"),
  closeImportReviewButton: document.querySelector("#closeImportReviewButton"),
  closeImportReviewFooterButton: document.querySelector(
    "#closeImportReviewFooterButton"
  ),
  reparseButton: document.querySelector("#reparseButton"),
  confirmReadyButton: document.querySelector("#confirmReadyButton"),
  importReviewList: document.querySelector("#importReviewList"),
  importReadyCount: document.querySelector("#importReadyCount"),
  importNeedsCount: document.querySelector("#importNeedsCount"),
  importUnparsedCount: document.querySelector("#importUnparsedCount"),
  importConfirmedCount: document.querySelector("#importConfirmedCount"),
  folderImportModal: document.querySelector("#folderImportModal"),
  closeFolderImportButton: document.querySelector(
    "#closeFolderImportButton"
  ),
  closeFolderImportFooterButton: document.querySelector(
    "#closeFolderImportFooterButton"
  ),
  folderImportProject: document.querySelector("#folderImportProject"),
  folderImportRecursive: document.querySelector("#folderImportRecursive"),
  folderImportPreserveStructure: document.querySelector(
    "#folderImportPreserveStructure"
  ),
  folderImportConflictPolicy: document.querySelector(
    "#folderImportConflictPolicy"
  ),
  chooseImportSourceFolderButton: document.querySelector(
    "#chooseImportSourceFolderButton"
  ),
  chooseImportSourceFilesButton: document.querySelector(
    "#chooseImportSourceFilesButton"
  ),
  folderImportBrowserPicker: document.querySelector(
    "#folderImportBrowserPicker"
  ),
  folderImportBrowserFilePicker: document.querySelector(
    "#folderImportBrowserFilePicker"
  ),
  globalImportDropOverlay: document.querySelector(
    "#globalImportDropOverlay"
  ),
  folderImportSelectionSummary: document.querySelector(
    "#folderImportSelectionSummary"
  ),
  selectAllFolderImportItems: document.querySelector(
    "#selectAllFolderImportItems"
  ),
  deselectAllFolderImportItems: document.querySelector(
    "#deselectAllFolderImportItems"
  ),
  clearFolderImportItems: document.querySelector(
    "#clearFolderImportItems"
  ),
  folderImportList: document.querySelector("#folderImportList"),
  commitFolderImportButton: document.querySelector(
    "#commitFolderImportButton"
  ),
  textExportModal: document.querySelector("#textExportModal"),
  closeTextExportButton: document.querySelector(
    "#closeTextExportButton"
  ),
  closeTextExportFooterButton: document.querySelector(
    "#closeTextExportFooterButton"
  ),
  textExportProjectFilter: document.querySelector(
    "#textExportProjectFilter"
  ),
  textExportSearchInput: document.querySelector(
    "#textExportSearchInput"
  ),
  textExportFormat: document.querySelector("#textExportFormat"),
  textExportFilename: document.querySelector("#textExportFilename"),
  textExportFolderName: document.querySelector("#textExportFolderName"),
  textExportFolderHint: document.querySelector("#textExportFolderHint"),
  chooseTextExportFolderButton: document.querySelector(
    "#chooseTextExportFolderButton"
  ),
  resetTextExportFolderButton: document.querySelector(
    "#resetTextExportFolderButton"
  ),
  textExportScopeInputs: Array.from(
    document.querySelectorAll("[data-export-scope]")
  ),
  textExportSelectionSummary: document.querySelector(
    "#textExportSelectionSummary"
  ),
  selectVisibleTextExportItems: document.querySelector(
    "#selectVisibleTextExportItems"
  ),
  clearTextExportItems: document.querySelector(
    "#clearTextExportItems"
  ),
  textExportMaterialList: document.querySelector(
    "#textExportMaterialList"
  ),
  downloadTextExportButton: document.querySelector(
    "#downloadTextExportButton"
  ),
  timelineModal: document.querySelector("#timelineModal"),
  closeTimelineButton: document.querySelector("#closeTimelineButton"),
  timelineProjectOptions: document.querySelector("#timelineProjectOptions"),
  selectAllTimelineProjects: document.querySelector(
    "#selectAllTimelineProjects"
  ),
  clearTimelineProjects: document.querySelector("#clearTimelineProjects"),
  timelineKindOptions: Array.from(
    document.querySelectorAll(".timeline-kind-options input")
  ),
  timelineSearchInput: document.querySelector("#timelineSearchInput"),
  timelineOrderButtons: Array.from(
    document.querySelectorAll("[data-timeline-order]")
  ),
  timelineItemCount: document.querySelector("#timelineItemCount"),
  timelineYearRange: document.querySelector("#timelineYearRange"),
  timelineUndatedCount: document.querySelector("#timelineUndatedCount"),
  timelineSelectionSummary: document.querySelector(
    "#timelineSelectionSummary"
  ),
  timelineList: document.querySelector("#timelineList"),
  historyModal: document.querySelector("#historyModal"),
  closeHistoryButton: document.querySelector("#closeHistoryButton"),
  historySearchInput: document.querySelector("#historySearchInput"),
  historyRecordCount: document.querySelector("#historyRecordCount"),
  historyRecordList: document.querySelector("#historyRecordList"),
  floatingReader: document.querySelector("#floatingReader"),
  floatingReaderHeader: document.querySelector("#floatingReaderHeader"),
  floatingReaderTitle: document.querySelector("#floatingReaderTitle"),
  floatingReaderFontDown: document.querySelector("#floatingReaderFontDown"),
  floatingReaderFontValue: document.querySelector("#floatingReaderFontValue"),
  floatingReaderFontUp: document.querySelector("#floatingReaderFontUp"),
  pinFloatingReaderButton: document.querySelector(
    "#pinFloatingReaderButton"
  ),
  closeFloatingReaderButton: document.querySelector(
    "#closeFloatingReaderButton"
  ),
  floatingReaderText: document.querySelector("#floatingReaderText"),
  annotationFloatingEditor: document.querySelector(
    "#annotationFloatingEditor"
  ),
  annotationFloatingEditorHeader: document.querySelector(
    "#annotationFloatingEditorHeader"
  ),
  annotationFloatingEditorRecord: document.querySelector(
    "#annotationFloatingEditorRecord"
  ),
  annotationFloatingEditorText: document.querySelector(
    "#annotationFloatingEditorText"
  ),
  annotationFloatingFontDown: document.querySelector(
    "#annotationFloatingFontDown"
  ),
  annotationFloatingFontValue: document.querySelector(
    "#annotationFloatingFontValue"
  ),
  annotationFloatingFontUp: document.querySelector(
    "#annotationFloatingFontUp"
  ),
  annotationFloatingBold: document.querySelector("#annotationFloatingBold"),
  annotationFloatingTranslation: document.querySelector(
    "#annotationFloatingTranslation"
  ),
  deleteAnnotationFloatingEditor: document.querySelector(
    "#deleteAnnotationFloatingEditor"
  ),
  closeAnnotationFloatingEditor: document.querySelector(
    "#closeAnnotationFloatingEditor"
  ),
  annotationFloatingSyncStatus: document.querySelector(
    "#annotationFloatingSyncStatus"
  ),
  annotationRecordModal: document.querySelector("#annotationRecordModal"),
  annotationRecordTitle: document.querySelector("#annotationRecordTitle"),
  annotationRecordEditor: document.querySelector("#annotationRecordEditor"),
  annotationRecordEditorStatus: document.querySelector(
    "#annotationRecordEditorStatus"
  ),
  closeAnnotationRecordModal: document.querySelector(
    "#closeAnnotationRecordModal"
  ),
  cancelAnnotationRecordEdit: document.querySelector(
    "#cancelAnnotationRecordEdit"
  ),
  saveAnnotationRecordEdit: document.querySelector(
    "#saveAnnotationRecordEdit"
  ),
};

function normalizedColorTheme(value) {
  return Object.hasOwn(COLOR_THEME_LABELS, value) ? value : "cyan";
}

function storedColorTheme() {
  try {
    return normalizedColorTheme(
      window.localStorage.getItem(COLOR_THEME_KEY) ||
        window.localStorage.getItem(
          "historical-workbench-color-theme-v86"
        ) ||
        window.localStorage.getItem(
          "historical-workbench-color-theme-v85"
        ) ||
        window.localStorage.getItem(
          "historical-workbench-color-theme-v84"
        ) ||
        window.localStorage.getItem(
          "historical-workbench-color-theme-v83"
        ) ||
        window.localStorage.getItem(
          "historical-workbench-color-theme-v82"
        ) ||
        window.localStorage.getItem(
          "historical-workbench-color-theme-v81"
        ) ||
        "cyan"
    );
  } catch {
    return "cyan";
  }
}

function applyColorTheme(value, persist = false) {
  const theme = normalizedColorTheme(value);
  const nextTheme = theme === "cyan" ? "blue" : "cyan";
  document.documentElement.dataset.colorTheme = theme;
  elements.colorThemeButtonLabel.textContent = COLOR_THEME_LABELS[theme];
  elements.colorThemeButton.title =
    `当前${COLOR_THEME_LABELS[theme]}，点击切换为${COLOR_THEME_LABELS[nextTheme]}`;
  elements.colorThemeButton.setAttribute(
    "aria-label",
    `当前${COLOR_THEME_LABELS[theme]}，点击切换为${COLOR_THEME_LABELS[nextTheme]}`
  );
  if (persist) {
    try {
      window.localStorage.setItem(COLOR_THEME_KEY, theme);
    } catch {
      // 浏览器阻止本地偏好存储时，当前页面仍然可以继续使用所选配色。
    }
  }
  refreshFloatingReaderTheme();
}

if (
  elements.sharedEngineSettingsMount &&
  elements.ocrEngineSettingsDisclosure
) {
  elements.sharedEngineSettingsMount.append(
    elements.ocrEngineSettingsDisclosure,
    elements.ocrReferenceDisclosure
  );
}

if (
  elements.translationEngineSettingsMount &&
  elements.translationEngineSettingsBlock
) {
  elements.translationEngineSettingsMount.append(
    elements.translationEngineSettingsBlock
  );
}

const TEXT_FORMAT_KEY = "historical-workbench-text-format-v87";
const TEXT_FONT_MIN = 12;
const TEXT_FONT_MAX = 28;
const TEXT_FONT_DEFAULT = 14;
let generatedTextFormatId = 0;

function normalizedTextFontSize(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return TEXT_FONT_DEFAULT;
  return Math.min(TEXT_FONT_MAX, Math.max(TEXT_FONT_MIN, Math.round(numeric)));
}

function textFormatPreferences() {
  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(TEXT_FORMAT_KEY) ||
        window.localStorage.getItem("historical-workbench-text-format-v86") ||
        window.localStorage.getItem("historical-workbench-text-format-v85") ||
        window.localStorage.getItem("historical-workbench-text-format-v84") ||
        window.localStorage.getItem("historical-workbench-text-format-v83") ||
        window.localStorage.getItem("historical-workbench-text-format-v82") ||
        window.localStorage.getItem("historical-workbench-text-format-v81") ||
        window.localStorage.getItem("historical-workbench-text-format-v80") ||
        window.localStorage.getItem("historical-workbench-text-format-v79") ||
        window.localStorage.getItem("historical-workbench-text-format-v78") ||
        window.localStorage.getItem("historical-workbench-text-format-v77") ||
        window.localStorage.getItem("historical-workbench-text-format-v76") ||
        window.localStorage.getItem("historical-workbench-text-format-v75") ||
        window.localStorage.getItem("historical-workbench-text-format-v74") ||
        window.localStorage.getItem("historical-workbench-text-format-v73") ||
        window.localStorage.getItem("historical-workbench-text-format-v72") ||
        window.localStorage.getItem("historical-workbench-text-format-v71") ||
        window.localStorage.getItem("historical-workbench-text-format-v70") ||
        window.localStorage.getItem("historical-workbench-text-format-v69") ||
        window.localStorage.getItem("historical-workbench-text-format-v68") ||
        window.localStorage.getItem("historical-workbench-text-format-v67") ||
        window.localStorage.getItem("historical-workbench-text-format-v66") ||
        window.localStorage.getItem("historical-workbench-text-format-v65") ||
        window.localStorage.getItem("historical-workbench-text-format-v64") ||
        window.localStorage.getItem("historical-workbench-text-format-v63") ||
        window.localStorage.getItem("historical-workbench-text-format-v62") ||
        window.localStorage.getItem("historical-workbench-text-format-v61") ||
        window.localStorage.getItem("historical-workbench-text-format-v60") ||
        window.localStorage.getItem("historical-workbench-text-format-v59") ||
        window.localStorage.getItem("historical-workbench-text-format-v56") ||
        window.localStorage.getItem("historical-workbench-text-format-v55") ||
        window.localStorage.getItem("historical-workbench-text-format-v54") ||
        window.localStorage.getItem("historical-workbench-text-format-v53") ||
        window.localStorage.getItem("historical-workbench-text-format-v52") ||
        window.localStorage.getItem("historical-workbench-text-format-v51") ||
        window.localStorage.getItem("historical-workbench-text-format-v50")
    );
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveTextFormatPreference(key, value) {
  try {
    const preferences = textFormatPreferences();
    preferences[key] = value;
    window.localStorage.setItem(TEXT_FORMAT_KEY, JSON.stringify(preferences));
  } catch {
    // 浏览器拒绝本地偏好写入时，当前页面仍保留设置。
  }
}

function textFormatTargetKey(target) {
  if (target.dataset.textFormatKey) return target.dataset.textFormatKey;
  const dataKey = Array.from(target.attributes || [])
    .filter((attribute) => attribute.name.startsWith("data-"))
    .map((attribute) => `${attribute.name}:${attribute.value}`)
    .join("|");
  const key =
    target.id ||
    dataKey ||
    `generated-${target.tagName.toLowerCase()}-${generatedTextFormatId++}`;
  target.dataset.textFormatKey = key;
  return key;
}

const richTextSelectionRanges = new WeakMap();

function rememberRichTextSelection(editor) {
  if (!editor) return null;
  const selection = window.getSelection();
  if (!selection?.rangeCount) return null;
  const range = selection.getRangeAt(0);
  if (
    range.collapsed ||
    !editor.contains(range.startContainer) ||
    !editor.contains(range.endContainer)
  ) {
    return null;
  }
  const savedRange = range.cloneRange();
  richTextSelectionRanges.set(editor, savedRange);
  return savedRange;
}

function restoreRichTextSelection(editor) {
  if (!editor) return null;
  const selection = window.getSelection();
  let currentRange = rememberRichTextSelection(editor);
  if (!currentRange) {
    const savedRange = richTextSelectionRanges.get(editor);
    try {
      if (
        savedRange &&
        editor.contains(savedRange.startContainer) &&
        editor.contains(savedRange.endContainer)
      ) {
        currentRange = savedRange.cloneRange();
      }
    } catch {
      currentRange = null;
    }
  }
  editor.focus();
  if (!currentRange || currentRange.collapsed) {
    const fullRange = document.createRange();
    fullRange.selectNodeContents(editor);
    selection.removeAllRanges();
    selection.addRange(fullRange);
    currentRange = fullRange;
  } else {
    selection.removeAllRanges();
    selection.addRange(currentRange);
  }
  return currentRange;
}

function setImportantFontSize(element, size) {
  if (!element) return;
  element.style.setProperty(
    "font-size",
    `${normalizedTextFontSize(size)}px`,
    "important"
  );
}

function selectedRichTextNodes(editor, range) {
  if (!editor || !range) return [];
  const nodes = [];
  const walker = document.createTreeWalker(
    editor,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node.nodeValue?.length) return NodeFilter.FILTER_REJECT;
        try {
          return range.intersectsNode(node)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        } catch {
          return NodeFilter.FILTER_REJECT;
        }
      },
    }
  );
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}

function selectedRichTextFontSize(editor, fallback = TEXT_FONT_DEFAULT) {
  const range =
    rememberRichTextSelection(editor) ||
    richTextSelectionRanges.get(editor);
  const node = selectedRichTextNodes(editor, range)[0];
  if (!node) return normalizedTextFontSize(fallback);
  const parent = node.parentElement;
  return normalizedTextFontSize(
    parent?.dataset?.richSize ||
      Number.parseFloat(parent?.style?.fontSize) ||
      Number.parseFloat(window.getComputedStyle(parent || editor).fontSize) ||
      fallback
  );
}

function richTextNodeIsBold(node) {
  const parent = node?.parentElement;
  if (!parent) return false;
  if (parent.dataset.richBold === "true") return true;
  if (parent.dataset.richBold === "false") return false;
  const weight = window.getComputedStyle(parent).fontWeight.toLowerCase();
  return weight === "bold" || Number.parseInt(weight, 10) >= 600;
}

function applyRichTextSelectionFormat(editor, changes = {}) {
  if (!editor) return false;
  const range = restoreRichTextSelection(editor);
  const nodes = selectedRichTextNodes(editor, range);
  if (!nodes.length) return false;
  const requestedSize =
    changes.size === undefined
      ? null
      : normalizedTextFontSize(changes.size);
  const requestedColor =
    changes.color === undefined ? null : richColorName(changes.color);
  const requestedBold =
    changes.bold === "toggle"
      ? !nodes.every(richTextNodeIsBold)
      : changes.bold === undefined
        ? null
        : Boolean(changes.bold);
  const wrappers = [];
  for (let index = nodes.length - 1; index >= 0; index -= 1) {
    const node = nodes[index];
    const length = node.nodeValue.length;
    const start =
      range.startContainer === node
        ? Math.min(length, Math.max(0, range.startOffset))
        : 0;
    const end =
      range.endContainer === node
        ? Math.min(length, Math.max(0, range.endOffset))
        : length;
    if (end <= start) continue;
    let selectedNode = node;
    if (end < length) selectedNode.splitText(end);
    if (start > 0) selectedNode = selectedNode.splitText(start);
    const wrapper = document.createElement("span");
    if (requestedSize !== null) {
      wrapper.dataset.richSize = String(requestedSize);
      setImportantFontSize(wrapper, requestedSize);
    }
    if (requestedColor !== null) {
      wrapper.dataset.richColor = requestedColor;
      wrapper.classList.add(`rich-color-${requestedColor}`);
      wrapper.style.setProperty(
        "color",
        RICH_TEXT_COLOR_HEX[requestedColor],
        "important"
      );
    }
    if (requestedBold !== null) {
      wrapper.dataset.richBold = String(requestedBold);
      wrapper.style.setProperty(
        "font-weight",
        requestedBold ? "700" : "400",
        "important"
      );
    }
    selectedNode.parentNode.insertBefore(wrapper, selectedNode);
    wrapper.appendChild(selectedNode);
    wrappers[index] = wrapper;
  }
  const formatted = wrappers.filter(Boolean);
  if (!formatted.length) return false;
  const formattedRange = document.createRange();
  formattedRange.setStartBefore(formatted[0]);
  formattedRange.setEndAfter(formatted[formatted.length - 1]);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(formattedRange);
  richTextSelectionRanges.set(editor, formattedRange.cloneRange());
  return true;
}

function applyRichTextSize(editor, size) {
  return applyRichTextSelectionFormat(editor, { size });
}

function wholeEditorFormat(editor) {
  const firstSegment = editor.querySelector("[data-rich-color]");
  return {
    size: normalizedTextFontSize(
      editor.dataset.wholeFontSize ||
        Number.parseFloat(firstSegment?.style?.fontSize) ||
        14
    ),
    bold:
      editor.dataset.wholeBold === "true" ||
      firstSegment?.dataset?.richBold === "true",
    color: richColorName(
      editor.dataset.wholeColor ||
        firstSegment?.dataset?.richColor ||
        firstSegment?.style?.color ||
        "black"
    ),
  };
}

function applyWholeRichTextFormat(editor, changes = {}) {
  const current = wholeEditorFormat(editor);
  const next = {
    size:
      changes.size === undefined
        ? current.size
        : normalizedTextFontSize(changes.size),
    bold: changes.bold === undefined ? current.bold : Boolean(changes.bold),
    color:
      changes.color === undefined
        ? current.color
        : richColorName(changes.color),
  };
  editor.dataset.wholeFontSize = String(next.size);
  editor.dataset.wholeBold = String(next.bold);
  editor.dataset.wholeColor = next.color;
  setImportantFontSize(editor, next.size);
  editor.style.fontWeight = next.bold ? "700" : "400";
  editor.style.color = RICH_TEXT_COLOR_HEX[next.color];
  editor.querySelectorAll("span, font, b, strong").forEach((element) => {
    element.dataset.richSize = String(next.size);
    element.dataset.richBold = String(next.bold);
    element.dataset.richColor = next.color;
    element.classList.remove("rich-color-black", "rich-color-red", "rich-color-blue");
    element.classList.add(`rich-color-${next.color}`);
    setImportantFontSize(element, next.size);
    element.style.fontWeight = next.bold ? "700" : "400";
    element.style.color = RICH_TEXT_COLOR_HEX[next.color];
  });
  return next;
}

function createTextFormatToolbar(target) {
  if (
    !target ||
    target.hasAttribute("data-no-text-format") ||
    target.dataset.textFormatReady === "true"
  ) {
    return;
  }
  target.dataset.textFormatReady = "true";
  const wholeRich = false;
  const rich = target.matches('[contenteditable="true"][role="textbox"]');
  target.dataset.textFormatMode = rich
    ? "mixed-rich"
    : wholeRich
      ? "whole-rich"
      : "whole-plain";
  const key = textFormatTargetKey(target);
  const stored = textFormatPreferences()[key] || {};
  const initialWholeRich = wholeRich ? wholeEditorFormat(target) : null;
  let size = normalizedTextFontSize(stored.size ?? initialWholeRich?.size);
  let bold =
    stored.bold === undefined
      ? Boolean(initialWholeRich?.bold)
      : Boolean(stored.bold);
  let color = richColorName(stored.color || initialWholeRich?.color || "black");
  if (wholeRich) {
    applyWholeRichTextFormat(target, { size, bold, color });
  } else if (!rich) {
    setImportantFontSize(target, size);
    target.style.fontWeight = bold ? "700" : "400";
  }
  const toolbar = document.createElement("div");
  toolbar.className = "text-format-toolbar";
  toolbar.setAttribute(
    "aria-label",
    rich ? "所选文字字号与粗体" : "当前文本框整框字号与粗体"
  );
  toolbar.innerHTML = `
    <span>${rich ? "所选文字" : "本框文字"}</span>
    <button type="button" data-text-size-down aria-label="缩小字号">A−</button>
    <strong data-text-size-value>${size}px</strong>
    <button type="button" data-text-size-up aria-label="放大字号">A＋</button>
    <button type="button" data-text-bold aria-label="切换粗体">B</button>
    ${
      rich
        ? `<button type="button" class="rich-color-button red" data-text-color="red" aria-label="所选文字设为红色">红</button>
           <button type="button" class="rich-color-button blue" data-text-color="blue" aria-label="所选文字设为蓝色">蓝</button>
           <button type="button" class="rich-color-button black" data-text-color="black" aria-label="所选文字设为黑色">黑</button>`
        : ""
    }
  `;
  target.before(toolbar);
  toolbar.addEventListener("pointerdown", (event) => {
    rememberRichTextSelection(target);
    event.preventDefault();
  });
  const render = () => {
    toolbar.querySelector("[data-text-size-value]").textContent = `${size}px`;
    toolbar.querySelector("[data-text-size-down]").disabled =
      size <= TEXT_FONT_MIN;
    toolbar.querySelector("[data-text-size-up]").disabled =
      size >= TEXT_FONT_MAX;
    toolbar
      .querySelector("[data-text-bold]")
      .classList.toggle("active", !rich && bold);
  };
  const setSize = (nextSize) => {
    size = normalizedTextFontSize(nextSize);
    if (rich) applyRichTextSize(target, size);
    else if (wholeRich) {
      const current = applyWholeRichTextFormat(target, { size });
      bold = current.bold;
      color = current.color;
      saveTextFormatPreference(key, current);
    } else {
      setImportantFontSize(target, size);
      saveTextFormatPreference(key, { size, bold });
    }
    render();
    target.dispatchEvent(new Event("input", { bubbles: true }));
  };
  toolbar
    .querySelector("[data-text-size-down]")
    .addEventListener("click", () =>
      setSize(rich ? selectedRichTextFontSize(target, size) - 1 : size - 1)
    );
  toolbar
    .querySelector("[data-text-size-up]")
    .addEventListener("click", () =>
      setSize(rich ? selectedRichTextFontSize(target, size) + 1 : size + 1)
    );
  toolbar.querySelector("[data-text-bold]").addEventListener("click", () => {
    if (rich) {
      applyRichTextSelectionFormat(target, { bold: "toggle" });
      target.dispatchEvent(new Event("input", { bubbles: true }));
    } else if (wholeRich) {
      bold = !bold;
      const current = applyWholeRichTextFormat(target, { bold });
      size = current.size;
      color = current.color;
      saveTextFormatPreference(key, current);
      render();
    } else {
      bold = !bold;
      target.style.fontWeight = bold ? "700" : "400";
      saveTextFormatPreference(key, { size, bold });
      render();
    }
  });
  toolbar.querySelectorAll("[data-text-color]").forEach((button) => {
    button.addEventListener("click", () => {
      applyRichTextColor(target, button.dataset.textColor);
      target.dispatchEvent(new Event("input", { bubbles: true }));
    });
  });
  render();
}

function enhanceTextEditors(root = document) {
  const editableTextSelector =
    'textarea:not([readonly]):not([data-no-text-format]), [contenteditable="true"][role="textbox"]:not([data-no-text-format])';
  const targets = [];
  if (
    root instanceof Element &&
    root.matches(editableTextSelector)
  ) {
    targets.push(root);
  }
  if (root.querySelectorAll) {
    targets.push(...root.querySelectorAll(editableTextSelector));
  }
  targets.forEach(createTextFormatToolbar);
}

enhanceTextEditors();
new MutationObserver((mutations) => {
  mutations.forEach((mutation) =>
    mutation.addedNodes.forEach((node) => {
      if (node instanceof Element) enhanceTextEditors(node);
    })
  );
}).observe(document.body, { childList: true, subtree: true });

const AI_CHAT_FONT_KEY = "historical-workbench-ai-chat-font-v87";
const AI_CHAT_FONT_MIN = 12;
const AI_CHAT_FONT_MAX = 32;
const AI_CHAT_FONT_DEFAULT = 16;

function normalizedAiChatFontSize(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return AI_CHAT_FONT_DEFAULT;
  return Math.min(
    AI_CHAT_FONT_MAX,
    Math.max(AI_CHAT_FONT_MIN, Math.round(numeric))
  );
}

function storedAiChatFontSize() {
  try {
    return normalizedAiChatFontSize(
      window.localStorage.getItem(AI_CHAT_FONT_KEY) ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v86") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v85") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v84") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v83") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v82") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v81") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v80") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v79") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v78") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v77") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v76") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v75") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v74") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v73") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v72") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v71") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v70") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v69") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v68") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v67") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v66") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v65") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v64") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v63") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v62") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v61") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v60") ||
        window.localStorage.getItem("historical-workbench-ai-chat-font-v59")
    );
  } catch {
    return AI_CHAT_FONT_DEFAULT;
  }
}

let aiChatFontSize = storedAiChatFontSize();

function renderAiChatFontSize() {
  aiChatFontSize = normalizedAiChatFontSize(aiChatFontSize);
  elements.aiChatMessages.style.setProperty(
    "--ai-chat-font-size",
    `${aiChatFontSize}px`
  );
  elements.aiChatFontSize.value = String(aiChatFontSize);
  elements.aiChatFontDown.disabled = aiChatFontSize <= AI_CHAT_FONT_MIN;
  elements.aiChatFontUp.disabled = aiChatFontSize >= AI_CHAT_FONT_MAX;
}

function setAiChatFontSize(value) {
  aiChatFontSize = normalizedAiChatFontSize(value);
  try {
    window.localStorage.setItem(AI_CHAT_FONT_KEY, String(aiChatFontSize));
  } catch {
    // 浏览器拒绝本地偏好写入时，当前页面仍保留设置。
  }
  renderAiChatFontSize();
}

const OCR_REFERENCE_FONT_KEY =
  "historical-workbench-ocr-reference-font-v87";
const FLOATING_READER_FONT_KEY =
  "historical-workbench-floating-reader-font-v87";
let ocrReferenceFontSize = normalizedTextFontSize(
  window.localStorage.getItem(OCR_REFERENCE_FONT_KEY) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v86"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v85"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v84"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v83"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v82"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v81"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v80"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v79"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v78"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v77"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v76"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v75"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v74"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v73"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v72"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v71"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v70"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v69"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v68"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v67"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v66"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v65"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v64"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v63"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v62"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v61"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v60"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v59"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v58"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v57"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v56"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v55"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v54"
    ) ||
    window.localStorage.getItem(
      "historical-workbench-ocr-reference-font-v53"
    ) ||
    14
);

function renderOcrReferenceFontSize() {
  setImportantFontSize(elements.ocrReferenceText, ocrReferenceFontSize);
  elements.ocrReferenceFontValue.textContent = `${ocrReferenceFontSize}px`;
  elements.ocrReferenceFontDownButton.disabled =
    ocrReferenceFontSize <= TEXT_FONT_MIN;
  elements.ocrReferenceFontUpButton.disabled =
    ocrReferenceFontSize >= TEXT_FONT_MAX;
}

function changeOcrReferenceFontSize(delta) {
  ocrReferenceFontSize = normalizedTextFontSize(
    ocrReferenceFontSize + delta
  );
  try {
    window.localStorage.setItem(
      OCR_REFERENCE_FONT_KEY,
      String(ocrReferenceFontSize)
    );
  } catch {
    // 当前页面仍会保留字号。
  }
  renderOcrReferenceFontSize();
}

let floatingReaderState = {
  title: "悬浮阅读",
  source: "已保存文本",
  text: "",
  fontSize: normalizedTextFontSize(
    window.localStorage.getItem(FLOATING_READER_FONT_KEY) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v86"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v85"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v84"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v83"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v82"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v81"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v80"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v79"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v78"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v77"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v76"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v75"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v74"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v73"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v72"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v71"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v70"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v69"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v68"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v67"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v66"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v65"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v64"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v63"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v62"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v61"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v60"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v59"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v58"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v57"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v56"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v55"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v54"
      ) ||
      window.localStorage.getItem(
        "historical-workbench-floating-reader-font-v53"
      ) ||
      16
  ),
  dragging: false,
  pointerId: null,
  startX: 0,
  startY: 0,
  originLeft: 0,
  originTop: 0,
  pipWindow: null,
  defaultHeight: 240,
  readerId: "",
  edit: WorkbenchUiRules.createFloatingReaderEditState(),
  saveTimer: null,
};

let annotationFloatingEditorState = {
  annotationId: "",
  dragging: false,
  pointerId: null,
  startX: 0,
  startY: 0,
  originLeft: 0,
  originTop: 0,
  syncTimer: null,
  dirty: false,
  saving: false,
  queued: false,
  translating: false,
};
let annotationRecordEditorState = {
  annotationId: "",
  originalRichText: [],
  saving: false,
};
let annotationFloatingFormatSize = 14;

function renderAnnotationFloatingFormatSize() {
  annotationFloatingFormatSize = normalizedTextFontSize(
    annotationFloatingFormatSize
  );
  elements.annotationFloatingFontValue.textContent =
    `${annotationFloatingFormatSize}px`;
  elements.annotationFloatingFontDown.disabled =
    annotationFloatingFormatSize <= TEXT_FONT_MIN;
  elements.annotationFloatingFontUp.disabled =
    annotationFloatingFormatSize >= TEXT_FONT_MAX;
}

function fitAnnotationFloatingEditorHeight(text, recordText = "") {
  const content = String(text || "");
  const record = String(recordText || "");
  const charactersPerLine = 30;
  const visualLines = content
    .split("\n")
    .reduce(
      (total, line) =>
        total + Math.max(1, Math.ceil(Array.from(line).length / charactersPerLine)),
      0
    );
  const recordVisualLines = record
    .split("\n")
    .reduce(
      (total, line) =>
        total + Math.max(1, Math.ceil(Array.from(line).length / charactersPerLine)),
      0
    );
  const desiredHeight = 178 + visualLines * 26 + Math.min(recordVisualLines, 7) * 24;
  elements.annotationFloatingEditor.style.height = `${Math.round(
    Math.min(
      Math.max(230, desiredHeight),
      Math.max(230, Math.min(620, window.innerHeight - 150))
    )
  )}px`;
}

function annotationSystemLabel(annotation, file = selectedFile()) {
  const annotations = Array.isArray(file?.annotations) ? file.annotations : [];
  const index = annotations.findIndex((item) => item.id === annotation?.id);
  return `框选 ${index >= 0 ? index + 1 : 1}`;
}

function annotationRecordEditorDirty() {
  const currentRichText = richEditorSegments(elements.annotationRecordEditor);
  return Boolean(
    annotationRecordEditorState.annotationId &&
      JSON.stringify(currentRichText) !==
        JSON.stringify(annotationRecordEditorState.originalRichText)
  );
}

function openAnnotationRecordEditor(annotationId) {
  const file = selectedFile();
  const annotation = (file?.annotations || []).find(
    (item) => item.id === annotationId
  );
  if (!annotation) return;
  const recordText = String(annotation.text || "");
  setRichEditorSegments(
    elements.annotationRecordEditor,
    annotation.recordRichText,
    recordText
  );
  annotationRecordEditorState = {
    annotationId: annotation.id,
    originalRichText: richEditorSegments(elements.annotationRecordEditor),
    saving: false,
  };
  elements.annotationRecordTitle.textContent = "编辑记录";
  elements.annotationRecordEditorStatus.textContent =
    "记录将完整显示，并可参与搜索";
  elements.annotationRecordModal.classList.remove("hidden");
  elements.annotationRecordEditor.focus({ preventScroll: true });
  const selection = window.getSelection();
  const caretRange = document.createRange();
  caretRange.selectNodeContents(elements.annotationRecordEditor);
  caretRange.collapse(false);
  selection.removeAllRanges();
  selection.addRange(caretRange);
}

async function closeAnnotationRecordEditor(force = false) {
  if (
    !force &&
    annotationRecordEditorDirty() &&
    !(await confirmAction("框选记录尚未保存，确定关闭编辑窗口吗？"))
  ) {
    return;
  }
  annotationRecordEditorState = {
    annotationId: "",
    originalRichText: [],
    saving: false,
  };
  elements.annotationRecordModal.classList.add("hidden");
}

async function saveAnnotationRecordEditor() {
  const annotationId = annotationRecordEditorState.annotationId;
  if (!annotationId || annotationRecordEditorState.saving) return;
  const richText = richEditorSegments(elements.annotationRecordEditor);
  const text = richTextPlain(richText).trim();
  if (!text) {
    elements.annotationRecordEditorStatus.textContent = "框选记录不能为空";
    elements.annotationRecordEditor.focus();
    return;
  }
  annotationRecordEditorState.saving = true;
  elements.saveAnnotationRecordEdit.disabled = true;
  elements.annotationRecordEditorStatus.textContent = "正在保存…";
  const saved = await saveAnnotationRecord(annotationId, text, richText);
  annotationRecordEditorState.saving = false;
  elements.saveAnnotationRecordEdit.disabled = false;
  if (!saved) {
    elements.annotationRecordEditorStatus.textContent = "保存未完成，请重试";
    return;
  }
  if (annotationFloatingEditorState.annotationId === annotationId) {
    elements.annotationFloatingEditorRecord.innerHTML = richTextHtml(
      richText,
      text
    );
  }
  await closeAnnotationRecordEditor(true);
}

function openAnnotationFloatingEditor(annotationId) {
  const file = selectedFile();
  const annotation = (file?.annotations || []).find(
    (item) => item.id === annotationId
  );
  if (!annotation) return;
  annotationFloatingEditorState.annotationId = annotation.id;
  elements.annotationFloatingEditorRecord.innerHTML = richTextHtml(
    annotation.recordRichText,
    annotation.text || "未填写框选记录"
  );
  window.clearTimeout(annotationFloatingEditorState.syncTimer);
  annotationFloatingEditorState.syncTimer = null;
  annotationFloatingEditorState.dirty = false;
  annotationFloatingEditorState.queued = false;
  annotationFloatingEditorState.translating = false;
  if (elements.annotationFloatingSyncStatus) {
    elements.annotationFloatingSyncStatus.textContent = "已同步";
  }
  elements.annotationFloatingEditorText.dataset.textFormatMode = "mixed-rich";
  setRichEditorSegments(
    elements.annotationFloatingEditorText,
    annotationOcrDisplayEntry(annotation, file)?.correctedRichText,
    annotationOcrDisplayText(annotation, file)
  );
  fitAnnotationFloatingEditorHeight(
    annotationOcrDisplayText(annotation, file),
    annotation.text
  );
  renderAnnotationFloatingFormatSize();
  elements.annotationFloatingTranslation.classList.remove("hidden");
  elements.annotationFloatingTranslation.disabled = false;
  elements.annotationFloatingTranslation.textContent = "AI 翻译";
  elements.annotationFloatingEditor.classList.remove("hidden");
  elements.annotationFloatingEditorText.focus({ preventScroll: true });
}

async function closeAnnotationFloatingEditorWindow() {
  await syncAnnotationFloatingEditorText(true);
  annotationFloatingEditorState.annotationId = "";
  annotationFloatingEditorState.dragging = false;
  annotationFloatingEditorState.pointerId = null;
  window.clearTimeout(annotationFloatingEditorState.syncTimer);
  annotationFloatingEditorState.syncTimer = null;
  annotationFloatingEditorState.dirty = false;
  annotationFloatingEditorState.queued = false;
  annotationFloatingEditorState.translating = false;
  elements.annotationFloatingEditor.classList.add("hidden");
}

function queueAnnotationFloatingEditorSync() {
  if (!annotationFloatingEditorState.annotationId) return;
  annotationFloatingEditorState.dirty = true;
  if (elements.annotationFloatingSyncStatus) {
    elements.annotationFloatingSyncStatus.textContent = "正在同步…";
  }
  window.clearTimeout(annotationFloatingEditorState.syncTimer);
  annotationFloatingEditorState.syncTimer = window.setTimeout(() => {
    syncAnnotationFloatingEditorText();
  }, 650);
}

async function syncAnnotationFloatingEditorText(force = false) {
  const annotationId = annotationFloatingEditorState.annotationId;
  if (!annotationId || (!force && !annotationFloatingEditorState.dirty)) return;
  if (annotationFloatingEditorState.saving || appState.busy) {
    annotationFloatingEditorState.queued = true;
    if (!force) {
      window.clearTimeout(annotationFloatingEditorState.syncTimer);
      annotationFloatingEditorState.syncTimer = window.setTimeout(() => {
        syncAnnotationFloatingEditorText();
      }, 500);
    }
    return;
  }
  window.clearTimeout(annotationFloatingEditorState.syncTimer);
  annotationFloatingEditorState.syncTimer = null;
  const richText = richEditorSegments(elements.annotationFloatingEditorText);
  const text = richTextPlain(richText).trim();
  if (!text) {
    if (elements.annotationFloatingSyncStatus) {
      elements.annotationFloatingSyncStatus.textContent = "内容不能为空";
    }
    return;
  }
  annotationFloatingEditorState.dirty = false;
  annotationFloatingEditorState.saving = true;
  const saved = await saveAnnotationContent(annotationId, text, richText, {
    silent: true,
  });
  annotationFloatingEditorState.saving = false;
  if (saved && elements.annotationFloatingSyncStatus) {
    elements.annotationFloatingSyncStatus.textContent = "已同步";
  }
  if (annotationFloatingEditorState.queued) {
    annotationFloatingEditorState.queued = false;
    if (annotationFloatingEditorState.dirty) {
      await syncAnnotationFloatingEditorText();
    }
  }
}

async function runAnnotationFloatingTranslation() {
  const annotationId = annotationFloatingEditorState.annotationId;
  const file = selectedFile();
  const annotation = (file?.annotations || []).find(
    (item) => item.id === annotationId
  );
  if (
    !annotationId ||
    !file ||
    !annotation ||
    annotationFloatingEditorState.translating ||
    appState.busy
  ) {
    return;
  }
  const sourceRichText = richEditorSegments(
    elements.annotationFloatingEditorText
  );
  const sourceText = richTextPlain(sourceRichText).trim();
  if (!sourceText) {
    showToast("当前框选没有可翻译的文字", "error");
    return;
  }
  const engine = elements.translationEngineSelect.value || "argos";
  const consent =
    !isCloudTranslationEngine(engine) ||
    (await confirmAction(
      `确认将当前框选文字发送给${translationEngineLabel(
        engine
      )}进行翻译？`
    ));
  if (!consent) return;

  annotationFloatingEditorState.translating = true;
  elements.annotationFloatingTranslation.disabled = true;
  elements.annotationFloatingTranslation.textContent = "翻译中…";
  if (elements.annotationFloatingSyncStatus) {
    elements.annotationFloatingSyncStatus.textContent = "正在 AI 翻译…";
  }
  setStatus(`正在使用${translationEngineLabel(engine)}翻译框选文本…`);
  try {
    await syncAnnotationFloatingEditorText(true);
    const result = await translateTextUsingEngine(
      sourceText,
      engine,
      elements.translationSourceLanguage.value,
      elements.translationTargetLanguage.value,
      consent
    );
    const resultText = String(result.text || "").trim();
    if (!resultText) throw new Error("翻译结果为空");
    const resultRichText = [
      {
        text: resultText,
        color: "black",
        size: 14,
        bold: false,
      },
    ];
    appState.pendingAnnotationTranslations.set(annotationId, {
      recordId: file.id,
      annotationId,
      sourceText,
      sourceRichText,
      sourceLanguage: elements.translationSourceLanguage.value,
      targetLanguage: elements.translationTargetLanguage.value,
      engine: result.engine || engine,
      model: String(result.model || ""),
    });
    if (annotationFloatingEditorState.annotationId === annotationId) {
      setRichEditorSegments(
        elements.annotationFloatingEditorText,
        resultRichText,
        resultText
      );
      fitAnnotationFloatingEditorHeight(resultText, annotation.text);
    }
    const saved = await saveAnnotationContent(
      annotationId,
      resultText,
      resultRichText,
      { silent: true }
    );
    if (!saved) throw new Error("译文未能自动保存");
    if (elements.annotationFloatingSyncStatus) {
      elements.annotationFloatingSyncStatus.textContent = "译文已自动保存";
    }
    showToast("框选文本翻译完成，译文已自动保存");
    setStatus("框选翻译前文本与最终译文已成对保存");
  } catch (error) {
    if (elements.annotationFloatingSyncStatus) {
      elements.annotationFloatingSyncStatus.textContent = "AI 翻译未完成";
    }
    showToast(error.message, "error");
    setStatus(`AI 翻译未完成：${error.message}`);
  } finally {
    annotationFloatingEditorState.translating = false;
    elements.annotationFloatingTranslation.disabled = false;
    elements.annotationFloatingTranslation.textContent = "AI 翻译";
  }
}

async function deleteAnnotationFromFloatingEditor() {
  const annotationId = annotationFloatingEditorState.annotationId;
  if (!annotationId) return;
  window.clearTimeout(annotationFloatingEditorState.syncTimer);
  annotationFloatingEditorState.syncTimer = null;
  annotationFloatingEditorState.dirty = false;
  annotationFloatingEditorState.queued = false;
  const deleted = await deleteAnnotation(annotationId);
  if (deleted) {
    annotationFloatingEditorState.annotationId = "";
    elements.annotationFloatingEditor.classList.add("hidden");
  }
}

function floatingReaderDocumentMarkup(documentTarget) {
  documentTarget.body.innerHTML = "";
  const theme = normalizedColorTheme(
    document.documentElement.dataset.colorTheme
  );
  const palette = COLOR_THEME_READER_PALETTES[theme];
  const style = documentTarget.createElement("style");
  style.textContent = `
    *{box-sizing:border-box}
    html,body{width:100%;height:100%;margin:0;overflow:hidden;background:#fff;
      font-family:"Microsoft YaHei","PingFang SC",sans-serif;color:${palette.text}}
    .reader{display:grid;grid-template-rows:auto minmax(0,1fr);height:100%}
    header{display:flex;align-items:center;justify-content:space-between;gap:10px;
      padding:11px 12px;border-bottom:1px solid ${palette.border};background:${palette.header}}
    strong,small{display:block} strong{font-size:13px} small{margin-top:3px;
      color:${palette.muted};font-size:9px}
    .actions{display:flex;align-items:center;gap:5px}
    button{min-height:28px;border:1px solid ${palette.buttonBorder};border-radius:7px;
      padding:4px 8px;color:${palette.buttonText};background:#fff;cursor:pointer;font-weight:700}
    .size{min-width:38px;color:${palette.muted};text-align:center;font-size:9px}
    .text{overflow-y:auto;padding:18px 20px 30px;line-height:1.9;
      white-space:pre-wrap;user-select:text;outline:none}
  `;
  documentTarget.head.appendChild(style);
  const reader = documentTarget.createElement("main");
  reader.className = "reader";
  reader.innerHTML = `
    <header>
      <div><strong data-reader-title></strong></div>
      <div class="actions">
        <button type="button" data-reader-down>A−</button>
        <span class="size" data-reader-size></span>
        <button type="button" data-reader-up>A＋</button>
        <button type="button" data-reader-close>关闭</button>
      </div>
    </header>
    <div class="text" data-reader-text></div>`;
  documentTarget.body.appendChild(reader);
  reader.querySelector("[data-reader-down]").addEventListener("click", () => {
    changeFloatingReaderFontSize(-1);
  });
  reader.querySelector("[data-reader-up]").addEventListener("click", () => {
    changeFloatingReaderFontSize(1);
  });
  reader.querySelector("[data-reader-close]").addEventListener("click", () => {
    floatingReaderState.pipWindow?.close();
  });
  const text = reader.querySelector("[data-reader-text]");
  text.contentEditable = floatingReaderState.edit.editable
    ? "plaintext-only"
    : "false";
  text.addEventListener("input", () => {
    updateFloatingReaderText(text.innerText);
  });
  text.addEventListener("keydown", (event) => {
    handleFloatingReaderUndo(event, text);
  });
  renderFloatingReader();
}

function refreshFloatingReaderTheme() {
  const pipDocument = floatingReaderState?.pipWindow?.document;
  if (!pipDocument) return;
  floatingReaderDocumentMarkup(pipDocument);
}

function renderFloatingReader() {
  elements.floatingReaderTitle.textContent = floatingReaderState.title;
  elements.floatingReaderText.contentEditable = floatingReaderState.edit.editable
    ? "plaintext-only"
    : "false";
  elements.floatingReaderText.setAttribute(
    "aria-readonly",
    String(!floatingReaderState.edit.editable)
  );
  if (document.activeElement !== elements.floatingReaderText) {
    elements.floatingReaderText.textContent = floatingReaderState.text;
  }
  setImportantFontSize(
    elements.floatingReaderText,
    floatingReaderState.fontSize
  );
  elements.floatingReaderFontValue.textContent =
    `${floatingReaderState.fontSize}px`;
  elements.floatingReaderFontDown.disabled =
    floatingReaderState.fontSize <= TEXT_FONT_MIN;
  elements.floatingReaderFontUp.disabled =
    floatingReaderState.fontSize >= TEXT_FONT_MAX;
  const pipDocument = floatingReaderState.pipWindow?.document;
  if (pipDocument) {
    const title = pipDocument.querySelector("[data-reader-title]");
    const text = pipDocument.querySelector("[data-reader-text]");
    const size = pipDocument.querySelector("[data-reader-size]");
    if (title) title.textContent = floatingReaderState.title;
    if (text) {
      text.contentEditable = floatingReaderState.edit.editable
        ? "plaintext-only"
        : "false";
      if (pipDocument.activeElement !== text) {
        text.textContent = floatingReaderState.text;
      }
      setImportantFontSize(text, floatingReaderState.fontSize);
    }
    if (size) size.textContent = `${floatingReaderState.fontSize}px`;
  }
}

function changeFloatingReaderFontSize(delta) {
  floatingReaderState.fontSize = normalizedTextFontSize(
    floatingReaderState.fontSize + delta
  );
  try {
    window.localStorage.setItem(
      FLOATING_READER_FONT_KEY,
      String(floatingReaderState.fontSize)
    );
  } catch {
    // 当前窗口仍会保留字号。
  }
  renderFloatingReader();
  fitFloatingReaderHeight();
}

function floatingReaderDefaultHeight(
  text = floatingReaderState.text,
  fontSize = floatingReaderState.fontSize
) {
  const normalizedText = String(text || "");
  const charactersPerLine = Math.max(
    16,
    Math.floor(470 / Math.max(12, Number(fontSize) * 0.95))
  );
  const visualLines = normalizedText
    .split("\n")
    .reduce(
      (total, line) =>
        total + Math.max(1, Math.ceil(Array.from(line).length / charactersPerLine)),
      0
    );
  const contentHeight =
    94 + visualLines * Number(fontSize) * 1.9 + 28;
  return Math.round(
    Math.min(
      Math.max(170, contentHeight),
      Math.max(170, Math.min(680, window.innerHeight - 130))
    )
  );
}

function fitFloatingReaderHeight() {
  floatingReaderState.defaultHeight = floatingReaderDefaultHeight();
  elements.floatingReader.style.height =
    `${floatingReaderState.defaultHeight}px`;
  const pipWindow = floatingReaderState.pipWindow;
  if (pipWindow?.resizeTo) {
    try {
      pipWindow.resizeTo(520, floatingReaderState.defaultHeight);
    } catch {
      // 浏览器不允许主动调整置顶窗尺寸时，保留操作者当前窗口大小。
    }
  }
}

function floatingReaderEditOptions(options = {}) {
  return WorkbenchUiRules.createFloatingReaderEditState({
    text: options.text,
    editable: options.editable,
    saveText: options.saveText,
  });
}

async function flushFloatingReaderEdit(edit = floatingReaderState.edit) {
  window.clearTimeout(floatingReaderState.saveTimer);
  floatingReaderState.saveTimer = null;
  try {
    return await WorkbenchUiRules.flushFloatingReaderEdit(edit);
  } catch (error) {
    showToast(error.message || "悬浮文本保存未完成", "error");
    return false;
  }
}

function queueFloatingReaderSave() {
  window.clearTimeout(floatingReaderState.saveTimer);
  floatingReaderState.saveTimer = window.setTimeout(() => {
    flushFloatingReaderEdit();
  }, 650);
}

function updateFloatingReaderText(value) {
  if (
    !WorkbenchUiRules.updateFloatingReaderEditText(
      floatingReaderState.edit,
      value
    )
  ) {
    return false;
  }
  floatingReaderState.text = floatingReaderState.edit.text;
  queueFloatingReaderSave();
  return true;
}

function placeFloatingReaderCaretAtEnd(textElement) {
  const selection = textElement?.ownerDocument?.defaultView?.getSelection?.();
  if (!selection) return;
  const range = textElement.ownerDocument.createRange();
  range.selectNodeContents(textElement);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
}

function undoFloatingReaderText(textElement) {
  if (
    !WorkbenchUiRules.undoFloatingReaderEditText(floatingReaderState.edit)
  ) {
    return false;
  }
  floatingReaderState.text = floatingReaderState.edit.text;
  if (textElement) {
    textElement.textContent = floatingReaderState.text;
    textElement.focus();
    placeFloatingReaderCaretAtEnd(textElement);
  }
  renderFloatingReader();
  queueFloatingReaderSave();
  return true;
}

function handleFloatingReaderUndo(event, textElement) {
  if (!WorkbenchUiRules.isFloatingReaderUndoShortcut(event)) return false;
  if (!floatingReaderState.edit.editable) return false;
  event.preventDefault();
  return undoFloatingReaderText(textElement);
}

function openFloatingReader(title, source, text, options = {}) {
  const content = String(text || "").trim();
  if (!content) {
    showToast("当前没有已经保存的文字可供悬浮阅读", "error");
    return;
  }
  floatingReaderState.title = title || "悬浮阅读";
  floatingReaderState.source = source || "已保存文本";
  floatingReaderState.text = content;
  flushFloatingReaderEdit();
  floatingReaderState.readerId = crypto.randomUUID();
  floatingReaderState.edit = floatingReaderEditOptions({
    text: content,
    editable: options.editable,
    saveText: options.saveText,
  });
  renderFloatingReader();
  fitFloatingReaderHeight();
  if (!floatingReaderState.pipWindow) {
    elements.floatingReader.classList.remove("hidden");
  }
}

async function pinFloatingReaderToScreen() {
  if (!floatingReaderState.text) {
    showToast("请先打开一条已保存文字", "error");
    return;
  }
  const desktopBridge = window.historicalWorkbenchDesktop;
  if (typeof desktopBridge?.openFloatingReader === "function") {
    try {
      await desktopBridge.openFloatingReader({
        readerId: floatingReaderState.readerId,
        title: floatingReaderState.title,
        text: floatingReaderState.text,
        fontSize: floatingReaderState.fontSize,
        height: floatingReaderDefaultHeight(),
        alwaysOnTop: true,
        editable: floatingReaderState.edit.editable,
      });
      elements.floatingReader.classList.add("hidden");
      showToast("文字窗口已由桌面版钉在屏幕最前方");
      return;
    } catch (error) {
      showToast(`桌面置顶窗口未能打开：${error.message}`, "error");
    }
  }
  if (!window.documentPictureInPicture?.requestWindow) {
    showToast(
      "当前浏览器不支持跨应用置顶；文字仍会在工作台内保持悬浮",
      "error"
    );
    return;
  }
  try {
    if (floatingReaderState.pipWindow) {
      floatingReaderState.pipWindow.focus();
      return;
    }
    const pipWindow = await window.documentPictureInPicture.requestWindow({
      width: 520,
      height: floatingReaderDefaultHeight(),
    });
    floatingReaderState.pipWindow = pipWindow;
    floatingReaderDocumentMarkup(pipWindow.document);
    elements.floatingReader.classList.add("hidden");
    pipWindow.addEventListener("pagehide", () => {
      floatingReaderState.pipWindow = null;
      elements.floatingReader.classList.remove("hidden");
      renderFloatingReader();
    });
    showToast("文字窗口已钉在屏幕最前方");
  } catch (error) {
    showToast(`无法钉在屏幕：${error.message}`, "error");
  }
}

renderOcrReferenceFontSize();
renderFloatingReader();

const dateInputs = {
  year: elements.yearInput,
  month: elements.monthInput,
  day: elements.dayInput,
};
const dateMenus = {
  year: elements.yearMenu,
  month: elements.monthMenu,
  day: elements.dayMenu,
};
const dateComboboxes = {
  year: elements.yearCombobox,
  month: elements.monthCombobox,
  day: elements.dayCombobox,
};
const dateFieldOrder = ["year", "month", "day"];

let pendingAppConfirmation = null;

function confirmAction(message, options = {}) {
  if (pendingAppConfirmation) pendingAppConfirmation(false);
  const previousFocus = document.activeElement;
  elements.appConfirmMessage.textContent = String(message || "");
  elements.appConfirmAccept.textContent = options.confirmLabel || "确定";
  elements.appConfirmCancel.textContent = options.cancelLabel || "取消";
  elements.appConfirmInput.classList.add("hidden");
  elements.appConfirmModal.classList.remove("hidden");

  return new Promise((resolve) => {
    const finish = (accepted) => {
      if (!pendingAppConfirmation) return;
      pendingAppConfirmation = null;
      elements.appConfirmModal.classList.add("hidden");
      elements.appConfirmAccept.onclick = null;
      elements.appConfirmCancel.onclick = null;
      elements.appConfirmModal.onclick = null;
      document.removeEventListener("keydown", onKeyDown, true);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
      resolve(Boolean(accepted));
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        finish(false);
      } else if (event.key === "Enter") {
        event.preventDefault();
        finish(true);
      }
    };
    pendingAppConfirmation = finish;
    elements.appConfirmAccept.onclick = () => finish(true);
    elements.appConfirmCancel.onclick = () => finish(false);
    elements.appConfirmModal.onclick = (event) => {
      if (event.target === elements.appConfirmModal) finish(false);
    };
    document.addEventListener("keydown", onKeyDown, true);
    elements.appConfirmAccept.focus();
  });
}

function promptAction(message, options = {}) {
  if (pendingAppConfirmation) pendingAppConfirmation(false);
  const previousFocus = document.activeElement;
  elements.appConfirmMessage.textContent = String(message || "");
  elements.appConfirmInput.value = String(options.value || "");
  elements.appConfirmInput.placeholder = String(options.placeholder || "");
  elements.appConfirmInput.classList.remove("hidden");
  elements.appConfirmAccept.textContent = options.confirmLabel || "确定";
  elements.appConfirmCancel.textContent = options.cancelLabel || "取消";
  elements.appConfirmModal.classList.remove("hidden");

  return new Promise((resolve) => {
    const finish = (accepted) => {
      if (!pendingAppConfirmation) return;
      const value = accepted ? elements.appConfirmInput.value : null;
      pendingAppConfirmation = null;
      elements.appConfirmModal.classList.add("hidden");
      elements.appConfirmInput.classList.add("hidden");
      elements.appConfirmAccept.onclick = null;
      elements.appConfirmCancel.onclick = null;
      elements.appConfirmModal.onclick = null;
      document.removeEventListener("keydown", onKeyDown, true);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
      resolve(value);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        finish(false);
      } else if (event.key === "Enter") {
        event.preventDefault();
        finish(true);
      }
    };
    pendingAppConfirmation = finish;
    elements.appConfirmAccept.onclick = () => finish(true);
    elements.appConfirmCancel.onclick = () => finish(false);
    elements.appConfirmModal.onclick = (event) => {
      if (event.target === elements.appConfirmModal) finish(false);
    };
    document.addEventListener("keydown", onKeyDown, true);
    elements.appConfirmInput.focus();
  });
}

let appState = {
  allFiles: [],
  files: [],
  projects: [],
  selectedIndex: -1,
  selectedId: "",
  selectedRelativePath: "",
  library: "",
  libraryId: "",
  hasLibrary: false,
  isTestLibrary: false,
  isFormalLibrary: false,
  isWritableLibrary: false,
  recentDates: [],
  recentPapers: [],
  favoriteWebsiteCategories: [],
  favoriteWebsites: [],
  favoriteWebsiteCategoryFilter: "",
  favoriteWebsiteQuery: "",
  editingFavoriteWebsiteId: "",
  operations: [],
  activeProject: "all",
  activeKind: "source",
  editingKind: "source",
  editingSourceLanguage: "chinese",
  editingPaperType: "journal",
  editingEditionUnit: "版",
  editingIssueUnit: "期",
  searchQuery: "",
  searchKinds: ["source", "paper", "book"],
  busy: false,
  editingStatus: "unread",
  detailsView: "metadata",
  foreignTextMode: "ocr",
  libraryDrawerOpen: false,
  focusReading: false,
  ocrSurface: "corrected",
  engineSettingsPanel: "ocr",
  notesSurface: "annotations",
  aiBuilderOpen: false,
  historyQuery: "",
  screenshotFolder: ".historical-workbench\\screenshots",
  screenshotAnnotationId: "",
  editingTags: [],
  previewKind: "",
  importReview: {
    ready: 0,
    needsReview: 0,
    unparsed: 0,
    confirmed: 0,
    pending: 0,
  },
  batchSelectedFileIds: new Set(),
  batchSelectionAnchorIndex: -1,
  folderImport: {
    token: "",
    sourceFolder: "",
    items: [],
    selectedIds: new Set(),
    capped: false,
    browserFiles: new Map(),
  },
  pendingAnnotationTranslations: new Map(),
  textExportSelectedIds: new Set(),
  textExportDirectoryHandle: null,
  sortMode: "default",
  timelineProjects: [],
  timelineKinds: ["source", "paper", "book"],
  timelineOrder: "asc",
  timelineQuery: "",
  aiSuggestionSelectedIds: new Set(),
  aiSuggestionRecords: [],
  aiSuggestionRunning: false,
  aiSuggestionRightPanel: "records",
  aiChatMessages: [],
  aiChatRunning: false,
  previewUrl: "",
  ocrPage: 1,
  selectedOcrRegionId: "",
  pendingOcr: null,
  ocrReferenceType: "corrected",
  noteReferenceDrafts: [],
  editingResearchNoteId: "",
  ocrCorrectedDirty: false,
  manualCorrectedDraft: false,
  ocrEngine: ["kandian", "baidu"].includes(
    window.localStorage.getItem("historical-workbench-ocr-engine-v87") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v86") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v85") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v84") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v83") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v82") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v81") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v80") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v79") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v78") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v77") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v76") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v75") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v74") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v73") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v72") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v71") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v70") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v69") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v68") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v67") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v66") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v65") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v64") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v63") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v62") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v61") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v60") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v59") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v58") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v57") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v56") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v55") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v54") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v53") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v52") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v51") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v50") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v49") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v48") ||
    window.localStorage.getItem("historical-workbench-ocr-engine-v47") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v46") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v45") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v44") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v43") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v42") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v41")
  )
    ? window.localStorage.getItem("historical-workbench-ocr-engine-v87") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v86") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v85") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v84") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v83") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v82") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v81") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v80") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v79") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v78") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v77") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v76") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v75") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v74") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v73") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v72") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v71") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v70") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v69") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v68") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v67") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v66") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v65") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v64") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v63") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v62") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v61") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v60") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v59") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v58") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v57") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v56") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v55") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v54") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v53") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v52") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v51") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v50") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v49") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v48") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v47") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v46") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v45") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v44") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v43") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v42") ||
      window.localStorage.getItem("historical-workbench-ocr-engine-v41")
    : "umi",
  aiSentenceSettings: {
    configured: false,
    apiKeySaved: false,
    provider: "qwen",
    providerName: "千问",
    protocol: "chat-completions",
    endpoint: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
    authMode: "bearer",
    model: "qwen-plus",
  },
  aiSentenceRecordId: "",
  translationSettings: {
    qwen: {
      configured: false,
      apiKeySaved: false,
      borrowedFromAiSentence: false,
      model: "qwen-plus",
      endpoint: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
      providerName: "千问",
    },
    claude: {
      configured: false,
      apiKeySaved: false,
      borrowedFromAiSentence: false,
      model: "claude-sonnet-5",
      endpoint: "https://api.anthropic.com/v1/messages",
      providerName: "Claude",
    },
    deepseek: {
      configured: false,
      apiKeySaved: false,
      borrowedFromAiSentence: false,
      model: "deepseek-v4-flash",
      endpoint: "https://api.deepseek.com/chat/completions",
      providerName: "DeepSeek",
    },
  },
  argosTranslation: {
    installed: false,
    pairs: [],
    message: "尚未检查 Argos（本机）",
  },
  lastTranslationEngine: "argos",
  lastTranslationModel: "",
  translationRecordId: "",
  pendingMainTextTranslation: null,
  cloudOcrSettings: {
    kandian: {
      configured: false,
      account: "",
      tokenSaved: false,
      detMode: "auto",
      version: "v2",
    },
    baidu: {
      configured: false,
      apiKeySaved: false,
      secretKeySaved: false,
      languageType: "CHN_ENG",
    },
  },
  ocrService: {
    running: false,
    installed: false,
    configured: false,
    message: "尚未检查 OCR 服务",
    checking: false,
  },
};

function renderWorkspaceLayout() {
  document.body.classList.toggle(
    "library-drawer-open",
    appState.libraryDrawerOpen && !appState.focusReading
  );
  document.body.classList.toggle("focus-reading", appState.focusReading);
  elements.libraryDrawerBackdrop.classList.add("hidden");
  elements.workspaceNavButton.setAttribute(
    "aria-expanded",
    String(appState.libraryDrawerOpen)
  );
  elements.focusReadingButton.setAttribute(
    "aria-pressed",
    String(appState.focusReading)
  );
  elements.focusReadingButton.textContent = appState.focusReading
    ? "退出专注"
    : "专注阅读";

  elements.ocrSurfaceButtons.forEach((button) => {
    const active = button.dataset.ocrSurface === appState.ocrSurface;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  elements.ocrSurfacePanels.forEach((panel) => {
    const active = panel.classList.contains(
      `ocr-surface-${appState.ocrSurface}`
    );
    panel.classList.toggle("surface-hidden", !active);
  });

  elements.notesSurfaceButtons.forEach((button) => {
    const active = button.dataset.notesSurface === appState.notesSurface;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll(".notes-writing-reference")
    .forEach((panel) => {
      panel.classList.toggle(
        "surface-hidden",
        appState.notesSurface !== "writing"
      );
    });
  document.querySelectorAll(".notes-annotations").forEach((panel) => {
    panel.classList.toggle(
      "surface-hidden",
      appState.notesSurface !== "annotations"
    );
  });
  document.querySelectorAll(".notes-shared-compose").forEach((panel) => {
    panel.classList.toggle(
      "surface-hidden",
      appState.notesSurface !== "personal"
    );
  });

  elements.aiSuggestionModalCard.classList.toggle(
    "builder-open",
    appState.aiBuilderOpen
  );
  elements.toggleAiBuilderButton.setAttribute(
    "aria-expanded",
    String(appState.aiBuilderOpen)
  );
  elements.toggleAiBuilderButton.textContent = appState.aiBuilderOpen
    ? "收起设置"
    : "设置";
  window.requestAnimationFrame(() => {
    applyLibrarySplit(librarySplitState.width);
    applyWorkspaceSplit(workspaceSplitState.width);
  });
}

function setLibraryDrawer(open) {
  appState.libraryDrawerOpen = Boolean(open);
  renderWorkspaceLayout();
}

function setFocusReading(active) {
  const enteringFocus = Boolean(active) && !appState.focusReading;
  let preservedPdfPage = pdfContinuousPage;
  if (enteringFocus && appState.previewKind === "pdf") {
    if (!elements.pdfContinuousPreview.classList.contains("hidden")) {
      syncPdfContinuousCurrentPage();
    }
    preservedPdfPage = Math.max(1, pdfContinuousPage || annotationPage());
  }
  appState.focusReading = Boolean(active);
  if (appState.focusReading) {
    appState.libraryDrawerOpen = false;
    if (
      appState.previewKind === "pdf" &&
      !elements.pdfSelectionPreview.classList.contains("hidden")
    ) {
      setAnnotationMode(false);
      hidePdfSelectionPage();
    }
  }
  renderWorkspaceLayout();
  renderPdfContinuousAnnotationLayers();
  if (enteringFocus && appState.previewKind === "pdf") {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        showPdfContinuousReading(preservedPdfPage);
        if (pdfContinuousReady) {
          scrollPdfContinuousToPage(preservedPdfPage, false);
        }
      });
    });
  }
}

let toastTimer = null;
let dateKeyboardIndex = { year: -1, month: -1, day: -1 };
let paperKeyboardIndex = -1;
let editionKeyboardIndex = -1;
let issueKeyboardIndex = -1;
let imageView = {
  scale: 1,
  x: 0,
  y: 0,
  active: false,
  dragging: false,
  pointerId: null,
  startX: 0,
  startY: 0,
  originX: 0,
  originY: 0,
};

let pdfContinuousRenderToken = 0;
let pdfContinuousPage = 1;
let pdfContinuousPageCount = 0;
let pdfContinuousReady = false;
let pdfContinuousObserver = null;

let annotationState = {
  active: false,
  drawing: false,
  pointerId: null,
  startX: 0,
  startY: 0,
  drawBounds: null,
  draft: null,
  color: "red",
  highlightId: "",
  editId: "",
  editOriginal: null,
  editRect: null,
  editAction: "",
  editStartX: 0,
  editStartY: 0,
  editPointerRect: null,
  editBounds: null,
  purpose: "annotation",
};

const WORKSPACE_SPLIT_KEY = "historical_workbench_v87_workspace_split";
const LIBRARY_SPLIT_KEY = "historical_workbench_v87_library_split";
const legacyAnnotationMediaCache = new Map();
let workspaceSplitState = {
  dragging: false,
  pointerId: null,
  width: 0,
};
let librarySplitState = {
  dragging: false,
  pointerId: null,
  width: 0,
};
let workspaceContextTarget = {
  type: "",
  project: "",
};

const expandedSavedAnnotationIds = new Set();
const ANNOTATION_PAGE_SIZE = 10;
let annotationListState = {
  recordId: "",
  query: "",
  page: 1,
};

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await response.json();
  if (!response.ok || data.ok === false) {
    throw new Error(data.error || "操作没有完成");
  }
  return data;
}

function ocrEngineName(engine = appState.ocrEngine) {
  if (engine === "kandian") return "看典古籍 OCR";
  if (engine === "baidu") return "百度智能云 OCR";
  return "Umi-OCR";
}

function renderCloudOcrSettings() {
  const isCloud = appState.ocrEngine !== "umi";
  elements.cloudOcrSettingsPanel.classList.toggle("hidden", !isCloud);
  elements.cloudProviderSettings.forEach((panel) => {
    panel.classList.toggle(
      "hidden",
      panel.dataset.cloudSettings !== appState.ocrEngine
    );
  });
  const kandian = appState.cloudOcrSettings.kandian;
  const baidu = appState.cloudOcrSettings.baidu;
  elements.kandianConfiguredStatus.textContent = kandian.configured
    ? "账号和 Token 已保存在本机"
    : "尚未完整配置";
  elements.baiduConfiguredStatus.textContent = baidu.configured
    ? "API Key 和 Secret Key 已保存在本机"
    : "尚未完整配置";
  elements.saveCloudOcrSettingsButton.classList.remove("hidden");
  if (document.activeElement !== elements.kandianAccountInput) {
    elements.kandianAccountInput.value = kandian.account || "";
  }
  elements.kandianDetModeSelect.value = kandian.detMode || "auto";
  elements.kandianVersionSelect.value = kandian.version || "v2";
  elements.baiduLanguageTypeSelect.value =
    baidu.languageType || "CHN_ENG";
  elements.kandianTokenInput.placeholder = kandian.tokenSaved
    ? "已保存 Token；留空表示不更改"
    : "输入看典 API Token";
  elements.baiduApiKeyInput.placeholder = baidu.apiKeySaved
    ? "已保存 API Key；留空表示不更改"
    : "输入百度 API Key";
  elements.baiduSecretKeyInput.placeholder = baidu.secretKeySaved
    ? "已保存 Secret Key；留空表示不更改"
    : "输入百度 Secret Key";
}

async function loadCloudOcrSettings() {
  try {
    const data = await request("/api/ocr-settings");
    appState.cloudOcrSettings =
      data.settings || appState.cloudOcrSettings;
  } catch (error) {
    showToast(`无法读取云 OCR 配置：${error.message}`, "error");
  }
  renderCloudOcrSettings();
}

const AI_SENTENCE_PROVIDER_PRESETS = {
  qwen: {
    protocol: "chat-completions",
    endpoint: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
    authMode: "bearer",
    model: "qwen-plus",
  },
  claude: {
    protocol: "anthropic-messages",
    endpoint: "https://api.anthropic.com/v1/messages",
    authMode: "x-api-key",
    model: "claude-sonnet-5",
  },
  deepseek: {
    protocol: "chat-completions",
    endpoint: "https://api.deepseek.com/chat/completions",
    authMode: "bearer",
    model: "deepseek-v4-flash",
  },
};

function renderAiSentenceSettings() {
  const settings = appState.aiSentenceSettings;
  elements.aiSentenceConfiguredStatus.textContent = settings.configured
    ? `已配置 ${settings.providerName || "AI 服务"} · ${settings.model}`
    : "尚未完整配置";
  elements.aiSentenceApiKeyInput.placeholder = settings.apiKeySaved
    ? "已保存 API Key；留空表示不更改"
    : "输入 API Key；保存后只留在本机";
  elements.aiSentenceProviderSelect.value = settings.provider || "qwen";
  elements.aiSentenceEndpointDisplay.textContent = settings.endpoint || "—";
  if (document.activeElement !== elements.aiSentenceModelInput) {
    elements.aiSentenceModelInput.value = settings.model || "qwen-plus";
  }
  elements.aiSentenceApiKeyInput.disabled = false;
}

function applyAiSentenceProviderPreset() {
  const provider = elements.aiSentenceProviderSelect.value;
  const preset = AI_SENTENCE_PROVIDER_PRESETS[provider];
  elements.aiSentenceApiKeyInput.value = "";
  elements.aiSentenceApiKeyInput.placeholder =
    "切换服务商后请重新输入对应的 API Key";
  if (!preset) return;
  elements.aiSentenceEndpointDisplay.textContent = preset.endpoint;
  elements.aiSentenceModelInput.value = preset.model;
  elements.aiSentenceApiKeyInput.disabled = false;
}

async function loadAiSentenceSettings() {
  try {
    const data = await request("/api/ai-sentence-settings");
    appState.aiSentenceSettings =
      data.settings || appState.aiSentenceSettings;
  } catch (error) {
    showToast(`无法读取 AI 断句配置：${error.message}`, "error");
  }
  renderAiSentenceSettings();
  if (!elements.aiSuggestionModal.classList.contains("hidden")) {
    renderAiSuggestionPreview();
    renderAiChat();
  }
}

async function saveAiSentenceSettings() {
  if (appState.busy) return;
  try {
    const data = await request("/api/ai-sentence-settings", {
      method: "POST",
      body: JSON.stringify({
        provider: elements.aiSentenceProviderSelect.value,
        apiKey: elements.aiSentenceApiKeyInput.value.trim(),
        model: elements.aiSentenceModelInput.value.trim(),
      }),
    });
    appState.aiSentenceSettings =
      data.settings || appState.aiSentenceSettings;
    elements.aiSentenceApiKeyInput.value = "";
    renderAiSentenceSettings();
    showToast(data.message || "AI 断句配置已保存在本机");
  } catch (error) {
    showToast(error.message, "error");
  }
}

async function clearAiSentenceSettings() {
  if (appState.busy) return;
  if (!(await confirmAction("确定清除本机保存的 AI 断句 API Key 和模型配置吗？"))) {
    return;
  }
  try {
    const data = await request("/api/ai-sentence-settings", {
      method: "POST",
      body: JSON.stringify({ action: "clear" }),
    });
    appState.aiSentenceSettings =
      data.settings || appState.aiSentenceSettings;
    elements.aiSentenceApiKeyInput.value = "";
    elements.pageAiSentenceConsent.checked = false;
    renderAiSentenceSettings();
    showToast(data.message || "AI 断句配置已清除");
  } catch (error) {
    showToast(error.message, "error");
  }
}

async function requestAiSentence(
  text,
  consent,
  task = "segment",
  provider = ""
) {
  const sourceText = String(text || "").trim();
  const translate = task === "segment-translate";
  const selectedProvider = ["qwen", "claude", "deepseek"].includes(provider)
    ? provider
    : appState.aiSentenceSettings.provider;
  if (!sourceText) {
    throw new Error(translate ? "请先投入需要断句并翻译的文本" : "请先投入需要断句的文本");
  }
  const providerConfigured =
    (selectedProvider === appState.aiSentenceSettings.provider &&
      appState.aiSentenceSettings.configured) ||
    Boolean(appState.translationSettings[selectedProvider]?.configured);
  if (!providerConfigured) {
    throw new Error(
      `请先在“AI 断句”区配置${
        selectedProvider === "deepseek"
          ? "DeepSeek"
          : selectedProvider === "claude"
            ? "Claude"
            : "千问"
      }`
    );
  }
  if (!consent) {
    throw new Error("请先确认允许将当前文本发送给所选 AI 服务商");
  }
  const data = await request("/api/ai-sentence", {
    method: "POST",
    body: JSON.stringify({
      text: sourceText,
      consent: true,
      task: translate ? "segment-translate" : "segment",
      provider: selectedProvider,
    }),
  });
  return String(data.text || "").trim();
}

function currentPageTextForAiSentence() {
  return (
    mainTextPlain() ||
    elements.ocrRawText.value.trim() ||
    elements.ocrPendingText.value.trim()
  );
}

async function runPageAiSentence() {
  if (appState.busy) return;
  setBusy(true);
  setStatus(
    `正在进行 AI 断句；当前文本将按确认发送给${
      appState.aiSentenceSettings.providerName || "所选 AI 服务商"
    }…`
  );
  try {
    elements.pageAiSentenceOutput.value = await requestAiSentence(
      elements.pageAiSentenceInput.value,
      elements.pageAiSentenceConsent.checked
    );
    showToast("AI 断句完成，请人工复核");
    setStatus("AI 断句结果尚未写入资料；可修改后采用为校订草稿");
  } catch (error) {
    showToast(error.message, "error");
    setStatus(`AI 断句未完成：${error.message}`);
  } finally {
    elements.pageAiSentenceConsent.checked = false;
    setBusy(false);
  }
}

const TRANSLATION_PROVIDER_PRESETS = {
  qwen: {
    providerName: "千问",
    model: "qwen-plus",
    endpoint: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
  },
  claude: {
    providerName: "Claude",
    model: "claude-sonnet-5",
    endpoint: "https://api.anthropic.com/v1/messages",
  },
  deepseek: {
    providerName: "DeepSeek",
    model: "deepseek-v4-flash",
    endpoint: "https://api.deepseek.com/chat/completions",
  },
};

function translationEngineLabel(engine) {
  const labels = {
    edge: "Edge（弹窗）",
    argos: "Argos（本机）",
    deepseek: "DeepSeek",
    qwen: "千问",
    claude: "Claude",
  };
  return labels[engine] || engine;
}

function translationLanguageLabel(code) {
  const labels = {
    en: "英语",
    ja: "日语",
    de: "德语",
    fr: "法语",
    ru: "俄语",
    ko: "韩语",
    es: "西班牙语",
    zh: "简体中文",
    "zh-Hans": "简体中文",
    "zh-Hant": "繁体中文",
  };
  return labels[code] || code;
}

function selectedTranslationEngine() {
  return elements.translationEngineSelect.value || "argos";
}

function isCloudTranslationEngine(engine = selectedTranslationEngine()) {
  return ["deepseek", "qwen", "claude"].includes(engine);
}

function renderTranslationSettings() {
  const engine = selectedTranslationEngine();
  const isEdge = engine === "edge";
  const isArgos = engine === "argos";
  const isCloud = isCloudTranslationEngine(engine);
  elements.edgeTranslationPanel.classList.toggle("hidden", !isEdge);
  elements.argosTranslationPanel.classList.toggle("hidden", !isArgos);
  elements.cloudTranslationPanel.classList.toggle("hidden", !isCloud);
  elements.translationCloudConsentLabel.classList.toggle("hidden", !isCloud);
  if (!isCloud) elements.translationCloudConsent.checked = false;

  if (isEdge) {
    elements.translationEngineStatus.textContent =
      typeof window.historicalWorkbenchDesktop?.openEdgeTranslator ===
      "function"
        ? "开始翻译时会打开独立 Edge 弹窗；失败不会自动改用其他引擎"
        : "Edge（弹窗）仅在纸上寻踪桌面版中可用";
  } else if (isArgos) {
    const pairs = appState.argosTranslation.pairs || [];
    elements.argosTranslationStatus.textContent =
      appState.argosTranslation.installed
        ? `本地组件已安装 · ${pairs.length} 个直译模型`
        : appState.argosTranslation.message || "本地组件尚未安装";
    elements.translationEngineStatus.textContent =
      elements.argosTranslationStatus.textContent;
  } else {
    const settings =
      appState.translationSettings[engine] ||
      TRANSLATION_PROVIDER_PRESETS[engine];
    const name = settings.providerName || translationEngineLabel(engine);
    elements.cloudTranslationProviderName.textContent = `${name} 翻译`;
    elements.cloudTranslationConfiguredStatus.textContent = settings.configured
      ? settings.borrowedFromAiSentence
        ? "已复用 AI 断句区保存的密钥"
        : "翻译密钥已保存在本机"
      : "尚未完整配置";
    elements.cloudTranslationApiKey.placeholder = settings.apiKeySaved
      ? "已保存 API Key；留空表示不更改"
      : settings.borrowedFromAiSentence
        ? "正在复用 AI 断句区密钥；可在此另存翻译密钥"
        : "输入当前服务商的 API Key";
    elements.cloudTranslationModel.value =
      settings.model || TRANSLATION_PROVIDER_PRESETS[engine].model;
    elements.cloudTranslationEndpoint.textContent =
      settings.endpoint || TRANSLATION_PROVIDER_PRESETS[engine].endpoint;
    elements.translationEngineStatus.textContent = settings.configured
      ? `${name} 已配置；翻译前仍需逐次确认上传`
      : `${name} 尚未配置`;
  }
  renderTranslationRecords();
}

async function loadTranslationSettings() {
  try {
    const data = await request("/api/translation-settings");
    appState.translationSettings =
      data.settings || appState.translationSettings;
  } catch (error) {
    showToast(`无法读取翻译配置：${error.message}`, "error");
  }
  renderTranslationSettings();
  if (!elements.aiSuggestionModal.classList.contains("hidden")) {
    renderAiSuggestionPreview();
    renderAiChat();
  }
  return appState.argosTranslation;
}

async function saveCloudTranslationSettings() {
  const provider = selectedTranslationEngine();
  if (!isCloudTranslationEngine(provider) || appState.busy) return;
  try {
    const data = await request("/api/translation-settings", {
      method: "POST",
      body: JSON.stringify({
        provider,
        apiKey: elements.cloudTranslationApiKey.value.trim(),
        model: elements.cloudTranslationModel.value.trim(),
      }),
    });
    appState.translationSettings =
      data.settings || appState.translationSettings;
    elements.cloudTranslationApiKey.value = "";
    renderTranslationSettings();
    showToast(data.message || "云翻译配置已保存在本机");
  } catch (error) {
    showToast(error.message, "error");
  }
}

async function clearCloudTranslationSettings() {
  const provider = selectedTranslationEngine();
  if (!isCloudTranslationEngine(provider) || appState.busy) return;
  if (
    !(await confirmAction(
      `确定清除本机保存的${translationEngineLabel(provider)}翻译配置吗？`
    ))
  ) {
    return;
  }
  try {
    const data = await request("/api/translation-settings", {
      method: "POST",
      body: JSON.stringify({ action: "clear", provider }),
    });
    appState.translationSettings =
      data.settings || appState.translationSettings;
    elements.cloudTranslationApiKey.value = "";
    renderTranslationSettings();
    showToast(data.message || "云翻译配置已清除");
  } catch (error) {
    showToast(error.message, "error");
  }
}

async function checkEdgeTranslation() {
  try {
    const bridge = window.historicalWorkbenchDesktop;
    if (typeof bridge?.checkEdgeTranslator !== "function") {
      throw new Error("Edge（弹窗）仅在纸上寻踪桌面版中可用");
    }
    const result = await bridge.checkEdgeTranslator();
    if (!result?.installed) {
      throw new Error("没有找到 Microsoft Edge，请先确认 Edge 已安装");
    }
    elements.translationEngineStatus.textContent =
      "已找到 Microsoft Edge；语言模型会在首次弹窗翻译时检查";
    showToast(elements.translationEngineStatus.textContent);
  } catch (error) {
    elements.translationEngineStatus.textContent = error.message;
    showToast(error.message, "error");
  }
}

function waitForEdgeTranslation(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

async function removeEdgeTranslationJob(token) {
  try {
    await request(
      `/api/edge-translation-jobs?token=${encodeURIComponent(token)}`,
      { method: "DELETE" }
    );
  } catch {
    // 一次性任务可能已经过期，无需再提示。
  }
}

async function translateWithEdgePopup(
  text,
  sourceLanguage,
  targetLanguage
) {
  const sourceText = String(text || "").trim();
  if (!sourceText) throw new Error("请先投入需要翻译的文本");
  const bridge = window.historicalWorkbenchDesktop;
  if (typeof bridge?.openEdgeTranslator !== "function") {
    throw new Error("Edge（弹窗）仅在纸上寻踪桌面版中可用");
  }
  const created = await request("/api/edge-translation-jobs", {
    method: "POST",
    body: JSON.stringify({
      text: sourceText,
      sourceLanguage,
      targetLanguage,
    }),
  });
  const token = String(created.token || "");
  if (!token || !created.url) {
    throw new Error("没有建立 Edge（弹窗）翻译任务");
  }
  try {
    const taskUrl = new URL(created.url, window.location.origin).href;
    await bridge.openEdgeTranslator({ url: taskUrl });
    elements.translationEngineStatus.textContent =
      "Edge 弹窗已打开，正在等待本机翻译结果…";
    const deadline = Date.now() + 20 * 60 * 1000;
    while (Date.now() < deadline) {
      await waitForEdgeTranslation(700);
      const job = await request(
        `/api/edge-translation-jobs?token=${encodeURIComponent(token)}`
      );
      elements.translationEngineStatus.textContent =
        job.message || "正在等待 Edge（弹窗）翻译…";
      if (job.status === "complete") {
        return {
          text: String(job.translatedText || "").trim(),
          engine: "edge",
          model: String(job.model || ""),
        };
      }
      if (job.status === "error") {
        throw new Error(job.error || "Edge（弹窗）翻译未完成");
      }
    }
    throw new Error("等待 Edge（弹窗）翻译超时，请关闭弹窗后重试");
  } finally {
    await removeEdgeTranslationJob(token);
  }
}

async function refreshArgosTranslationStatus(showMessage = false) {
  try {
    const data = await request("/api/translation/argos-status");
    appState.argosTranslation = {
      installed: Boolean(data.installed),
      pairs: Array.isArray(data.pairs) ? data.pairs : [],
      message:
        data.message ||
        (data.installed
          ? "Argos 本机组件已安装"
          : "Argos 本机组件尚未安装"),
    };
    if (showMessage) showToast(appState.argosTranslation.message);
  } catch (error) {
    appState.argosTranslation = {
      installed: false,
      pairs: [],
      message: error.message,
    };
    if (showMessage) showToast(error.message, "error");
  }
  renderTranslationSettings();
  return appState.argosTranslation;
}

async function runArgosAction(action) {
  if (appState.busy) return;
  setBusy(true);
  setStatus(
    action === "install"
      ? "正在下载并安装 Argos 本机组件…"
      : "正在下载当前 Argos 语言模型…"
  );
  try {
    const data = await request("/api/translation/argos-action", {
      method: "POST",
      body: JSON.stringify({
        action,
        sourceLanguage: elements.translationSourceLanguage.value,
        targetLanguage: elements.translationTargetLanguage.value,
      }),
    });
    appState.argosTranslation = {
      installed: true,
      pairs: Array.isArray(data.pairs) ? data.pairs : [],
      message: data.message || "Argos 本地组件已更新",
    };
    showToast(appState.argosTranslation.message);
    setStatus(appState.argosTranslation.message);
  } catch (error) {
    showToast(error.message, "error");
    setStatus(`Argos 操作未完成：${error.message}`);
  } finally {
    setBusy(false);
    renderTranslationSettings();
  }
}

function currentPageTextForTranslation() {
  return (
    mainTextPlain() ||
    elements.ocrRawText.value.trim() ||
    elements.ocrPendingText.value.trim()
  );
}

async function translateTextUsingEngine(
  sourceText,
  engine,
  sourceLanguage,
  targetLanguage,
  consent
) {
  if (engine === "edge") {
    return translateWithEdgePopup(
      sourceText,
      sourceLanguage,
      targetLanguage
    );
  }
  return request("/api/translate", {
    method: "POST",
    body: JSON.stringify({
      engine,
      text: sourceText,
      sourceLanguage,
      targetLanguage,
      consent: !isCloudTranslationEngine(engine) || consent,
    }),
  });
}

async function runTranslation() {
  if (appState.busy) return;
  const engine = selectedTranslationEngine();
  const sourceText = elements.translationInput.value.trim();
  if (!sourceText) {
    showToast("请先投入需要翻译的文本", "error");
    return;
  }
  setBusy(true);
  setStatus(`正在使用${translationEngineLabel(engine)}翻译…`);
  try {
    const result = await translateTextUsingEngine(
      sourceText,
      engine,
      elements.translationSourceLanguage.value,
      elements.translationTargetLanguage.value,
      elements.translationCloudConsent.checked
    );
    elements.translationOutput.value = String(result.text || "").trim();
    appState.lastTranslationEngine = result.engine || engine;
    appState.lastTranslationModel = String(result.model || "");
    showToast("翻译完成，请人工复核后保存");
    setStatus("译文尚未保存；可继续人工修改");
  } catch (error) {
    showToast(error.message, "error");
    setStatus(`翻译未完成：${error.message}`);
  } finally {
    elements.translationCloudConsent.checked = false;
    setBusy(false);
  }
}

async function saveTranslationRecord() {
  const file = selectedFile();
  if (!file || appState.busy) return;
  const sourceText = elements.translationInput.value.trim();
  const translatedText = elements.translationOutput.value.trim();
  if (!sourceText || !translatedText) {
    showToast("原文和译文都不能为空", "error");
    return;
  }
  setBusy(true);
  try {
    const data = await request("/api/translation-records", {
      method: "POST",
      body: JSON.stringify({
        recordId: file.id,
        relativePath: file.relativePath,
        page: normalizedOcrPage(elements.translationPageInput.value),
        sourceLanguage: elements.translationSourceLanguage.value,
        targetLanguage: elements.translationTargetLanguage.value,
        engine: appState.lastTranslationEngine || selectedTranslationEngine(),
        model: appState.lastTranslationModel || "",
        sourceText,
        translatedText,
      }),
    });
    applyServerState(data, file.id, appState.selectedIndex);
    showToast("译文记录已独立保存");
    setStatus("译文已保存；OCR 原文和校订稿未被覆盖");
  } catch (error) {
    showToast(error.message, "error");
  } finally {
    setBusy(false);
    renderTranslationRecords();
  }
}

async function deleteTranslationRecord(translationId) {
  const file = selectedFile();
  if (!file || !translationId || appState.busy) return;
  if (!(await confirmAction("确定删除这条译文记录吗？"))) return;
  setBusy(true);
  try {
    const data = await request("/api/translation-records", {
      method: "POST",
      body: JSON.stringify({
        action: "delete",
        recordId: file.id,
        relativePath: file.relativePath,
        translationId,
      }),
    });
    applyServerState(data, file.id, appState.selectedIndex);
    showToast("译文记录已删除");
  } catch (error) {
    showToast(error.message, "error");
  } finally {
    setBusy(false);
    renderTranslationRecords();
  }
}

function renderTranslationRecords() {
  if (!elements.translationRecordList) return;
  const file = selectedFile();
  const records = Array.isArray(file?.translations)
    ? [...file.translations].reverse()
    : [];
  elements.translationRecordList.innerHTML = records.length
    ? records
        .map(
          (item) => `
            <article class="translation-record" data-translation-id="${escapeHtml(
              item.id
            )}">
              <div class="translation-record-heading">
                <div>
                  <strong>第 ${item.page} 页 · ${escapeHtml(
                    translationLanguageLabel(item.sourceLanguage)
                  )} → ${escapeHtml(
                    translationLanguageLabel(item.targetLanguage)
                  )}</strong>
                  <small>${escapeHtml(
                    translationEngineLabel(item.engine) || item.engineLabel
                  )}${item.model ? ` · ${escapeHtml(item.model)}` : ""}</small>
                </div>
                <div class="translation-inline-actions">
                  <button type="button" class="button ghost"
                    data-load-translation="${escapeHtml(item.id)}">载入</button>
                  <button type="button" class="button ghost"
                    data-copy-translation="${escapeHtml(item.id)}">复制译文</button>
                  <button type="button" class="icon-button"
                    data-delete-translation="${escapeHtml(item.id)}"
                    aria-label="删除译文">×</button>
                </div>
              </div>
              <textarea class="translation-history-text" rows="5"
                readonly>${escapeHtml(item.translatedText)}</textarea>
            </article>
          `
        )
        .join("")
    : '<div class="notes-empty">当前资料尚无译文记录。</div>';
}

function loadTranslationRecord(translationId) {
  const file = selectedFile();
  const item = (file?.translations || []).find(
    (entry) => entry.id === translationId
  );
  if (!item) return;
  elements.translationPageInput.value = String(item.page || 1);
  elements.translationSourceLanguage.value = item.sourceLanguage || "en";
  elements.translationTargetLanguage.value = item.targetLanguage || "zh";
  elements.translationEngineSelect.value = item.engine || "argos";
  elements.translationInput.value = item.sourceText || "";
  elements.translationOutput.value = item.translatedText || "";
  appState.lastTranslationEngine = item.engine || "argos";
  appState.lastTranslationModel = item.model || "";
  renderTranslationSettings();
  showToast("已载入这条译文记录");
}

function selectedAnnotationForScreenshot() {
  const file = selectedFile();
  if (!file) return null;
  const selectedId =
    appState.screenshotAnnotationId ||
    annotationState.highlightId ||
    [...expandedSavedAnnotationIds].find((id) =>
      (file.annotations || []).some((item) => item.id === id)
    ) ||
    "";
  return (file.annotations || []).find((item) => item.id === selectedId) || null;
}

async function updateScreenshotFolder(action) {
  if (appState.busy) return;
  if (!appState.isWritableLibrary) {
    showToast("只有带测试标记的资料库可以修改截图保存位置", "error");
    return;
  }
  setBusy(true);
  setStatus(
    action === "reset"
      ? "正在恢复默认截图文件夹…"
      : "请选择当前资料库内部的截图文件夹…"
  );
  try {
    const data = await request("/api/screenshot-folder", {
      method: "POST",
      body: JSON.stringify({ action }),
    });
    if (data.cancelled) {
      setStatus("未修改截图保存位置");
      return;
    }
    applyServerState(data, appState.selectedId, appState.selectedIndex);
    showToast(data.message || "截图保存位置已更新");
    setStatus("截图只会写入当前带测试标记的资料库内部");
  } catch (error) {
    showToast(error.message, "error");
    setStatus(`截图保存位置未修改：${error.message}`);
  } finally {
    setBusy(false);
  }
}

async function exportScreenshot(scope) {
  const file = selectedFile();
  if (!file || appState.busy) return;
  const page = normalizedOcrPage(elements.screenshotPageInput.value);
  let selection = {
    mode: "full-page",
    page,
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  };
  let annotationId = "";
  if (scope === "region") {
    const annotation = selectedAnnotationForScreenshot();
    if (!annotation) {
      showToast("请先在原件或研究笔记中选中一个框选", "error");
      return;
    }
    selection = {
      mode: "region",
      page: annotation.page,
      x: annotation.x,
      y: annotation.y,
      width: annotation.width,
      height: annotation.height,
    };
    annotationId = annotation.id;
  }
  setBusy(true);
  setStatus("正在生成本机 PNG 截图；不会上传…");
  try {
    const imagePayload =
      appState.previewKind === "pdf"
        ? await capturePdfSelection(selection)
        : await captureImageSelection(selection);
    const parameters = new URLSearchParams({
      recordId: file.id,
      relativePath: file.relativePath,
      page: String(selection.page),
      scope,
      annotationId,
    });
    const response = await fetch(`/api/screenshot-export?${parameters}`, {
      method: "POST",
      headers: {
        "Content-Type": imagePayload.contentType || "image/png",
      },
      body: imagePayload.body,
    });
    const data = await response.json();
    if (!response.ok || data.ok === false) {
      throw new Error(data.error || "截图保存失败");
    }
    elements.screenshotExportPath.value = data.exportPath || "";
    showToast(data.message || "截图已保存到当前资料库");
    setStatus("图片仅保存到本机资料库；工作台没有上传文件");
  } catch (error) {
    showToast(error.message, "error");
    setStatus(`截图保存未完成：${error.message}`);
  } finally {
    setBusy(false);
  }
}

async function saveScreenshotImportedText(scope) {
  const file = selectedFile();
  const rawText = elements.screenshotImportedText.value.trim();
  if (!file || appState.busy) return;
  if (!rawText) {
    showToast("请先粘贴需要回填的外部识别文本", "error");
    return;
  }
  const page = normalizedOcrPage(elements.screenshotPageInput.value);
  let selection = {
    mode: "full-page",
    page,
    x: 0,
    y: 0,
    width: 1,
    height: 1,
    annotationId: "",
  };
  if (scope === "region") {
    const annotation = selectedAnnotationForScreenshot();
    if (!annotation) {
      showToast("请先选中需要回填的框选", "error");
      return;
    }
    selection = {
      mode: "region",
      page: annotation.page,
      x: annotation.x,
      y: annotation.y,
      width: annotation.width,
      height: annotation.height,
      annotationId: annotation.id,
    };
  }
  setBusy(true);
  try {
    const data = await request("/api/ocr-region-save", {
      method: "POST",
      body: JSON.stringify({
        recordId: file.id,
        relativePath: file.relativePath,
        ...selection,
        rawText,
        engine: "外部识别（用户手动回填）",
        recognizedAt: new Date().toISOString(),
      }),
    });
    appState.selectedOcrRegionId = data.savedOcrRegionId || "";
    applyServerState(data, file.id, appState.selectedIndex);
    elements.screenshotImportedText.value = "";
    showToast("外部识别文本已保存并标明来源");
    setStatus("回填结果已保存；工作台没有连接或调用外部服务");
  } catch (error) {
    showToast(error.message, "error");
  } finally {
    setBusy(false);
    renderOcrWorkspace();
  }
}

async function saveCloudOcrSettings() {
  if (
    appState.busy ||
    appState.ocrEngine === "umi"
  ) return;
  const payload =
    appState.ocrEngine === "kandian"
      ? {
          kandian: {
            account: elements.kandianAccountInput.value.trim(),
            token: elements.kandianTokenInput.value.trim(),
            detMode: elements.kandianDetModeSelect.value,
            version: elements.kandianVersionSelect.value,
          },
        }
      : {
          baidu: {
            apiKey: elements.baiduApiKeyInput.value.trim(),
            secretKey: elements.baiduSecretKeyInput.value.trim(),
            languageType: elements.baiduLanguageTypeSelect.value,
          },
        };
  try {
    const data = await request("/api/ocr-settings", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    appState.cloudOcrSettings =
      data.settings || appState.cloudOcrSettings;
    elements.kandianTokenInput.value = "";
    elements.baiduApiKeyInput.value = "";
    elements.baiduSecretKeyInput.value = "";
    renderCloudOcrSettings();
    await refreshOcrServiceStatus();
    showToast(data.message || "云 OCR 配置已保存在本机");
  } catch (error) {
    showToast(error.message, "error");
  }
}

async function clearCloudOcrSettings(engine) {
  if (!["kandian", "baidu"].includes(engine) || appState.busy) return;
  const label = engine === "kandian" ? "看典" : "百度";
  if (!(await confirmAction(`确定清除本机保存的${label}云 OCR 凭据吗？`))) {
    return;
  }
  try {
    const data = await request("/api/ocr-settings", {
      method: "POST",
      body: JSON.stringify({ action: "clear", engine }),
    });
    appState.cloudOcrSettings =
      data.settings || appState.cloudOcrSettings;
    elements.cloudOcrConsent.checked = false;
    renderCloudOcrSettings();
    await refreshOcrServiceStatus();
    showToast(data.message || "云 OCR 配置已清除");
  } catch (error) {
    showToast(error.message, "error");
  }
}

function renderOcrServiceState() {
  const service = appState.ocrService;
  const checking = service.checking;
  const message = checking
    ? `正在检查${ocrEngineName()}…`
    : service.message;
  elements.ocrServiceStatuses.forEach((label) => {
    label.textContent = message;
  });
  elements.ocrServiceDots.forEach((dot) => {
    dot.classList.toggle("connected", !checking && service.running);
    dot.classList.toggle(
      "warning",
      !checking && !service.running && (service.installed || service.configured)
    );
  });
  let actionLabel;
  if (appState.ocrEngine !== "umi") {
    actionLabel = service.configured ? "查看/修改云配置" : "配置云 OCR";
  } else if (!checking && service.running) {
    actionLabel = "Umi-OCR 已连接";
  } else {
    actionLabel = service.configured
      ? "启动/重连 Umi-OCR"
      : "查找 Umi-OCR.exe";
  }
  elements.manageOcrServiceButtons.forEach((button) => {
    button.textContent = actionLabel;
    button.disabled =
      checking ||
      appState.busy ||
      (appState.ocrEngine === "umi" && service.running);
  });
  elements.refreshOcrServiceButtons.forEach((button) => {
    button.disabled = checking || appState.busy;
  });
}

async function refreshOcrServiceStatus() {
  appState.ocrService = {
    ...appState.ocrService,
    checking: true,
  };
  renderOcrServiceState();
  renderCloudOcrSettings();
  try {
    const data = await request(
      `/api/ocr-service-status?engine=${encodeURIComponent(
        appState.ocrEngine
      )}`
    );
    appState.ocrService = {
      running: Boolean(data.running),
      installed: Boolean(data.installed),
      configured: Boolean(data.configured),
      message: data.message || "OCR 服务状态未知",
      checking: false,
    };
  } catch (error) {
    appState.ocrService = {
      running: false,
      installed: false,
      configured: false,
      message: error.message,
      checking: false,
    };
  }
  renderOcrServiceState();
  renderCloudOcrSettings();
}

async function manageOcrService() {
  if (appState.ocrService.checking || appState.busy) return;
  if (appState.ocrEngine !== "umi") {
    switchDetailsView("ocr-text");
    appState.engineSettingsPanel = "ocr";
    elements.ocrEngineSettingsDisclosure.open = true;
    renderEngineSettingsPanels();
    renderCloudOcrSettings();
    const target =
      appState.ocrEngine === "kandian"
        ? elements.kandianAccountInput
        : elements.baiduApiKeyInput;
    target.focus({ preventScroll: false });
    return;
  }
  const action = appState.ocrService.configured
    ? "start-umi"
    : "choose-start-umi";
  appState.ocrService.checking = true;
  renderOcrServiceState();
  try {
    const data = await request("/api/ocr-service-action", {
      method: "POST",
      body: JSON.stringify({ action }),
    });
    showToast(data.message || "OCR 服务操作已完成");
    setStatus(data.message || "OCR 服务操作已完成");
  } catch (error) {
    showToast(error.message, "error");
    setStatus(error.message);
  }
  appState.ocrService.checking = false;
  await refreshOcrServiceStatus();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const RICH_TEXT_COLOR_HEX = {
  black: "#111827",
  red: "#dc2626",
  blue: "#2563eb",
};

function richColorName(value) {
  const normalized = String(value || "")
    .toLowerCase()
    .replaceAll(" ", "");
  if (
    normalized === "red" ||
    normalized === "#dc2626" ||
    normalized === "rgb(220,38,38)"
  ) {
    return "red";
  }
  if (
    normalized === "blue" ||
    normalized === "#2563eb" ||
    normalized === "rgb(37,99,235)"
  ) {
    return "blue";
  }
  return "black";
}

function normalizedRichTextSegments(value, fallbackText = "") {
  const hasRichText = Array.isArray(value) && value.some(
    (item) => String(item?.text || "").replace(/\u0000/g, "").length
  );
  const source = hasRichText
    ? value
    : String(fallbackText || "")
      ? [{ text: String(fallbackText), color: "black", size: 14, bold: false }]
      : [];
  const result = [];
  source.forEach((item) => {
    const text = String(item?.text || "")
      .replace(/\r\n?/g, "\n")
      .replace(/\u0000/g, "");
    if (!text) return;
    const color = richColorName(item?.color);
    const size = normalizedTextFontSize(item?.size);
    const bold = Boolean(item?.bold);
    const previous = result[result.length - 1];
    if (
      previous?.color === color &&
      previous?.size === size &&
      previous?.bold === bold
    ) {
      previous.text += text;
    } else {
      result.push({ text, color, size, bold });
    }
  });
  while (result.length && !result[0].text.trimStart()) result.shift();
  while (result.length && !result[result.length - 1].text.trimEnd()) {
    result.pop();
  }
  if (result.length) {
    result[0].text = result[0].text.trimStart();
    result[result.length - 1].text =
      result[result.length - 1].text.trimEnd();
  }
  return result;
}

function richTextPlain(value, fallbackText = "") {
  return normalizedRichTextSegments(value, fallbackText)
    .map((item) => item.text)
    .join("")
    .trim();
}

function richTextHtml(value, fallbackText = "") {
  return normalizedRichTextSegments(value, fallbackText)
    .map(
      (item) =>
        `<span class="rich-color-${item.color}" data-rich-color="${
          item.color
        }" data-rich-size="${item.size}" data-rich-bold="${item.bold ? "true" : "false"}" style="font-size:${
          item.size
        }px!important;font-weight:${item.bold ? "700" : "400"}!important">${escapeHtml(
          item.text
        ).replaceAll("\n", "<br>")}</span>`
    )
    .join("");
}

function richEditorSegments(editor) {
  if (!editor) return [];
  const result = [];
  const append = (text, color, size = 14, bold = false) => {
    const normalizedText = String(text || "").replaceAll("\u00a0", " ");
    if (!normalizedText) return;
    const normalizedColor = richColorName(color);
    const normalizedSize = normalizedTextFontSize(size);
    const normalizedBold = Boolean(bold);
    const previous = result[result.length - 1];
    if (
      previous?.color === normalizedColor &&
      previous?.size === normalizedSize &&
      previous?.bold === normalizedBold
    ) {
      previous.text += normalizedText;
    } else {
      result.push({
        text: normalizedText,
        color: normalizedColor,
        size: normalizedSize,
        bold: normalizedBold,
      });
    }
  };
  const endsWithNewline = () =>
    Boolean(result.length && result[result.length - 1].text.endsWith("\n"));
  const visit = (
    node,
    inheritedColor = "black",
    inheritedSize = 14,
    inheritedBold = false
  ) => {
    if (node.nodeType === Node.TEXT_NODE) {
      append(node.nodeValue, inheritedColor, inheritedSize, inheritedBold);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if (node.nodeName === "BR") {
      append("\n", inheritedColor, inheritedSize, inheritedBold);
      return;
    }
    const element = node;
    const nextColor = richColorName(
      element.dataset?.richColor ||
        element.style?.color ||
        element.getAttribute?.("color") ||
        inheritedColor
    );
    const nextSize = normalizedTextFontSize(
      element.dataset?.richSize ||
        Number.parseFloat(element.style?.fontSize) ||
        inheritedSize
    );
    let nextBold = inheritedBold;
    if (element.dataset?.richBold === "true") nextBold = true;
    else if (element.dataset?.richBold === "false") nextBold = false;
    else if (element.nodeName === "B" || element.nodeName === "STRONG") {
      nextBold = true;
    } else if (element.style?.fontWeight) {
      const weight = element.style.fontWeight.toLowerCase();
      if (weight === "bold" || Number.parseInt(weight, 10) >= 600) {
        nextBold = true;
      } else if (weight === "normal" || Number.parseInt(weight, 10) <= 500) {
        nextBold = false;
      }
    }
    const isBlock = ["DIV", "P", "LI"].includes(element.nodeName);
    if (isBlock && result.length && !endsWithNewline()) {
      append("\n", nextColor, nextSize, nextBold);
    }
    Array.from(element.childNodes).forEach((child) =>
      visit(child, nextColor, nextSize, nextBold)
    );
    if (isBlock && result.length && !endsWithNewline()) {
      append("\n", nextColor, nextSize, nextBold);
    }
  };
  Array.from(editor.childNodes).forEach((node) =>
    visit(node, "black", 14, false)
  );
  const normalized = normalizedRichTextSegments(result);
  if (editor.dataset.textFormatMode === "whole-rich") {
    const whole = wholeEditorFormat(editor);
    return normalizedRichTextSegments(
      normalized.map((item) => ({
        ...item,
        color: whole.color,
        size: whole.size,
        bold: whole.bold,
      }))
    );
  }
  return normalized;
}

function setRichEditorSegments(editor, segments, fallbackText = "") {
  if (!editor) return;
  editor.innerHTML = richTextHtml(segments, fallbackText);
  if (editor.dataset.textFormatMode === "whole-rich") {
    applyWholeRichTextFormat(editor, wholeEditorFormat(editor));
  }
}

function mainTextRichSegments() {
  return richEditorSegments(elements.ocrCorrectedText);
}

function mainTextPlain() {
  return richTextPlain(mainTextRichSegments());
}

function setMainText(text = "", richText = []) {
  setRichEditorSegments(elements.ocrCorrectedText, richText, text);
}

function setMainTextDisabled(disabled) {
  const blocked = Boolean(disabled);
  elements.ocrCorrectedText.contentEditable = blocked ? "false" : "true";
  elements.ocrCorrectedText.setAttribute("aria-disabled", String(blocked));
  elements.ocrCorrectedText.classList.toggle("disabled", blocked);
}

function appendPlainTextToRichEditor(editor, text, color = "black") {
  const segments = richEditorSegments(editor);
  if (richTextPlain(segments)) {
    segments.push({
      text: "\n\n",
      color: "black",
      size: 14,
      bold: false,
    });
  }
  segments.push({
    text: String(text || ""),
    color: richColorName(color),
    size: 14,
    bold: false,
  });
  setRichEditorSegments(editor, segments);
  editor.focus();
}

function applyRichTextColor(editor, color) {
  if (!editor) return;
  if (editor.dataset.textFormatMode === "whole-rich") {
    const next = applyWholeRichTextFormat(editor, { color });
    const key = textFormatTargetKey(editor);
    saveTextFormatPreference(key, next);
    return;
  }
  return applyRichTextSelectionFormat(editor, { color });
}

function showToast(message, type = "success") {
  clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.className = `toast show${type === "error" ? " error" : ""}`;
  toastTimer = setTimeout(() => {
    elements.toast.className = "toast";
  }, 3600);
}

function setStatus(message) {
  elements.statusMessage.innerHTML = `<span class="status-dot"></span>${escapeHtml(
    message
  )}`;
}

function closeWorkspaceContextMenu() {
  workspaceContextTarget = { type: "", project: "" };
  elements.workspaceContextMenu.classList.add("hidden");
}

function openWorkspaceContextMenu(event, target) {
  if (!appState.isWritableLibrary || appState.busy) return;
  event.preventDefault();
  workspaceContextTarget = target;
  elements.workspaceContextDeleteButton.textContent =
    target.type === "project"
      ? "永久删除项目"
      : target.type === "files"
        ? `永久删除所选 ${appState.batchSelectedFileIds.size} 份材料`
        : "永久删除史料";
  elements.workspaceContextMenu.classList.remove("hidden");
  const menuWidth = elements.workspaceContextMenu.offsetWidth || 150;
  const menuHeight = elements.workspaceContextMenu.offsetHeight || 48;
  elements.workspaceContextMenu.style.left = `${Math.max(
    8,
    Math.min(event.clientX, window.innerWidth - menuWidth - 8)
  )}px`;
  elements.workspaceContextMenu.style.top = `${Math.max(
    8,
    Math.min(event.clientY, window.innerHeight - menuHeight - 8)
  )}px`;
  elements.workspaceContextDeleteButton.focus();
}

function formatTime(value) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return "";
  }
}

function renderProjectList() {
  const currentExists =
    appState.activeProject === "all" ||
    appState.projects.some((project) => project.name === appState.activeProject);
  if (!currentExists) appState.activeProject = "all";

  elements.projectList.innerHTML = [
    `<button type="button" class="project-item${
      appState.activeProject === "all" ? " active" : ""
    }" data-project="all">
      <span class="project-symbol">全</span>
      <span>全部项目</span>
    </button>`,
    ...appState.projects.map(
      (project) => `
        <button type="button" class="project-item${
          appState.activeProject === project.name ? " active" : ""
        }" data-project="${escapeHtml(project.name)}">
          <span class="project-symbol">项</span>
          <span>${escapeHtml(project.name)}</span>
        </button>`
    ),
  ].join("");

  elements.projectList.querySelectorAll(".project-item").forEach((button) => {
    button.addEventListener("click", () => {
      appState.activeProject = button.dataset.project;
      refreshFilteredFiles("", 0);
      setStatus(
        appState.activeProject === "all"
          ? "已切换到全部资料，可跨项目检索"
          : `已进入项目：${appState.activeProject}`
      );
    });
    if (button.dataset.project !== "all") {
      button.addEventListener("contextmenu", (event) => {
        openWorkspaceContextMenu(event, {
          type: "project",
          project: button.dataset.project,
        });
      });
    }
  });
}

function renderReadingStatus() {
  elements.readingStatusButtons.forEach((button) => {
    const active = button.dataset.readingStatus === appState.editingStatus;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function isForeignSource(file = null) {
  if (file) {
    return file.sourceLanguage === "foreign";
  }
  return appState.editingSourceLanguage === "foreign";
}

function renderSourceLanguage() {
  const hasSelectedFile = Boolean(selectedFile());
  elements.sourceLanguageCard.classList.remove("hidden");
  elements.sourceLanguageButtons.forEach((button) => {
    const active =
      hasSelectedFile &&
      button.dataset.sourceLanguage === appState.editingSourceLanguage;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    button.disabled =
      !hasSelectedFile || appState.busy || !appState.isWritableLibrary;
  });
}

async function saveSourceLanguageImmediately(sourceLanguage) {
  const file = selectedFile();
  if (!file || appState.busy) return;
  if (!appState.isWritableLibrary) {
    showToast("正式资料库只能查看中文/外文属性，不能修改", "error");
    return;
  }
  const nextLanguage =
    sourceLanguage === "foreign" ? "foreign" : "chinese";
  if (file.sourceLanguage === nextLanguage) return;
  const previousLanguage = appState.editingSourceLanguage;
  appState.editingSourceLanguage = nextLanguage;
  renderSourceLanguage();
  setBusy(true);
  const materialKind = kindLabel(file.kind);
  setStatus(
    `正在切换为${nextLanguage === "foreign" ? "外文" : "中文"}${materialKind}…`
  );
  try {
    const data = await request("/api/source-language", {
      method: "POST",
      body: JSON.stringify({
        recordId: file.id,
        relativePath: file.relativePath,
        sourceLanguage: nextLanguage,
      }),
    });
    const updated = (data.files || []).find((item) => item.id === file.id);
    if (updated) {
      appState.allFiles = appState.allFiles.map((item) =>
        item.id === updated.id ? updated : item
      );
      appState.files = appState.files.map((item) =>
        item.id === updated.id ? updated : item
      );
    } else {
      file.sourceLanguage = nextLanguage;
    }
    appState.editingSourceLanguage = nextLanguage;
    appState.operations = data.operations || appState.operations;
    if (nextLanguage !== "foreign" && appState.foreignTextMode === "translation") {
      appState.foreignTextMode = "ocr";
    }
    renderSourceLanguage();
    renderDetailsView();
    renderResearchNotes();
    renderOperations();
    showToast(data.message || "中文/外文属性已即时保存");
    setStatus("中文/外文属性已经保存，不需要再点击“仅保存”");
  } catch (error) {
    appState.editingSourceLanguage = previousLanguage;
    showToast(error.message, "error");
    setStatus(`中文/外文切换未完成：${error.message}`);
    renderSourceLanguage();
  } finally {
    setBusy(false);
  }
}

function normalizeTag(value) {
  return String(value ?? "")
    .trim()
    .replace(/^[,，]+|[,，]+$/g, "")
    .replace(/\s+/g, " ");
}

function renderTagChips() {
  if (!appState.editingTags.length) {
    elements.tagChipList.innerHTML = "";
    elements.tagInput.placeholder = "添加标签";
    return;
  }
  elements.tagInput.placeholder = "继续添加";
  elements.tagChipList.innerHTML = appState.editingTags
    .map(
      (tag, index) => `
        <span class="tag-chip">
          <span>${escapeHtml(tag)}</span>
          <button type="button" data-tag-index="${index}"
            aria-label="删除标签 ${escapeHtml(tag)}" title="删除">×</button>
        </span>`
    )
    .join("");
  elements.tagChipList.querySelectorAll("[data-tag-index]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.editingTags.splice(Number(button.dataset.tagIndex), 1);
      renderTagChips();
      elements.tagInput.focus({ preventScroll: true });
    });
  });
}

function addTagsFromInput() {
  const additions = elements.tagInput.value
    .split(/[,，]+/)
    .map(normalizeTag)
    .filter(Boolean);
  for (const tag of additions) {
    if (!appState.editingTags.includes(tag)) appState.editingTags.push(tag);
  }
  elements.tagInput.value = "";
  renderTagChips();
}

function currentMediaViewport() {
  const stageWidth = Math.max(1, elements.previewStage.clientWidth);
  const stageHeight = Math.max(1, elements.previewStage.clientHeight);
  const fullStage = {
    left: 0,
    top: 0,
    width: stageWidth,
    height: stageHeight,
    stageWidth,
    stageHeight,
    ready: false,
  };
  if (
    appState.previewKind === "image" &&
    !elements.imagePreview.classList.contains("hidden") &&
    elements.imagePreview.naturalWidth &&
    elements.imagePreview.naturalHeight
  ) {
    const styles = window.getComputedStyle(elements.imagePreview);
    const horizontalPadding =
      (Number.parseFloat(styles.paddingLeft) || 0) +
      (Number.parseFloat(styles.paddingRight) || 0);
    const verticalPadding =
      (Number.parseFloat(styles.paddingTop) || 0) +
      (Number.parseFloat(styles.paddingBottom) || 0);
    const availableWidth = Math.max(
      1,
      elements.imagePreview.clientWidth - horizontalPadding
    );
    const availableHeight = Math.max(
      1,
      elements.imagePreview.clientHeight - verticalPadding
    );
    const scale = Math.min(
      availableWidth / elements.imagePreview.naturalWidth,
      availableHeight / elements.imagePreview.naturalHeight
    );
    const width = elements.imagePreview.naturalWidth * scale;
    const height = elements.imagePreview.naturalHeight * scale;
    return {
      left: (stageWidth - width) / 2,
      top: (stageHeight - height) / 2,
      width,
      height,
      stageWidth,
      stageHeight,
      ready: true,
    };
  }
  if (
    appState.previewKind === "pdf" &&
    !elements.pdfSelectionPreview.classList.contains("hidden") &&
    elements.pdfSelectionPreview.clientWidth &&
    elements.pdfSelectionPreview.clientHeight
  ) {
    return {
      left: elements.pdfSelectionPreview.offsetLeft,
      top: elements.pdfSelectionPreview.offsetTop,
      width: elements.pdfSelectionPreview.clientWidth,
      height: elements.pdfSelectionPreview.clientHeight,
      stageWidth,
      stageHeight,
      ready: true,
    };
  }
  return fullStage;
}

function clampUnit(value) {
  return Math.min(1, Math.max(0, Number(value) || 0));
}

function annotationCacheKey(annotation) {
  return [
    selectedFile()?.id || "",
    Number(annotation?.page) || 1,
    annotation?.id || "",
  ].join(":");
}

function stageRectToMediaRect(rect) {
  const viewport = currentMediaViewport();
  const left = Number(rect.x) * viewport.stageWidth;
  const top = Number(rect.y) * viewport.stageHeight;
  const right = left + Number(rect.width) * viewport.stageWidth;
  const bottom = top + Number(rect.height) * viewport.stageHeight;
  const x = clampUnit((left - viewport.left) / viewport.width);
  const y = clampUnit((top - viewport.top) / viewport.height);
  return {
    ...rect,
    x,
    y,
    width: Math.max(
      0.005,
      Math.min(1 - x, (right - left) / viewport.width)
    ),
    height: Math.max(
      0.005,
      Math.min(1 - y, (bottom - top) / viewport.height)
    ),
    coordinateSpace: "media",
  };
}

function annotationMediaRect(annotation) {
  if (annotation?.coordinateSpace === "media") {
    return {
      ...annotation,
      x: clampUnit(annotation.x),
      y: clampUnit(annotation.y),
      width: Math.min(clampUnit(annotation.width), 1 - clampUnit(annotation.x)),
      height: Math.min(
        clampUnit(annotation.height),
        1 - clampUnit(annotation.y)
      ),
    };
  }
  const key = annotationCacheKey(annotation);
  if (annotation?.id && legacyAnnotationMediaCache.has(key)) {
    return { ...annotation, ...legacyAnnotationMediaCache.get(key) };
  }
  if (!currentMediaViewport().ready) {
    return { ...annotation, coordinateSpace: "legacy-stage" };
  }
  const converted = stageRectToMediaRect(annotation);
  if (annotation?.id) {
    legacyAnnotationMediaCache.set(key, {
      x: converted.x,
      y: converted.y,
      width: converted.width,
      height: converted.height,
      coordinateSpace: "media",
    });
  }
  return converted;
}

function normalizedAnnotationEditRect(rect) {
  const x = clampUnit(rect?.x);
  const y = clampUnit(rect?.y);
  return {
    page: Math.min(9999, Math.max(1, Number.parseInt(rect?.page, 10) || 1)),
    x,
    y,
    width: Math.min(clampUnit(rect?.width), 1 - x),
    height: Math.min(clampUnit(rect?.height), 1 - y),
    coordinateSpace: "media",
  };
}

function annotationEditRectsMatch(left, right, tolerance = 0.000001) {
  if (!left || !right) return false;
  const first = normalizedAnnotationEditRect(left);
  const second = normalizedAnnotationEditRect(right);
  return (
    first.page === second.page &&
    ["x", "y", "width", "height"].every(
      (key) => Math.abs(first[key] - second[key]) <= tolerance
    )
  );
}

function annotationStageRect(annotation) {
  if (
    annotation?.draft &&
    annotation?.coordinateSpace !== "media"
  ) {
    return annotation;
  }
  const viewport = currentMediaViewport();
  const media = annotationMediaRect(annotation);
  if (media.coordinateSpace !== "media") return annotation;
  return {
    ...annotation,
    x:
      (viewport.left + Number(media.x) * viewport.width) /
      viewport.stageWidth,
    y:
      (viewport.top + Number(media.y) * viewport.height) /
      viewport.stageHeight,
    width: (Number(media.width) * viewport.width) / viewport.stageWidth,
    height: (Number(media.height) * viewport.height) / viewport.stageHeight,
  };
}

function applyImageView() {
  const transform = `translate(${imageView.x}px, ${imageView.y}px) scale(${imageView.scale})`;
  const inverseScale = 1 / Math.max(imageView.scale, 0.01);
  elements.annotationLayer.style.setProperty(
    "--annotation-line-width",
    `${inverseScale}px`
  );
  elements.annotationLayer.style.setProperty(
    "--annotation-edit-outer-width",
    `${2 * inverseScale}px`
  );
  elements.annotationLayer.style.setProperty(
    "--annotation-highlight-width",
    `${2 * inverseScale}px`
  );
  elements.annotationLayer.style.setProperty(
    "--annotation-handle-size",
    `${10 * inverseScale}px`
  );
  elements.annotationLayer.style.setProperty(
    "--annotation-handle-offset",
    `${-5 * inverseScale}px`
  );
  elements.annotationLayer.style.setProperty(
    "--annotation-handle-border",
    `${inverseScale}px`
  );
  elements.imagePreview.style.transform =
    appState.previewKind === "image" ? transform : "";
  elements.pdfPreview.style.transform = "";
  elements.pdfSelectionPreview.style.transform =
    appState.previewKind === "pdf" ? transform : "";
  elements.annotationLayer.style.transform = appState.previewKind
    ? transform
    : "";
  elements.zoomLevel.textContent = `${Math.round(imageView.scale * 100)}%`;
  elements.previewStage.classList.toggle("zoom-active", imageView.active);
  elements.previewStage.classList.toggle("dragging", imageView.dragging);
  elements.previewStage.classList.toggle(
    "pdf-transform-active",
    appState.previewKind === "pdf" &&
      imageView.active &&
      !elements.pdfSelectionPreview.classList.contains("hidden")
  );
  const pdfActive =
    appState.previewKind === "pdf" &&
    imageView.active &&
    !elements.pdfSelectionPreview.classList.contains("hidden");
  elements.pdfModeButton.classList.toggle("active", pdfActive);
  elements.pdfModeButton.textContent =
    !elements.pdfSelectionPreview.classList.contains("hidden")
      ? "返回连续阅读"
      : "连续阅读中";
  elements.annotationPanButton.classList.toggle(
    "active",
    Boolean(appState.previewKind && imageView.active && !annotationState.active)
  );
}

function resetImageView(deactivate = false) {
  imageView.scale = 1;
  imageView.x = 0;
  imageView.y = 0;
  imageView.dragging = false;
  imageView.pointerId = null;
  if (deactivate) imageView.active = false;
  applyImageView();
}

function selectedFile() {
  if (!appState.selectedId) return null;
  return (
    appState.files.find((file) => file.id === appState.selectedId) ||
    appState.allFiles.find((file) => file.id === appState.selectedId) ||
    null
  );
}

function selectedMaterialNavigationIndexes() {
  const current = selectedFile();
  if (!current) return [];
  if (appState.activeProject === "all") {
    return appState.files.map((_, index) => index);
  }
  return appState.files
    .map((file, index) => ({ file, index }))
    .filter(({ file }) => file.project === current.project)
    .map(({ index }) => index);
}

function canCycleSelectedMaterials() {
  return selectedMaterialNavigationIndexes().length > 1;
}

function adjacentMaterialIndex(direction) {
  const materialIndexes = selectedMaterialNavigationIndexes();
  if (!materialIndexes.length) return -1;
  const currentPosition = materialIndexes.indexOf(appState.selectedIndex);
  if (currentPosition < 0) return materialIndexes[0];
  const nextPosition =
    (currentPosition + direction + materialIndexes.length) %
    materialIndexes.length;
  return materialIndexes[nextPosition];
}

function normalizedOcrPage(value = appState.ocrPage) {
  return Math.min(9999, Math.max(1, Number.parseInt(value, 10) || 1));
}

function ocrRegionsForPage(file = selectedFile(), page = appState.ocrPage) {
  if (!file) return null;
  const targetPage = normalizedOcrPage(page);
  return (file.ocrRegions || []).filter(
    (item) =>
      Number(item.page) === targetPage &&
      (item.mode === "full-page" || item.legacyFullPage) &&
      !item.annotationId
  );
}

function currentOcrRegion(file = selectedFile(), page = appState.ocrPage) {
  if (appState.manualCorrectedDraft) return null;
  const regions = ocrRegionsForPage(file, page) || [];
  let entry = regions.find((item) => item.id === appState.selectedOcrRegionId);
  if (!entry) {
    entry =
      [...regions].sort((a, b) =>
        String(
          b.updatedAt || b.correctedAt || b.recognizedAt || ""
        ).localeCompare(
          String(a.updatedAt || a.correctedAt || a.recognizedAt || "")
        )
      )[0] || null;
  }
  if (entry) appState.selectedOcrRegionId = entry.id;
  else appState.selectedOcrRegionId = "";
  return entry;
}

function ocrRegionLabel(region, index = 0) {
  if (!region) return "尚无已保留结果";
  if (region.engine === "手工录入" || !region.rawText) {
    return `第 ${normalizedOcrPage(region.page)} 页 · 手工录入 ${index + 1}`;
  }
  const scope =
    region.mode === "full-page" || region.legacyFullPage
      ? "整页"
      : `框选 ${index + 1}`;
  return `第 ${normalizedOcrPage(region.page)} 页 · ${scope}`;
}

function ocrRegionsForAnnotation(annotation, file = selectedFile()) {
  if (!annotation || !file) return [];
  const closeEnough = (left, right) =>
    Math.abs(Number(left) - Number(right)) < 0.002;
  return (file.ocrRegions || []).filter(
    (entry) =>
      entry.mode === "region" &&
      (entry.annotationId === annotation.id ||
        (Number(entry.page) === Number(annotation.page) &&
          closeEnough(entry.x, annotation.x) &&
          closeEnough(entry.y, annotation.y) &&
          closeEnough(entry.width, annotation.width) &&
          closeEnough(entry.height, annotation.height)))
  );
}

function annotationOcrDisplayEntry(annotation, file = selectedFile()) {
  const linked = [...ocrRegionsForAnnotation(annotation, file)].sort((a, b) =>
    String(b.updatedAt || b.recognizedAt || "").localeCompare(
      String(a.updatedAt || a.recognizedAt || "")
    )
  );
  return linked.find((entry) => entry.correctedText || entry.rawText) || null;
}

function annotationOcrDisplayText(annotation, file = selectedFile()) {
  const preferred = annotationOcrDisplayEntry(annotation, file);
  return preferred?.correctedText || preferred?.rawText || "";
}

function annotationCardIsCompact(annotation) {
  return !expandedSavedAnnotationIds.has(annotation.id);
}

function noteReferenceLabel(reference) {
  const page = normalizedOcrPage(reference?.page);
  const region = (selectedFile()?.ocrRegions || []).find(
    (item) => item.id === reference?.regionId
  );
  const regions = ocrRegionsForPage(selectedFile(), page) || [];
  const index = Math.max(0, regions.findIndex((item) => item.id === region?.id));
  const location = region ? ocrRegionLabel(region, index) : `第 ${page} 页`;
  if (reference?.type === "ocr-raw") return `OCR 原文 · ${location}`;
  if (reference?.type === "ocr-corrected") {
    return region?.engine === "手工录入" || !region?.rawText
      ? `手工校订文本 · ${location}`
      : `OCR 校订稿 · ${location}`;
  }
  return appState.previewKind === "pdf"
    ? `原件位置 · 第 ${page} 页`
    : "原件位置 · 图片";
}

function renderNoteReferenceDrafts() {
  if (!elements.noteReferenceDrafts) return;
  const references = appState.noteReferenceDrafts || [];
  elements.noteReferenceDrafts.innerHTML = references
    .map(
      (reference, index) => `
        <button type="button" class="note-reference-chip draft"
          data-remove-note-reference="${index}"
          title="${escapeHtml(reference.excerpt || "原件页码关联")}">
          ${escapeHtml(noteReferenceLabel(reference))}
        </button>`
    )
    .join("");
  elements.noteReferenceDrafts
    .querySelectorAll("[data-remove-note-reference]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.removeNoteReference);
        appState.noteReferenceDrafts.splice(index, 1);
        renderNoteReferenceDrafts();
      });
    });
}

function renderOcrWorkspace() {
  const file = selectedFile();
  const aiSentenceRecordId = file?.id || "";
  if (appState.aiSentenceRecordId !== aiSentenceRecordId) {
    appState.aiSentenceRecordId = aiSentenceRecordId;
    elements.pageAiSentenceInput.value = "";
    elements.pageAiSentenceOutput.value = "";
    elements.pageAiSentenceConsent.checked = false;
  }
  if (appState.translationRecordId !== aiSentenceRecordId) {
    appState.translationRecordId = aiSentenceRecordId;
    appState.pendingMainTextTranslation = null;
    elements.translationInput.value = "";
    elements.translationOutput.value = "";
    elements.translationCloudConsent.checked = false;
    elements.screenshotExportPath.value = "";
    elements.screenshotImportedText.value = "";
    appState.lastTranslationEngine = selectedTranslationEngine();
    appState.lastTranslationModel = "";
  }
  const page = normalizedOcrPage(appState.ocrPage);
  appState.ocrPage = page;
  const regions = ocrRegionsForPage(file, page) || [];
  const entry = currentOcrRegion(file, page);
  const manualDraft = appState.manualCorrectedDraft;
  const rawText = entry?.rawText || "";
  const correctedText = entry?.correctedText || "";
  const finalText = correctedText || rawText;
  const usingSavedCorrection = Boolean(
    entry?.correctedManual && correctedText
  );
  const isPdf = appState.previewKind === "pdf";

  elements.ocrPageInputs.forEach((input) => {
    input.value = String(isPdf ? page : 1);
    input.disabled = !file || !isPdf || appState.busy;
  });
  syncOcrReferencePageControls();
  elements.translationPageInput.value = String(isPdf ? page : 1);
  elements.translationPageInput.disabled = !file || !isPdf || appState.busy;
  elements.screenshotPageInput.value = String(isPdf ? page : 1);
  elements.screenshotPageInput.disabled =
    !file || !isPdf || appState.busy;
  const savedRegionOptions = regions.length
    ? regions
        .map(
          (region, index) =>
            `<option value="${escapeHtml(region.id)}">${escapeHtml(
              ocrRegionLabel(region, index)
            )}</option>`
        )
        .join("")
    : '<option value="">尚无已保留结果</option>';
  const regionOptions = manualDraft
    ? `<option value="">正在新建手工校订</option>${savedRegionOptions}`
    : savedRegionOptions;
  elements.ocrRegionSelects.forEach((select) => {
    select.innerHTML = regionOptions;
    select.value = manualDraft ? "" : entry?.id || "";
    select.disabled =
      appState.busy || (!manualDraft && !entry);
  });
  elements.ocrRawText.value = rawText;
  if (!appState.ocrCorrectedDirty) {
    setMainText(
      manualDraft ? "" : correctedText || rawText,
      manualDraft ? [] : entry?.correctedRichText || []
    );
  }
  elements.ocrRawStatus.textContent = rawText
    ? `${entry.engine || "OCR"} · ${ocrRegionLabel(
        entry,
        Math.max(0, regions.findIndex((item) => item.id === entry.id))
      )} · ${formatTime(
        entry.recognizedAt || entry.updatedAt
      )}`
    : `第 ${page} 页尚无已保留 OCR`;
  const pending = appState.pendingOcr;
  elements.ocrPendingCard.classList.toggle("hidden", !pending);
  elements.ocrPendingText.value = pending?.rawText || "";
  elements.ocrPendingStatus.textContent = pending
    ? `${pending.engine || "OCR"} · ${
        pending.mode === "full-page" ? "整页识别" : "框选识别"
      } · 第 ${pending.page} 页 · ${formatTime(pending.recognizedAt)}`
    : "尚未识别";

  const referenceText = finalText;
  elements.ocrReferenceText.textContent =
    referenceText || "这一页尚无可用的对照文本。";
  elements.ocrReferenceStatus.textContent = referenceText
    ? `对照文本 · 第 ${page} 页${
        usingSavedCorrection ? " · 已采用人工校订" : " · 当前为识别文本"
      }`
    : "尚无可对照文本";

  const writable = Boolean(file && appState.isWritableLibrary && !appState.busy);
  const editableTextAvailable = Boolean(mainTextPlain());
  elements.pageOcrEngineSelect.value = appState.ocrEngine;
  elements.pageOcrEngineSelect.disabled = false;
  renderCloudOcrSettings();
  renderAiSentenceSettings();
  renderOcrServiceState();
  elements.keepOcrPendingButton.disabled = !writable || !pending;
  elements.discardOcrPendingButton.disabled = appState.busy || !pending;
  elements.copyOcrRawButton.disabled = !rawText || appState.busy;
  elements.floatOcrRawButton.disabled = !rawText;
  elements.floatOcrCorrectedButton.disabled = !correctedText;
  elements.mainTextFloatButton.disabled =
    !editableTextAvailable || appState.busy;
  elements.mainTextAiButton.disabled = !editableTextAvailable || appState.busy;
  elements.mainTextTranslationButton.disabled =
    !editableTextAvailable || appState.busy;
  elements.mainTextClearButton.disabled =
    !editableTextAvailable || appState.busy;
  elements.deleteOcrRegionButton.disabled = !writable || !entry;
  setMainTextDisabled(!writable);
  elements.resetOcrCorrectedButton.disabled =
    !writable || manualDraft || !finalText;
  elements.saveOcrCorrectedButton.disabled = !writable;
  elements.createManualCorrectedButton.disabled = !writable;
  elements.useOcrAsCorrectionButton.disabled = !writable || !rawText;
  elements.resetOcrCorrectedButton.textContent = correctedText
    ? "恢复已保存校订"
    : "恢复 OCR 原文草稿";
  elements.saveOcrCorrectedButton.textContent = manualDraft || !entry
    ? "保存手工录入"
    : "保存为最终文本";
  elements.quoteOcrSelectionButton.disabled = !referenceText || appState.busy;
  elements.floatOcrReferenceButton.disabled = !referenceText;
  renderNoteReferenceDrafts();
}

function setOcrPage(value, moveOriginal = false) {
  appState.ocrCorrectedDirty = false;
  appState.manualCorrectedDraft = false;
  appState.pendingMainTextTranslation = null;
  const requestedPage = normalizedOcrPage(value);
  appState.ocrPage =
    appState.previewKind === "pdf"
      ? Math.min(pdfAnnotationPageLimit(), requestedPage)
      : 1;
  appState.selectedOcrRegionId = "";
  if (moveOriginal && appState.previewKind === "pdf") {
    goToPdfAnnotationPage(appState.ocrPage);
  }
  renderOcrWorkspace();
}

async function confirmDiscardUnsavedCorrection() {
  return (
    !appState.ocrCorrectedDirty ||
    await confirmAction("当前校订文本尚未保存。确定放弃本次编辑并切换吗？")
  );
}

async function stepOcrReferencePage(direction) {
  if (appState.previewKind !== "pdf" || appState.busy) return;
  if (!(await confirmDiscardUnsavedCorrection())) {
    renderOcrWorkspace();
    return;
  }
  setOcrPage(appState.ocrPage + direction, true);
}

function addNoteReference(reference) {
  const normalized = {
    type: reference.type,
    page: normalizedOcrPage(reference.page),
    regionId: String(reference.regionId || ""),
    x: Number(reference.x) || 0,
    y: Number(reference.y) || 0,
    width: Number(reference.width) || 0,
    height: Number(reference.height) || 0,
    excerpt: String(reference.excerpt || "").trim().slice(0, 2000),
    sourceUpdatedAt: reference.sourceUpdatedAt || "",
  };
  const duplicate = appState.noteReferenceDrafts.some(
    (item) =>
      item.type === normalized.type &&
      item.page === normalized.page &&
      item.regionId === normalized.regionId &&
      item.excerpt === normalized.excerpt
  );
  if (!duplicate) appState.noteReferenceDrafts.push(normalized);
  renderNoteReferenceDrafts();
}

function quoteSelectedOcrText() {
  const selection = window.getSelection();
  const anchorInside = elements.ocrReferenceText.contains(selection?.anchorNode);
  const focusInside = elements.ocrReferenceText.contains(selection?.focusNode);
  const excerpt =
    anchorInside && focusInside ? String(selection.toString()).trim() : "";
  if (!excerpt) {
    showToast("请先在对照文本中选中需要引用的文字", "error");
    return;
  }
  const entry = currentOcrRegion();
  const type = entry?.correctedText ? "ocr-corrected" : "ocr-raw";
  addNoteReference({
    type,
    page: appState.ocrPage,
    regionId: entry?.id || "",
    x: entry?.x || 0,
    y: entry?.y || 0,
    width: entry?.width || 0,
    height: entry?.height || 0,
    excerpt,
    sourceUpdatedAt:
      type === "ocr-corrected"
        ? entry?.correctedAt || entry?.updatedAt || ""
        : entry?.recognizedAt || entry?.updatedAt || "",
  });
  const label = noteReferenceLabel({
    type,
    page: appState.ocrPage,
    regionId: entry?.id || "",
  });
  appendPlainTextToRichEditor(
    elements.researchNoteInput,
    `【${label}】\n“${excerpt}”`,
    "black"
  );
  showToast("已把选中文本引用到研究笔记");
}

let pdfiumPromise = null;
let cachedPdfiumDocument = {
  url: "",
  module: null,
  documentPtr: 0,
  filePtr: 0,
  pageCount: 0,
};

async function loadPdfium() {
  if (!pdfiumPromise) {
    pdfiumPromise = Promise.all([
      import("/vendor/pdfium/pdfium.js"),
      fetch("/vendor/pdfium/pdfium.wasm", { cache: "no-store" }).then(
        async (response) => {
          if (!response.ok) throw new Error("无法读取本机 PDFium 渲染组件");
          return response.arrayBuffer();
        }
      ),
    ]).then(async ([pdfiumLibrary, wasmBinary]) => {
      const module = await pdfiumLibrary.init({
        wasmBinary,
        locateFile: () => "/vendor/pdfium/pdfium.wasm",
      });
      module.PDFiumExt_Init();
      return module;
    });
  }
  return pdfiumPromise;
}

function closeCachedPdfiumDocument() {
  const cached = cachedPdfiumDocument;
  if (cached.module && cached.documentPtr) {
    cached.module.FPDF_CloseDocument(cached.documentPtr);
  }
  if (cached.module && cached.filePtr) {
    cached.module.pdfium.wasmExports.free(cached.filePtr);
  }
  cachedPdfiumDocument = {
    url: "",
    module: cached.module,
    documentPtr: 0,
    filePtr: 0,
    pageCount: 0,
  };
}

async function currentPdfiumDocument() {
  const module = await loadPdfium();
  const sourceUrl = String(appState.previewUrl || "").trim();
  if (!sourceUrl) {
    throw new Error("没有可读取的 PDF 文件地址");
  }
  if (
    cachedPdfiumDocument.url !== sourceUrl ||
    !cachedPdfiumDocument.documentPtr
  ) {
    closeCachedPdfiumDocument();
    const response = await fetch(sourceUrl, { cache: "no-store" });
    if (!response.ok) throw new Error("无法读取当前 PDF 文件");
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (!bytes.length) throw new Error("当前 PDF 文件为空");
    const filePtr = module.pdfium.wasmExports.malloc(bytes.length);
    if (!filePtr) throw new Error("PDFium 无法分配 PDF 读取内存");
    module.pdfium.HEAPU8.set(bytes, filePtr);
    const documentPtr = module.FPDF_LoadMemDocument(
      filePtr,
      bytes.length,
      null
    );
    if (!documentPtr) {
      const errorCode = module.FPDF_GetLastError();
      module.pdfium.wasmExports.free(filePtr);
      throw new Error(`PDFium 无法打开当前 PDF（错误码 ${errorCode}）`);
    }
    const pageCount = module.FPDF_GetPageCount(documentPtr);
    if (!Number.isInteger(pageCount) || pageCount < 1) {
      module.FPDF_CloseDocument(documentPtr);
      module.pdfium.wasmExports.free(filePtr);
      throw new Error("PDFium 没有读到可显示的页面");
    }
    cachedPdfiumDocument = {
      url: sourceUrl,
      module,
      documentPtr,
      filePtr,
      pageCount,
    };
  }
  return cachedPdfiumDocument;
}

async function renderPdfiumPage(pageNumber, canvas, requestedScale = 2) {
  const pdf = await currentPdfiumDocument();
  const targetPage = Math.min(
    pdf.pageCount,
    Math.max(1, normalizedOcrPage(pageNumber))
  );
  const pagePtr = pdf.module.FPDF_LoadPage(
    pdf.documentPtr,
    targetPage - 1
  );
  if (!pagePtr) {
    throw new Error(`PDFium 无法载入第 ${targetPage} 页`);
  }
  let bitmapPtr = 0;
  try {
    const pageWidth = pdf.module.FPDF_GetPageWidthF(pagePtr);
    const pageHeight = pdf.module.FPDF_GetPageHeightF(pagePtr);
    if (
      !Number.isFinite(pageWidth) ||
      !Number.isFinite(pageHeight) ||
      pageWidth <= 0 ||
      pageHeight <= 0
    ) {
      throw new Error(`第 ${targetPage} 页尺寸无效`);
    }
    let scale = Math.max(0.5, Number(requestedScale) || 2);
    const maxPixels = 40 * 1024 * 1024;
    if (pageWidth * pageHeight * scale * scale > maxPixels) {
      scale = Math.sqrt(maxPixels / (pageWidth * pageHeight));
    }
    const width = Math.max(1, Math.ceil(pageWidth * scale));
    const height = Math.max(1, Math.ceil(pageHeight * scale));
    bitmapPtr = pdf.module.FPDFBitmap_Create(width, height, 0);
    if (!bitmapPtr) throw new Error("PDFium 无法建立页面图像");
    pdf.module.FPDFBitmap_FillRect(
      bitmapPtr,
      0,
      0,
      width,
      height,
      0xffffffff
    );
    pdf.module.FPDF_RenderPageBitmap(
      bitmapPtr,
      pagePtr,
      0,
      0,
      width,
      height,
      0,
      16
    );
    const bufferPtr = pdf.module.FPDFBitmap_GetBuffer(bitmapPtr);
    const stride = pdf.module.FPDFBitmap_GetStride(bitmapPtr);
    if (!bufferPtr || stride < width * 4) {
      throw new Error("PDFium 没有生成可读取的页面像素");
    }
    const pixels = new Uint8ClampedArray(width * height * 4);
    for (let row = 0; row < height; row += 1) {
      const sourceStart = bufferPtr + row * stride;
      pixels.set(
        pdf.module.pdfium.HEAPU8.subarray(
          sourceStart,
          sourceStart + width * 4
        ),
        row * width * 4
      );
    }
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) throw new Error("浏览器无法建立 PDF 截图画布");
    context.putImageData(new ImageData(pixels, width, height), 0, 0);
    return { pageNumber: targetPage, pageCount: pdf.pageCount, width, height };
  } finally {
    if (bitmapPtr) pdf.module.FPDFBitmap_Destroy(bitmapPtr);
    pdf.module.FPDF_ClosePage(pagePtr);
  }
}

function pdfAnnotationPageLimit() {
  return Math.max(
    1,
    pdfContinuousPageCount || cachedPdfiumDocument.pageCount || 9999
  );
}

function syncPdfAnnotationPageControls() {
  const currentPage = annotationPage();
  const limit = pdfAnnotationPageLimit();
  const unavailable = appState.busy || appState.previewKind !== "pdf";
  elements.previousAnnotationPageButton.disabled =
    unavailable || currentPage <= 1;
  elements.nextAnnotationPageButton.disabled =
    unavailable || currentPage >= limit;
}

function syncOcrReferencePageControls() {
  const currentPage = normalizedOcrPage(appState.ocrPage);
  const limit = pdfAnnotationPageLimit();
  const unavailable = appState.busy || appState.previewKind !== "pdf";
  elements.ocrReferencePreviousPageButton.disabled =
    unavailable || currentPage <= 1;
  elements.ocrReferenceNextPageButton.disabled =
    unavailable || currentPage >= limit;
}

function syncOcrPageFromOriginal(pageNumber) {
  if (appState.previewKind !== "pdf" || appState.ocrCorrectedDirty) return;
  const nextPage = Math.min(
    pdfAnnotationPageLimit(),
    Math.max(1, normalizedOcrPage(pageNumber))
  );
  if (appState.ocrPage === nextPage) return;
  appState.ocrPage = nextPage;
  appState.selectedOcrRegionId = "";
  appState.manualCorrectedDraft = false;
  renderOcrWorkspace();
}

function setPdfContinuousPage(pageNumber) {
  const nextPage = Math.min(
    pdfAnnotationPageLimit(),
    Math.max(1, normalizedOcrPage(pageNumber))
  );
  pdfContinuousPage = nextPage;
  elements.annotationPageInput.value = String(nextPage);
  elements.pdfContinuousPreview
    .querySelectorAll(".pdf-continuous-page")
    .forEach((item) => {
      item.classList.toggle(
        "current",
        Number(item.dataset.pdfPage) === nextPage
      );
  });
  syncPdfAnnotationPageControls();
  syncOcrPageFromOriginal(nextPage);
  return nextPage;
}

function syncPdfContinuousCurrentPage() {
  if (
    appState.previewKind !== "pdf" ||
    elements.pdfContinuousPreview.classList.contains("hidden")
  ) {
    return;
  }
  const pages = Array.from(
    elements.pdfContinuousPreview.querySelectorAll(".pdf-continuous-page")
  );
  if (!pages.length) return;
  const viewportCenter =
    elements.pdfContinuousPreview.scrollTop +
    elements.pdfContinuousPreview.clientHeight / 2;
  const closest = pages.reduce((best, item) => {
    const center = item.offsetTop + item.offsetHeight / 2;
    const distance = Math.abs(center - viewportCenter);
    return !best || distance < best.distance ? { item, distance } : best;
  }, null);
  if (closest?.item) {
    const currentPage = setPdfContinuousPage(
      Number(closest.item.dataset.pdfPage)
    );
    releaseDistantPdfPages(currentPage);
  }
}

function scrollPdfContinuousToPage(pageNumber, smooth = false) {
  const nextPage = setPdfContinuousPage(pageNumber);
  const page = elements.pdfContinuousPreview.querySelector(
    `[data-pdf-page="${nextPage}"]`
  );
  if (page) {
    const top = Math.max(
      0,
      page.offsetTop -
        (elements.pdfContinuousPreview.clientHeight - page.offsetHeight) / 2
    );
    elements.pdfContinuousPreview.scrollTo({
      top,
      behavior: smooth ? "smooth" : "auto",
    });
  }
}

function showPdfContinuousReading(pageNumber = pdfContinuousPage) {
  if (appState.previewKind !== "pdf") return;
  elements.pdfSelectionPreview.classList.add("hidden");
  elements.pdfPreview.classList.add("hidden");
  if (pdfContinuousReady) {
    elements.pdfContinuousPreview.classList.remove("hidden");
    elements.previewStage.classList.add("pdf-continuous-active");
    scrollPdfContinuousToPage(pageNumber, false);
  } else {
    elements.pdfContinuousPreview.classList.add("hidden");
    elements.pdfPreview.classList.remove("hidden");
    elements.previewStage.classList.remove("pdf-continuous-active");
  }
  elements.imageTools.classList.add("hidden");
  elements.pdfModeButton.classList.add("hidden");
  imageView.active = false;
  imageView.dragging = false;
  imageView.pointerId = null;
  applyImageView();
  elements.zoomHint.textContent =
    "连续阅读：滚轮上下浏览全部页面；当前页会自动记录，框选时不会返回第一页";
}

async function renderObservedPdfPage(wrapper, renderToken) {
  if (
    !wrapper ||
    wrapper.dataset.rendered === "true" ||
    wrapper.dataset.rendering === "true"
  ) {
    return;
  }
  wrapper.dataset.rendering = "true";
  const page = Number(wrapper.dataset.pdfPage);
  const canvas = wrapper.querySelector("canvas");
  try {
    await renderPdfiumPage(page, canvas, 1.35);
    if (renderToken !== pdfContinuousRenderToken) return;
    wrapper.querySelector(".pdf-continuous-page-loading")?.remove();
    wrapper.style.minHeight = "";
    canvas.classList.remove("hidden");
    wrapper.dataset.rendered = "true";
    renderPdfContinuousAnnotationLayers();
  } catch (error) {
    const loading = wrapper.querySelector(".pdf-continuous-page-loading");
    if (loading) loading.textContent = `第 ${page} 页生成失败：${error.message}`;
  } finally {
    wrapper.dataset.rendering = "false";
  }
}

function releaseDistantPdfPages(currentPage) {
  elements.pdfContinuousPreview
    .querySelectorAll(".pdf-continuous-page")
    .forEach((wrapper) => {
      const page = Number(wrapper.dataset.pdfPage);
      if (
        Math.abs(page - currentPage) <= 8 ||
        wrapper.dataset.rendered !== "true"
      ) {
        return;
      }
      const canvas = wrapper.querySelector("canvas");
      wrapper.style.minHeight = `${wrapper.offsetHeight}px`;
      canvas.width = 1;
      canvas.height = 1;
      canvas.classList.add("hidden");
      if (!wrapper.querySelector(".pdf-continuous-page-loading")) {
        const loading = document.createElement("div");
        loading.className = "pdf-continuous-page-loading";
        loading.textContent = `滚动到此处时重新生成第 ${page} 页`;
        (wrapper.querySelector(".pdf-continuous-page-shell") || wrapper).appendChild(
          loading
        );
      }
      wrapper.dataset.rendered = "false";
    });
}

async function renderPdfContinuousPreview(pageNumber = 1) {
  if (appState.previewKind !== "pdf" || !appState.previewUrl) return;
  const renderToken = ++pdfContinuousRenderToken;
  pdfContinuousObserver?.disconnect();
  pdfContinuousObserver = null;
  pdfContinuousReady = false;
  pdfContinuousPage = normalizedOcrPage(pageNumber);
  pdfContinuousPageCount = 0;
  elements.pdfContinuousPreview.innerHTML =
    '<div class="pdf-continuous-page-loading">正在准备 PDF 连续阅读…</div>';
  const pdf = await currentPdfiumDocument();
  if (
    renderToken !== pdfContinuousRenderToken ||
    appState.previewKind !== "pdf"
  ) {
    return;
  }
  pdfContinuousPageCount = pdf.pageCount;
  const targetPage = Math.min(pdf.pageCount, pdfContinuousPage);
  elements.pdfContinuousPreview.innerHTML = Array.from(
    { length: pdf.pageCount },
    (_, index) => {
      const page = index + 1;
      return `
        <section class="pdf-continuous-page${
          page === targetPage ? " current" : ""
        }" data-pdf-page="${page}">
          <span class="pdf-continuous-page-label">第 ${page} / ${
            pdf.pageCount
          } 页</span>
          <div class="pdf-continuous-page-shell">
            <div class="pdf-continuous-page-loading">正在生成第 ${page} 页…</div>
            <canvas class="hidden" aria-label="PDF 第 ${page} 页"></canvas>
            <div class="pdf-continuous-annotation-layer"
              data-pdf-annotation-page="${page}"
              aria-label="PDF 第 ${page} 页框选批注"></div>
          </div>
        </section>`;
    }
  ).join("");
  renderPdfContinuousAnnotationLayers();
  pdfContinuousReady = true;
  showPdfContinuousReading(targetPage);
  pdfContinuousObserver = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry) => {
          renderObservedPdfPage(entry.target, renderToken);
        });
    },
    {
      root: elements.pdfContinuousPreview,
      rootMargin: "1200px 0px",
    }
  );
  elements.pdfContinuousPreview
    .querySelectorAll(".pdf-continuous-page")
    .forEach((wrapper) => pdfContinuousObserver.observe(wrapper));
  const targetWrapper = elements.pdfContinuousPreview.querySelector(
    `[data-pdf-page="${targetPage}"]`
  );
  await renderObservedPdfPage(targetWrapper, renderToken);
  scrollPdfContinuousToPage(targetPage, false);
}

async function showPdfSelectionPage(pageNumber = annotationPage()) {
  if (appState.previewKind !== "pdf" || !appState.previewUrl) return;
  const canvas = elements.pdfSelectionPreview;
  const targetPage = setPdfContinuousPage(pageNumber);
  await renderPdfiumPage(targetPage, canvas, 1.7);
  elements.pdfContinuousPreview.classList.add("hidden");
  elements.pdfPreview.classList.add("hidden");
  canvas.classList.remove("hidden");
  elements.previewStage.classList.remove("pdf-continuous-active");
  elements.imageTools.classList.remove("hidden");
  elements.pdfModeButton.classList.remove("hidden");
  elements.pdfModeButton.textContent = "返回连续阅读";
  renderAnnotationLayer();
}

function hidePdfSelectionPage() {
  elements.pdfSelectionPreview.classList.add("hidden");
  showPdfContinuousReading(pdfContinuousPage);
}

function htmlCanvasPngBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("浏览器没有生成 OCR 图片"));
          return;
        }
        resolve(blob);
      },
      "image/png",
      0.92
    );
  });
}

async function offscreenPngBlob(source, crop = null) {
  if (
    typeof window.OffscreenCanvas !== "function" ||
    typeof window.createImageBitmap !== "function"
  ) {
    return null;
  }
  const sourceWidth = crop ? crop.cropWidth : source.width;
  const sourceHeight = crop ? crop.cropHeight : source.height;
  const targetSize = boundedCanvasSize(sourceWidth, sourceHeight);
  const bitmap = crop
    ? await window.createImageBitmap(
        source,
        crop.cropX,
        crop.cropY,
        crop.cropWidth,
        crop.cropHeight
      )
    : await window.createImageBitmap(source);
  try {
    const target = new window.OffscreenCanvas(
      targetSize.width,
      targetSize.height
    );
    const context = target.getContext("2d");
    if (!context) throw new Error("浏览器无法建立离屏 OCR 图片");
    context.drawImage(bitmap, 0, 0, target.width, target.height);
    return await target.convertToBlob({ type: "image/png" });
  } finally {
    if (typeof bitmap.close === "function") bitmap.close();
  }
}

async function canvasPngBlob(canvas) {
  const offscreenBlob = await offscreenPngBlob(canvas);
  return offscreenBlob || htmlCanvasPngBlob(canvas);
}

function boundedCanvasSize(width, height) {
  const maxDimension = 4096;
  const maxPixels = 12 * 1024 * 1024;
  const dimensionScale = Math.min(1, maxDimension / Math.max(width, height));
  const pixelScale = Math.min(1, Math.sqrt(maxPixels / (width * height)));
  const scale = Math.min(dimensionScale, pixelScale);
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

async function croppedCanvasBlob(source, crop) {
  const offscreenBlob = await offscreenPngBlob(source, crop);
  if (offscreenBlob) return offscreenBlob;
  const targetSize = boundedCanvasSize(crop.cropWidth, crop.cropHeight);
  const target = document.createElement("canvas");
  target.width = targetSize.width;
  target.height = targetSize.height;
  const context = target.getContext("2d");
  if (!context) throw new Error("浏览器无法建立 OCR 图片画布");
  context.drawImage(
    source,
    crop.cropX,
    crop.cropY,
    crop.cropWidth,
    crop.cropHeight,
    0,
    0,
    target.width,
    target.height
  );
  return htmlCanvasPngBlob(target);
}

function encodedImagePayload(blob) {
  return {
    body: blob,
    pixelFormat: "encoded",
    contentType: blob.type || "image/png",
  };
}

function selectionPixelCrop(
  sourceWidth,
  sourceHeight,
  selection,
  padding = 0
) {
  const mode = selection.mode === "full-page" ? "full-page" : "region";
  let sx = 0;
  let sy = 0;
  let sw = sourceWidth;
  let sh = sourceHeight;

  if (mode === "region") {
    if (selection.coordinateSpace === "media") {
      sx = Math.max(0, Math.floor(Number(selection.x) * sourceWidth));
      sy = Math.max(0, Math.floor(Number(selection.y) * sourceHeight));
      sw = Math.min(
        sourceWidth - sx,
        Math.ceil(Number(selection.width) * sourceWidth)
      );
      sh = Math.min(
        sourceHeight - sy,
        Math.ceil(Number(selection.height) * sourceHeight)
      );
      return {
        cropX: Math.max(0, Math.floor(sx)),
        cropY: Math.max(0, Math.floor(sy)),
        cropWidth: Math.max(1, Math.floor(sw)),
        cropHeight: Math.max(1, Math.floor(sh)),
      };
    }
    const stageWidth = Math.max(
      1,
      elements.annotationLayer.clientWidth ||
        elements.previewStage.clientWidth
    );
    const stageHeight = Math.max(
      1,
      elements.annotationLayer.clientHeight ||
        elements.previewStage.clientHeight
    );
    const availableWidth = Math.max(1, stageWidth - padding * 2);
    const availableHeight = Math.max(1, stageHeight - padding * 2);
    const displayedScale = Math.min(
      availableWidth / sourceWidth,
      availableHeight / sourceHeight
    );
    const displayedWidth = sourceWidth * displayedScale;
    const displayedHeight = sourceHeight * displayedScale;
    const mediaLeft = (stageWidth - displayedWidth) / 2;
    const mediaTop = (stageHeight - displayedHeight) / 2;
    const selectionLeft = Number(selection.x) * stageWidth;
    const selectionTop = Number(selection.y) * stageHeight;
    const selectionRight =
      selectionLeft + Number(selection.width) * stageWidth;
    const selectionBottom =
      selectionTop + Number(selection.height) * stageHeight;
    const clippedLeft = Math.max(mediaLeft, selectionLeft);
    const clippedTop = Math.max(mediaTop, selectionTop);
    const clippedRight = Math.min(mediaLeft + displayedWidth, selectionRight);
    const clippedBottom = Math.min(mediaTop + displayedHeight, selectionBottom);
    if (clippedRight <= clippedLeft || clippedBottom <= clippedTop) {
      throw new Error("框选范围没有覆盖原件内容，请重新框选");
    }
    sx = Math.max(0, Math.floor((clippedLeft - mediaLeft) / displayedScale));
    sy = Math.max(0, Math.floor((clippedTop - mediaTop) / displayedScale));
    sw = Math.min(
      sourceWidth - sx,
      Math.ceil((clippedRight - clippedLeft) / displayedScale)
    );
    sh = Math.min(
      sourceHeight - sy,
      Math.ceil((clippedBottom - clippedTop) / displayedScale)
    );
  }
  return {
    cropX: Math.max(0, Math.floor(sx)),
    cropY: Math.max(0, Math.floor(sy)),
    cropWidth: Math.max(1, Math.floor(sw)),
    cropHeight: Math.max(1, Math.floor(sh)),
  };
}

async function captureImageSelection(selection) {
  try {
    if (!elements.imagePreview.complete || !elements.imagePreview.naturalWidth) {
      await elements.imagePreview.decode();
    }
  } catch (error) {
    throw new Error(`载入原件图片失败：${error.message}`);
  }
  let crop;
  try {
    crop = selectionPixelCrop(
      elements.imagePreview.naturalWidth,
      elements.imagePreview.naturalHeight,
      selection,
      18
    );
  } catch (error) {
    throw new Error(`计算框选位置失败：${error.message}`);
  }
  if (selection.mode === "full-page") {
    try {
      const sourceUrl =
        elements.imagePreview.currentSrc || elements.imagePreview.src;
      const response = await fetch(sourceUrl, { cache: "no-store" });
      if (!response.ok) throw new Error("无法读取原件图片文件");
      return encodedImagePayload(await response.blob());
    } catch (error) {
      throw new Error(`读取原件图片文件失败：${error.message}`);
    }
  }
  try {
    const blob = await croppedCanvasBlob(elements.imagePreview, crop);
    return encodedImagePayload(blob);
  } catch (error) {
    throw new Error(`生成框选图片失败：${error.message}`);
  }
}

async function capturePdfSelection(selection) {
  const source = document.createElement("canvas");
  let rendered;
  try {
    rendered = await renderPdfiumPage(selection.page, source, 2);
  } catch (error) {
    throw new Error(
      `生成 PDF 第 ${normalizedOcrPage(
        selection.page
      )} 页截图失败：${error.message}`
    );
  }
  let crop;
  try {
    crop = selectionPixelCrop(
      source.width,
      source.height,
      selection,
      0
    );
  } catch (error) {
    throw new Error(`计算 PDF 框选位置失败：${error.message}`);
  }
  try {
    const blob =
      selection.mode === "full-page"
        ? await canvasPngBlob(source)
        : await croppedCanvasBlob(source, crop);
    return encodedImagePayload(blob);
  } catch (error) {
    throw new Error(
      `裁剪 PDF 第 ${rendered.pageNumber} 页截图失败：${error.message}`
    );
  }
}

async function requestOcrPreview(
  file,
  selection,
  imagePayload,
  annotationId = "",
  requestedEngine = "umi"
) {
  const parameters = new URLSearchParams({
    recordId: file.id,
    relativePath: file.relativePath,
    page: String(selection.page),
    mode: selection.mode,
    x: String(selection.x),
    y: String(selection.y),
    width: String(selection.width),
    height: String(selection.height),
    annotationId: String(annotationId || ""),
    pixelFormat: imagePayload.pixelFormat,
    engine: requestedEngine,
    cloudConsent: String(
      requestedEngine === "umi" || elements.cloudOcrConsent.checked
    ),
  });
  const response = await fetch(`/api/ocr-region-preview?${parameters}`, {
    method: "POST",
    headers: {
      "Content-Type": imagePayload.contentType || "application/octet-stream",
    },
    body: imagePayload.body,
  });
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("OCR 服务返回了无法读取的结果");
  }
  if (!response.ok || data.ok === false) {
    throw new Error(data.error || "OCR 识别没有完成");
  }
  return data;
}

async function recognizeOcrSelection(
  rect,
  mode = "region",
  annotationId = "",
  autoSave = false
) {
  const file = selectedFile();
  if (!file || appState.busy || !rect) return;
  const requestedEngine = appState.ocrEngine;
  if (appState.pendingOcr && !autoSave) {
    appState.ocrSurface = "raw";
    switchDetailsView("ocr-text");
    showToast("请先决定是否保留上一条 OCR 结果", "error");
    setStatus(
      autoSave
        ? "框选位置已保存；上一条 OCR 仍待确认，因此没有自动识别"
        : "上一条 OCR 仍在等待确认，本次识别尚未开始"
    );
    return;
  }
  if (requestedEngine !== "umi") {
    const providerConfigured =
      appState.cloudOcrSettings[requestedEngine]?.configured;
    if (!providerConfigured) {
      switchDetailsView("ocr-text");
      appState.engineSettingsPanel = "ocr";
      elements.ocrEngineSettingsDisclosure.open = true;
      renderEngineSettingsPanels();
      showToast(
        `请先配置${ocrEngineName(requestedEngine)}凭据`,
        "error"
      );
      renderCloudOcrSettings();
      return;
    }
    if (!elements.cloudOcrConsent.checked) {
      switchDetailsView("ocr-text");
      appState.engineSettingsPanel = "ocr";
      elements.ocrEngineSettingsDisclosure.open = true;
      renderEngineSettingsPanels();
      showToast(
        "使用云 OCR 前，请勾选允许上传当前整页或当前框选",
        "error"
      );
      return;
    }
  }
  const selection = {
    mode: mode === "full-page" ? "full-page" : "region",
    page: normalizedOcrPage(rect.page || appState.ocrPage),
    x: mode === "full-page" ? 0 : Number(rect.x),
    y: mode === "full-page" ? 0 : Number(rect.y),
    width: mode === "full-page" ? 1 : Number(rect.width),
    height: mode === "full-page" ? 1 : Number(rect.height),
  };
  setBusy(true);
  setStatus(
    selection.mode === "full-page"
      ? `${ocrEngineName(requestedEngine)}正在识别第 ${selection.page} 页整页内容…`
      : `${ocrEngineName(requestedEngine)}正在识别第 ${selection.page} 页框选内容…`
  );
  try {
    let imagePayload;
    try {
      imagePayload =
        appState.previewKind === "pdf"
          ? await capturePdfSelection(selection)
          : await captureImageSelection(selection);
    } catch (error) {
      throw new Error(`准备 OCR 图片失败（PDF 截图流程）：${error.message}`);
    }
    let data;
    try {
      data = await requestOcrPreview(
        file,
        selection,
        imagePayload,
        annotationId,
        requestedEngine
      );
    } catch (error) {
      throw new Error(
        `${ocrEngineName(requestedEngine)}处理失败：${error.message}`
      );
    }
    const pendingResult = {
      ...data.pendingResult,
      recordId: file.id,
      relativePath: file.relativePath,
    };
    appState.ocrPage = selection.page;
    if (autoSave) {
      const saved = await request("/api/ocr-region-save", {
        method: "POST",
        body: JSON.stringify(pendingResult),
      });
      appState.selectedOcrRegionId = saved.savedOcrRegionId || "";
      appState.ocrCorrectedDirty = false;
      appState.manualCorrectedDraft = false;
      applyServerState(saved, file.id, appState.selectedIndex);
      if (selection.mode === "full-page") {
        appState.ocrSurface = "corrected";
        switchDetailsView("ocr-text");
        showToast("整页识别文本已进入校订框，可直接修改");
        setStatus("识别原文已保留；当前校订框可直接修改，保存后形成最终文本");
      } else {
        appState.notesSurface = "annotations";
        switchDetailsView("notes");
        renderResearchNotes();
        showToast("框选已自动识别并保存");
        setStatus("默认框选名称和 OCR 文本均已保存，可直接编辑名称并保存");
      }
    } else {
      appState.pendingOcr = pendingResult;
      appState.ocrSurface = "raw";
      switchDetailsView("ocr-text");
      showToast("识别完成，请选择是否保留");
      setStatus("本次 OCR 结果尚未保存，等待操作者确认");
    }
  } catch (error) {
    const message =
      autoSave && mode !== "full-page"
        ? `框选位置已保存，但自动 OCR 未完成：${error.message}`
        : error.message;
    showToast(message, "error");
    setStatus(message);
  } finally {
    setBusy(false);
    renderOcrWorkspace();
    refreshOcrServiceStatus();
  }
}

async function recognizeCurrentOcr() {
  const page =
    appState.previewKind === "pdf" ? annotationPage() : appState.ocrPage;
  await recognizeOcrSelection(
    { page, x: 0, y: 0, width: 1, height: 1 },
    "full-page",
    "",
    true
  );
}

function discardPendingOcr() {
  if (!appState.pendingOcr) return;
  appState.pendingOcr = null;
  renderOcrWorkspace();
  showToast("本次 OCR 结果已不保留");
  setStatus("识别结果未写入材料记录");
}

async function keepPendingOcr() {
  const file = selectedFile();
  const pending = appState.pendingOcr;
  if (!file || !pending || appState.busy) return;
  setBusy(true);
  try {
    const data = await request("/api/ocr-region-save", {
      method: "POST",
      body: JSON.stringify({
        recordId: file.id,
        relativePath: file.relativePath,
        ...pending,
      }),
    });
    appState.pendingOcr = null;
    appState.selectedOcrRegionId = data.savedOcrRegionId || "";
    appState.ocrReferenceType = "raw";
    appState.ocrCorrectedDirty = false;
    appState.manualCorrectedDraft = false;
    applyServerState(data, file.id, appState.selectedIndex);
    showToast("本次 OCR 原文已保留并成为当前文本");
    setStatus("新 OCR 已先显示为原文和校订草稿；之后保存的人工修订才会优先");
  } catch (error) {
    showToast(error.message, "error");
  } finally {
    setBusy(false);
    renderOcrWorkspace();
  }
}

async function deleteCurrentOcrRegion() {
  const file = selectedFile();
  const entry = currentOcrRegion();
  if (!file || !entry || appState.busy) return;
  if (!(await confirmAction("确定删除这条已保留的 OCR / 校订文本吗？"))) return;
  setBusy(true);
  try {
    const data = await request("/api/ocr-region-text", {
      method: "POST",
      body: JSON.stringify({
        action: "delete",
        recordId: file.id,
        relativePath: file.relativePath,
        regionId: entry.id,
      }),
    });
    appState.selectedOcrRegionId = "";
    appState.ocrCorrectedDirty = false;
    applyServerState(data, file.id, appState.selectedIndex);
    showToast("这条 OCR 结果已删除");
  } catch (error) {
    showToast(error.message, "error");
  } finally {
    setBusy(false);
    renderOcrWorkspace();
  }
}

async function saveOcrCorrected(options = {}) {
  const silent = Boolean(options.silent);
  const file = selectedFile();
  const entry = currentOcrRegion();
  const savedPage = appState.ocrPage;
  const pendingTranslation = appState.pendingMainTextTranslation;
  const correctedRichText = mainTextRichSegments();
  const correctedText = richTextPlain(correctedRichText);
  const creatingManual = appState.manualCorrectedDraft || !entry;
  if (!file || appState.busy) return false;
  if (!correctedText) {
    showToast("请先填写校订文本", "error");
    return false;
  }
  setBusy(true);
  try {
    const data = await request("/api/ocr-region-text", {
      method: "POST",
      body: JSON.stringify({
        action: creatingManual ? "create-manual" : "save-corrected",
        recordId: file.id,
        relativePath: file.relativePath,
        regionId: entry?.id || "",
        page: savedPage,
        correctedText,
        correctedRichText,
      }),
    });
    appState.ocrCorrectedDirty = false;
    appState.manualCorrectedDraft = false;
    appState.selectedOcrRegionId = data.savedOcrRegionId || entry?.id || "";
    applyServerState(data, file.id, appState.selectedIndex);
    let translationPairSaved = false;
    let translationPairError = "";
    if (
      pendingTranslation?.recordId === file.id &&
      Number(pendingTranslation.page) === Number(savedPage) &&
      (!pendingTranslation.regionId ||
        pendingTranslation.regionId === (entry?.id || ""))
    ) {
      try {
        const translationData = await request("/api/translation-records", {
          method: "POST",
          body: JSON.stringify({
            recordId: file.id,
            relativePath: file.relativePath,
            page: savedPage,
            sourceLanguage: pendingTranslation.sourceLanguage,
            targetLanguage: pendingTranslation.targetLanguage,
            engine: pendingTranslation.engine,
            model: pendingTranslation.model,
            sourceText: pendingTranslation.sourceText,
            translatedText: correctedText,
          }),
        });
        applyServerState(
          translationData,
          file.id,
          appState.selectedIndex
        );
        appState.pendingMainTextTranslation = null;
        translationPairSaved = true;
      } catch (error) {
        translationPairError = error.message;
      }
    }
    if (!silent) {
      showToast(
        translationPairSaved
          ? "本页全文已保存，并已保留翻译前后对照"
          : translationPairError
            ? "本页全文已保存，但翻译前后对照未能同步保存"
            : creatingManual
              ? "本页全文已保存并可用于对照笔记"
              : "本页全文已保存",
        translationPairError ? "error" : "success"
      );
    }
    if (translationPairError) {
      setStatus(`翻译前后对照未能同步保存：${translationPairError}`);
    }
    return true;
  } catch (error) {
    showToast(error.message, "error");
    return false;
  } finally {
    setBusy(false);
    renderOcrWorkspace();
  }
}

function showMainTextEditor() {
  appState.detailsView = "ocr-text";
  appState.foreignTextMode = "ocr";
  appState.ocrSurface = "corrected";
  renderDetailsView();
  elements.ocrCorrectedText.focus({ preventScroll: true });
}

function floatCurrentMainText() {
  const file = selectedFile();
  const entry = currentOcrRegion();
  const page = appState.ocrPage;
  openFloatingReader(
    file?.title || file?.originalName || "当前文本",
    `第 ${appState.ocrPage} 页 · 当前编辑文本`,
    mainTextPlain(),
    {
      editable: true,
      saveText: async (text) => {
        if (
          selectedFile()?.id !== file?.id ||
          appState.ocrPage !== page ||
          (entry?.id || "") !== (currentOcrRegion()?.id || "")
        ) {
          return false;
        }
        setMainText(text);
        appState.ocrCorrectedDirty = true;
        return saveOcrCorrected({ silent: true });
      },
    }
  );
}

async function runMainTextAiSentence() {
  const sourceText = mainTextPlain();
  if (appState.busy) return;
  if (!sourceText) {
    showToast("请先在当前文本框中输入或识别文字", "error");
    return;
  }
  const provider =
    appState.aiSentenceSettings.provider ||
    elements.aiChatProviderSelect.value ||
    "qwen";
  const providerName =
    appState.aiSentenceSettings.providerName ||
    (provider === "deepseek"
      ? "DeepSeek"
      : provider === "claude"
        ? "Claude"
        : "千问");
  if (
    !(await confirmAction(
      `确认将当前文本发送给${providerName}进行 AI 断句吗？返回内容会写回同一编辑框，但不会自动保存。`
    ))
  ) {
    return;
  }
  setBusy(true);
  setStatus(`正在使用${providerName}处理当前文本…`);
  try {
    const result = await requestAiSentence(
      sourceText,
      true,
      "segment",
      provider
    );
    appState.pendingMainTextTranslation = null;
    setMainText(result);
    appState.ocrCorrectedDirty = true;
    showMainTextEditor();
    showToast("AI 断句结果已写回当前文本框，请人工复核后保存");
    setStatus("AI 断句结果尚未保存");
  } catch (error) {
    showToast(error.message, "error");
    setStatus(`AI 断句未完成：${error.message}`);
  } finally {
    setBusy(false);
  }
}

async function runMainTextTranslation() {
  const file = selectedFile();
  const sourceText = mainTextPlain();
  if (appState.busy) return;
  if (!isForeignSource()) {
    showToast("当前材料已设为中文，不显示 AI 翻译操作", "error");
    return;
  }
  if (!sourceText) {
    showToast("请先在当前文本框中输入或识别外文", "error");
    return;
  }
  const engine = selectedTranslationEngine();
  const engineName = translationEngineLabel(engine);
  if (
    !(await confirmAction(
      `确认使用${engineName}翻译当前文本吗？译文会写回同一编辑框，但不会自动保存。`
    ))
  ) {
    return;
  }
  setBusy(true);
  setStatus(`正在使用${engineName}翻译当前文本…`);
  try {
    const result = await translateTextUsingEngine(
      sourceText,
      engine,
      elements.translationSourceLanguage.value,
      "zh",
      true
    );
    appState.pendingMainTextTranslation = {
      recordId: file?.id || "",
      relativePath: file?.relativePath || "",
      page: appState.ocrPage,
      regionId: currentOcrRegion(file, appState.ocrPage)?.id || "",
      sourceLanguage: elements.translationSourceLanguage.value,
      targetLanguage: "zh",
      engine: result.engine || engine,
      model: String(result.model || ""),
      sourceText,
    };
    setMainText(String(result.text || "").trim());
    appState.ocrCorrectedDirty = true;
    showMainTextEditor();
    showToast("译文已写回当前文本框，请人工复核后保存");
    setStatus("翻译结果尚未保存");
  } catch (error) {
    showToast(error.message, "error");
    setStatus(`翻译未完成：${error.message}`);
  } finally {
    setBusy(false);
  }
}

function resetOcrCorrected() {
  const entry = currentOcrRegion();
  const savedText = entry?.correctedText || entry?.rawText || "";
  if (!savedText) return;
  appState.pendingMainTextTranslation = null;
  setMainText(savedText, entry?.correctedRichText || []);
  appState.ocrCorrectedDirty = false;
  elements.ocrCorrectedText.focus();
  showToast(
    entry.correctedText
      ? "已恢复为上次保存的手工校订"
      : "已恢复 OCR 原文草稿；尚未保存为最终文本"
  );
}

async function useOcrAsCorrection() {
  const entry = currentOcrRegion();
  if (!entry?.rawText) return;
  const existingText = mainTextPlain();
  if (
    existingText &&
    existingText !== entry.rawText &&
    !(await confirmAction(
      "当前编辑框中已有手工校订。采用 OCR 原文会替换尚未再次保存的编辑内容，确定继续吗？"
    ))
  ) {
    return;
  }
  appState.pendingMainTextTranslation = null;
  setMainText(entry.rawText);
  appState.ocrCorrectedDirty = true;
  elements.ocrCorrectedText.focus();
  showToast("OCR 原文已放入编辑框；保存后才会成为新的手工校订");
}

async function beginManualCorrectedDraft() {
  if (!selectedFile() || appState.busy) return;
  if (!(await confirmDiscardUnsavedCorrection())) return;
  appState.pendingMainTextTranslation = null;
  appState.manualCorrectedDraft = true;
  appState.selectedOcrRegionId = "";
  appState.ocrCorrectedDirty = false;
  renderOcrWorkspace();
  elements.ocrCorrectedText.focus();
  showToast("现在可以直接手工录入校订文本");
}

function annotationPage() {
  return Math.min(
    9999,
    Math.max(1, Number.parseInt(elements.annotationPageInput.value, 10) || 1)
  );
}

function annotationLocationLabel(page = annotationPage()) {
  return appState.previewKind === "pdf" ? `PDF 第 ${page} 页` : "图片框选";
}

function setAnnotationMode(active) {
  annotationState.active = Boolean(active && selectedFile());
  annotationState.drawing = false;
  annotationState.pointerId = null;
  annotationState.drawBounds = null;
  if (annotationState.active) {
    imageView.active = true;
    applyImageView();
    elements.annotationModeButton.textContent = "取消框选区域";
    elements.annotationModeButton.classList.add("active");
    elements.annotationLayer.classList.add("drawing-enabled");
    elements.previewStage.classList.add("annotation-mode");
    elements.zoomHint.textContent =
      "框选区域：滚轮仍可缩放 · 拖出矩形；需要移动时点击“移动原件”";
  } else {
    elements.annotationModeButton.textContent = "□ 框选区域";
    elements.annotationModeButton.classList.remove("active");
    elements.annotationLayer.classList.remove("drawing-enabled");
    elements.previewStage.classList.remove("annotation-mode");
    if (appState.previewKind === "pdf" && imageView.active) {
      elements.zoomHint.textContent =
        "移动模式：滚轮缩放 · 按住鼠标左键拖动；点击“框选区域”继续画框";
    } else if (appState.previewKind === "pdf") {
      elements.zoomHint.textContent =
        "普通模式：滚轮翻阅 PDF · 进入缩放模式后滚轮缩放并拖动";
    } else if (appState.previewKind === "image" && imageView.active) {
      elements.zoomHint.textContent =
        "移动模式：滚轮缩放 · 按住鼠标左键拖动；点击“框选区域”继续画框";
    } else if (appState.previewKind === "image") {
      elements.zoomHint.textContent =
        "单击图片后滚轮缩放 · 放大后按住鼠标拖动";
    }
    applyImageView();
  }
}

function cancelAnnotationDraft() {
  annotationState.drawing = false;
  annotationState.pointerId = null;
  annotationState.drawBounds = null;
  annotationState.draft = null;
  elements.annotationDraftText.value = "";
  elements.annotationDraftEditor.classList.add("hidden");
  renderAnnotationLayer();
}

function renderAnnotationLayer() {
  const file = selectedFile();
  const page = annotationPage();
  const saved = (file?.annotations || [])
    .filter(
      (item) => appState.previewKind !== "pdf" || Number(item.page) === page
    )
    .map((item) =>
      item.id === annotationState.editId && annotationState.editRect
        ? { ...item, ...annotationState.editRect, editing: true }
        : item
    );
  const visible = [...saved];
  if (annotationState.draft) visible.push({ ...annotationState.draft, draft: true });
  const positioned = visible.map((item) => annotationStageRect(item));

  elements.annotationLayer.innerHTML = positioned
    .map(
      (item) => `
        <div class="annotation-rect ${escapeHtml(item.color || "red")}${
        item.draft ? " draft" : ""
      }${item.id === annotationState.highlightId ? " highlighted" : ""}${
        appState.detailsView === "screenshot-storage" &&
        item.id === appState.screenshotAnnotationId
          ? " screenshot-selected"
          : ""
      }"
          ${item.id ? `data-annotation-id="${escapeHtml(item.id)}"` : ""}
          ${item.editing ? 'data-editing-annotation="true"' : ""}
          style="left:${Number(item.x) * 100}%;top:${Number(item.y) * 100}%;
            width:${Number(item.width) * 100}%;height:${Number(item.height) * 100}%"
          title="${escapeHtml(annotationSystemLabel(item, file))}">
          ${
            item.editing
              ? `
                <span class="annotation-resize-handle nw" data-resize-handle="nw"></span>
                <span class="annotation-resize-handle ne" data-resize-handle="ne"></span>
                <span class="annotation-resize-handle sw" data-resize-handle="sw"></span>
                <span class="annotation-resize-handle se" data-resize-handle="se"></span>`
              : ""
          }
        </div>`
    )
    .join("");
  renderPdfContinuousAnnotationLayers();
}

function renderPdfContinuousAnnotationLayers() {
  const file = selectedFile();
  const annotations = Array.isArray(file?.annotations) ? file.annotations : [];
  elements.pdfContinuousPreview
    .querySelectorAll("[data-pdf-annotation-page]")
    .forEach((layer) => {
      const page = Number(layer.dataset.pdfAnnotationPage);
      layer.innerHTML = annotations
        .filter((item) => Number(item.page) === page)
        .map((item) => annotationMediaRect(item))
        .map(
          (item) => `
            <div class="annotation-rect ${escapeHtml(item.color || "red")}${
              appState.detailsView === "screenshot-storage" &&
              item.id === appState.screenshotAnnotationId
                ? " screenshot-selected"
                : ""
            }"
              data-annotation-id="${escapeHtml(item.id)}"
              style="left:${Number(item.x) * 100}%;top:${Number(item.y) * 100}%;
                width:${Number(item.width) * 100}%;height:${
                  Number(item.height) * 100
                }%"
              title="${escapeHtml(annotationSystemLabel(item, file))}"></div>`
        )
        .join("");
    });
}

function renderResearchNotes() {
  const file = selectedFile();
  const annotations = file?.annotations || [];
  const researchNotes = file?.researchNotes || [];
  if (annotationListState.recordId !== (file?.id || "")) {
    annotationListState = {
      recordId: file?.id || "",
      query: "",
      page: 1,
    };
    if (elements.annotationSearchInput) {
      elements.annotationSearchInput.value = "";
    }
  }
  const searchQuery = String(annotationListState.query || "")
    .trim()
    .toLocaleLowerCase();
  const filteredAnnotations = annotations.filter((annotation) => {
    if (!searchQuery) return true;
    return `${annotation.text || ""}\n${annotationOcrDisplayText(
      annotation,
      file
    )}`
      .toLocaleLowerCase()
      .includes(searchQuery);
  });
  const totalPages = Math.max(
    1,
    Math.ceil(filteredAnnotations.length / ANNOTATION_PAGE_SIZE)
  );
  annotationListState.page = Math.min(
    Math.max(1, annotationListState.page),
    totalPages
  );
  const pageStart = (annotationListState.page - 1) * ANNOTATION_PAGE_SIZE;
  const visibleAnnotations = filteredAnnotations.slice(
    pageStart,
    pageStart + ANNOTATION_PAGE_SIZE
  );
  elements.researchNoteCount.textContent = WorkbenchUiRules.optionalCount(
    researchNotes.length,
    (count) => `${count} 条`
  );
  elements.researchNoteCount.classList.toggle(
    "hidden",
    researchNotes.length === 0
  );
  const notesTotal = annotations.length + researchNotes.length;
  elements.notesViewCount.textContent = WorkbenchUiRules.optionalCount(notesTotal);
  elements.notesViewCount.classList.toggle("hidden", notesTotal === 0);
  elements.notesViewCount.classList.toggle("three-digit", notesTotal >= 100);

  elements.annotationSearchCount.textContent = searchQuery
    ? `找到 ${filteredAnnotations.length} 条`
    : WorkbenchUiRules.optionalCount(
        annotations.length,
        (count) => `共 ${count} 条`
      );
  elements.annotationSearchCount.classList.toggle(
    "hidden",
    !elements.annotationSearchCount.textContent
  );
  elements.annotationList.innerHTML = visibleAnnotations.length
    ? visibleAnnotations
        .map((item) => {
          const contentMatches = searchQuery
            ? annotationOcrDisplayText(item, file)
                .toLocaleLowerCase()
                .includes(searchQuery)
            : false;
          const compact = contentMatches ? false : annotationCardIsCompact(item);
          const foreignAnnotation = isForeignSource();
          return `
            <article data-annotation-card="${escapeHtml(item.id)}"
              class="annotation-note-item${compact ? " compact" : ""}">
              <div class="annotation-note-header">
                <div class="annotation-jump">
                  <span class="annotation-color-dot ${escapeHtml(
                    item.color || "red"
                  )}"></span>
                  <span class="annotation-record-column">
                    <div class="annotation-record-line">
                      <button type="button" class="annotation-record-display"
                        data-edit-annotation-record="${escapeHtml(item.id)}"
                        title="点击打开完整编辑窗口">${richTextHtml(
                          item.recordRichText,
                          item.text || "未填写框选记录"
                        )}</button>
                      <button type="button" class="annotation-record-toggle"
                        data-toggle-saved-annotation="${escapeHtml(item.id)}"
                        aria-label="${compact ? "展开框选内容" : "收起框选内容"}"
                        title="${compact ? "展开框选内容" : "收起框选内容"}">
                        <span aria-hidden="true">${compact ? "⌄" : "⌃"}</span>
                      </button>
                    </div>
                    <button type="button" class="annotation-location-jump"
                      data-jump-annotation="${escapeHtml(item.id)}">
                      ${escapeHtml(annotationLocationLabel(item.page))} · ${escapeHtml(
                        formatTime(item.updatedAt || item.createdAt)
                      )}
                    </button>
                  </span>
                </div>
                <div class="annotation-note-actions">
                  <button type="button" class="note-edit"
                    data-jump-annotation="${escapeHtml(item.id)}">跳回原图</button>
                  <button type="button" class="note-edit"
                    data-float-annotation="${escapeHtml(item.id)}">悬浮阅读</button>
                  <button type="button" class="note-edit"
                    data-ocr-annotation="${escapeHtml(item.id)}">OCR 此框</button>
                  <button type="button" class="note-edit"
                    data-run-annotation-ai="${escapeHtml(
                      item.id
                    )}" data-annotation-ai-task="sentence">AI 断句</button>
                  ${
                    foreignAnnotation
                      ? `<button type="button" class="note-edit"
                          data-run-annotation-ai="${escapeHtml(
                            item.id
                          )}" data-annotation-ai-task="translation">AI 翻译</button>`
                      : ""
                  }
                  <button type="button" class="note-edit"
                    data-edit-annotation="${escapeHtml(item.id)}">调整框选</button>
                  <button type="button" class="note-delete annotation-delete-button"
                    data-delete-annotation="${escapeHtml(item.id)}"
                    aria-label="删除这条框选批注">删除框选</button>
                </div>
              </div>
              <div class="annotation-ocr-preview">
                <div class="rich-text-editor annotation-rich-editor${
                  compact ? " annotation-compact-preview" : ""
                }"
                  contenteditable="${compact ? "false" : "true"}"
                  role="textbox" aria-multiline="true"
                  aria-readonly="${compact ? "true" : "false"}"
                  tabindex="0"
                  data-annotation-content-input="${escapeHtml(
                    item.id
                  )}"
                  data-placeholder="可直接手工输入或修改此框选的对照文本">${richTextHtml(
                    annotationOcrDisplayEntry(item, file)?.correctedRichText,
                    annotationOcrDisplayText(item, file)
                  )}</div>
                <div class="annotation-content-actions">
                  <button type="button" class="note-edit"
                    data-quote-annotation="${escapeHtml(
                      item.id
                    )}">引用至记录笔记</button>
                  <button type="button" class="note-edit"
                    data-save-annotation-content="${escapeHtml(
                      item.id
                    )}">保存框选内容</button>
                </div>
              </div>
            </article>`;
        })
        .join("")
    : searchQuery
      ? '<div class="notes-empty">没有找到符合当前关键字的框选记录或框选内容。</div>'
      : '<div class="notes-empty">尚未框选原件；点击预览区左上角“框选区域”开始。</div>';

  if (filteredAnnotations.length > ANNOTATION_PAGE_SIZE) {
    const visiblePageNumbers = [
      1,
      totalPages,
      annotationListState.page - 2,
      annotationListState.page - 1,
      annotationListState.page,
      annotationListState.page + 1,
      annotationListState.page + 2,
    ]
      .filter((page) => page >= 1 && page <= totalPages)
      .filter((page, index, pages) => pages.indexOf(page) === index)
      .sort((a, b) => a - b);
    const pageButtons = visiblePageNumbers
      .map(
        (page, index) => `${
          index > 0 && page - visiblePageNumbers[index - 1] > 1
            ? '<span aria-hidden="true">…</span>'
            : ""
        }<button type="button" data-annotation-page="${page}"
            class="${page === annotationListState.page ? "active" : ""}"
            aria-label="第 ${page} 页" aria-current="${
              page === annotationListState.page ? "page" : "false"
            }">${page}</button>`
      )
      .join("");
    elements.annotationPagination.innerHTML = `
      <button type="button" data-annotation-page="${annotationListState.page - 1}"
        ${annotationListState.page <= 1 ? "disabled" : ""}>上一页</button>
      ${pageButtons}
      <button type="button" data-annotation-page="${annotationListState.page + 1}"
        ${annotationListState.page >= totalPages ? "disabled" : ""}>下一页</button>`;
    elements.annotationPagination.classList.remove("hidden");
  } else {
    elements.annotationPagination.innerHTML = "";
    elements.annotationPagination.classList.add("hidden");
  }

  elements.researchNoteList.innerHTML = researchNotes.length
    ? researchNotes
        .map((item) => {
          const editing = appState.editingResearchNoteId === item.id;
          return editing
            ? `
            <article class="research-note-item editing">
              <div class="research-note-edit-body">
                <div class="rich-text-editor research-note-saved-editor"
                  contenteditable="true" role="textbox" aria-multiline="true"
                  data-research-note-edit-input="${escapeHtml(item.id)}"
                  data-placeholder="修改这条研究笔记">${richTextHtml(
                    item.richText,
                    item.text
                  )}</div>
                <small>正在修改 · 原保存时间 ${escapeHtml(
                  formatTime(item.updatedAt || item.createdAt)
                )}</small>
              </div>
              <div class="research-note-actions">
                <button type="button" class="note-edit"
                  data-save-note-edit="${escapeHtml(item.id)}">保存修改</button>
                <button type="button" class="note-edit"
                  data-cancel-note-edit="${escapeHtml(item.id)}">取消</button>
              </div>
            </article>`
            : `
            <article class="research-note-item">
              <div>
                <div class="research-note-rich-text">${richTextHtml(
                  item.richText,
                  item.text
                )}</div>
                <small>记录笔记 · ${escapeHtml(
                  formatTime(item.updatedAt || item.createdAt)
                )}</small>
              </div>
              <div class="research-note-actions">
                <button type="button" class="note-edit"
                  data-edit-note="${escapeHtml(item.id)}">修改</button>
                <button type="button" class="note-edit"
                  data-float-note="${escapeHtml(item.id)}">悬浮阅读</button>
                <button type="button" class="note-delete"
                  data-delete-note="${escapeHtml(item.id)}"
                  aria-label="删除这条研究笔记">×</button>
              </div>
            </article>`;
        })
        .join("")
    : '<div class="notes-empty">尚未添加对整份资料的记录笔记。</div>';

  elements.annotationList
    .querySelectorAll("[data-toggle-saved-annotation]")
    .forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const annotationId = button.dataset.toggleSavedAnnotation;
        if (expandedSavedAnnotationIds.has(annotationId)) {
          expandedSavedAnnotationIds.delete(annotationId);
        } else {
          expandedSavedAnnotationIds.add(annotationId);
        }
        renderResearchNotes();
      });
    });
  elements.annotationList
    .querySelectorAll("[data-edit-annotation-record]")
    .forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        openAnnotationRecordEditor(button.dataset.editAnnotationRecord);
      });
    });
  elements.annotationPagination
    .querySelectorAll("[data-annotation-page]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        if (button.disabled) return;
        annotationListState.page = Number(button.dataset.annotationPage) || 1;
        renderResearchNotes();
        elements.annotationList.scrollIntoView({ block: "start" });
      });
    });
  elements.annotationList
    .querySelectorAll("[data-jump-annotation]")
    .forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        jumpToAnnotation(button.dataset.jumpAnnotation);
      });
    });
  elements.annotationList
    .querySelectorAll("[data-float-annotation]")
    .forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const annotation = annotations.find(
          (item) => item.id === button.dataset.floatAnnotation
        );
        if (!annotation) return;
        openFloatingReader(
          annotationSystemLabel(annotation, file),
          annotationLocationLabel(annotation.page),
          annotationOcrDisplayText(annotation, file),
          {
            editable: true,
            saveText: async (text) => {
              if (selectedFile()?.id !== file.id) return false;
              return saveAnnotationContent(
                annotation.id,
                text,
                normalizedRichTextSegments([], text),
                { silent: true }
              );
            },
          }
        );
      });
    });
  elements.annotationList
    .querySelectorAll("[data-ocr-annotation]")
    .forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const annotation = annotations.find(
          (item) => item.id === button.dataset.ocrAnnotation
        );
        if (annotation) {
          recognizeOcrSelection(annotation, "region", annotation.id, true);
        }
      });
    });
  elements.annotationList
    .querySelectorAll("[data-run-annotation-ai]")
    .forEach((button) => {
      button.addEventListener("click", async (event) => {
        event.stopPropagation();
        if (appState.busy) return;
        const annotationId = button.dataset.runAnnotationAi;
        const annotation = annotations.find((item) => item.id === annotationId);
        if (!annotation) return;
        const card = button.closest(".annotation-note-item");
        const currentEditor = card?.querySelector(
          "[data-annotation-content-input]"
        );
        const sourceRichText = currentEditor
          ? richEditorSegments(currentEditor)
          : normalizedRichTextSegments(
              annotationOcrDisplayEntry(annotation, file)?.correctedRichText,
              annotationOcrDisplayText(annotation, file)
            );
        const sourceText = (
          currentEditor
            ? richTextPlain(sourceRichText)
            : annotationOcrDisplayText(annotation, file)
        ).trim();
        if (!sourceText) {
          showToast("当前框选没有可处理的文字", "error");
          return;
        }
        const task = button.dataset.annotationAiTask;
        let resultText = "";
        let translationDraft = null;
        button.disabled = true;
        try {
          if (task === "translation") {
            const engine = elements.translationEngineSelect.value || "argos";
            const consent =
              !isCloudTranslationEngine(engine) ||
              await confirmAction(
                `确认将当前框选文字发送给${translationEngineLabel(
                  engine
                )}进行翻译？`
              );
            if (!consent) return;
            openFloatingReader(
              `${annotationSystemLabel(annotation, file)} · 翻译前文本`,
              "",
              sourceText
            );
            setStatus(
              `正在使用${translationEngineLabel(engine)}翻译框选文本…`
            );
            const result = await translateTextUsingEngine(
              sourceText,
              engine,
              elements.translationSourceLanguage.value,
              elements.translationTargetLanguage.value,
              consent
            );
            resultText = String(result.text || "").trim();
            translationDraft = {
              recordId: file.id,
              annotationId,
              sourceText,
              sourceRichText,
              sourceLanguage: elements.translationSourceLanguage.value,
              targetLanguage: elements.translationTargetLanguage.value,
              engine: result.engine || engine,
              model: String(result.model || ""),
            };
            showToast("框选文本翻译完成，请人工复核");
          } else {
            const provider =
              appState.aiSentenceSettings.provider ||
              elements.aiSentenceProviderSelect.value ||
              "qwen";
            const consent = await confirmAction(
              `确认将当前框选文字发送给${translationEngineLabel(
                provider
              )}进行 AI 断句？`
            );
            if (!consent) return;
            openFloatingReader(
              `${annotationSystemLabel(annotation, file)} · 断句前文本`,
              "",
              sourceText
            );
            setStatus(
              `正在使用${translationEngineLabel(provider)}进行框选文本 AI 断句…`
            );
            resultText = String(
              await requestAiSentence(
                sourceText,
                consent,
                "segment",
                provider
              )
            ).trim();
            showToast("框选文本 AI 断句完成，请人工复核");
          }
          if (!resultText) {
            throw new Error("处理结果为空");
          }
          if (translationDraft) {
            appState.pendingAnnotationTranslations.set(
              annotationId,
              translationDraft
            );
          } else {
            appState.pendingAnnotationTranslations.delete(annotationId);
          }
          expandedSavedAnnotationIds.add(annotationId);
          renderResearchNotes();
          const targetEditor = elements.annotationList.querySelector(
            `[data-annotation-content-input="${CSS.escape(annotationId)}"]`
          );
          if (targetEditor) {
            setRichEditorSegments(targetEditor, [
              {
                text: resultText,
                color: "black",
                size: 14,
                bold: false,
              },
            ]);
            targetEditor.focus();
          }
          setStatus(
            task === "translation"
              ? "翻译结果已写入框选内容草稿；点击“保存框选内容”后保存"
              : "断句结果已写入框选内容草稿；点击“保存框选内容”后保存"
          );
        } catch (error) {
          showToast(error.message, "error");
          setStatus(
            `${task === "translation" ? "AI 翻译" : "AI 断句"}未完成：${
              error.message
            }`
          );
        } finally {
          button.disabled = false;
        }
      });
    });
  elements.annotationList
    .querySelectorAll("[data-save-annotation-content]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const input = button
          .closest(".annotation-note-item")
          ?.querySelector("[data-annotation-content-input]");
        if (!input) return;
        const richText = richEditorSegments(input);
        saveAnnotationContent(
          button.dataset.saveAnnotationContent,
          richTextPlain(richText),
          richText
        );
      });
    });
  elements.annotationList
    .querySelectorAll("[data-quote-annotation]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".annotation-note-item");
        const editor = card?.querySelector("[data-annotation-content-input]");
        quoteAnnotationToResearchNote(
          button.dataset.quoteAnnotation,
          editor
        );
      });
    });
  elements.annotationList
    .querySelectorAll("[data-edit-annotation]")
    .forEach((button) => {
      button.addEventListener("click", () =>
        beginAnnotationEdit(button.dataset.editAnnotation)
      );
    });
  elements.annotationList
    .querySelectorAll("[data-delete-annotation]")
    .forEach((button) => {
      button.addEventListener("click", () =>
        deleteAnnotation(button.dataset.deleteAnnotation)
      );
    });
  elements.researchNoteList
    .querySelectorAll("[data-edit-note]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        appState.editingResearchNoteId = button.dataset.editNote;
        renderResearchNotes();
        elements.researchNoteList
          .querySelector(
            `[data-research-note-edit-input="${CSS.escape(
              button.dataset.editNote
            )}"]`
          )
          ?.focus();
      });
    });
  elements.researchNoteList
    .querySelectorAll("[data-save-note-edit]")
    .forEach((button) => {
      button.addEventListener("click", () =>
        saveResearchNoteEdit(button.dataset.saveNoteEdit)
      );
    });
  elements.researchNoteList
    .querySelectorAll("[data-cancel-note-edit]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        appState.editingResearchNoteId = "";
        renderResearchNotes();
      });
    });
  elements.researchNoteList
    .querySelectorAll("[data-float-note]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const note = researchNotes.find(
          (item) => item.id === button.dataset.floatNote
        );
        if (!note) return;
        openFloatingReader(
          "记录笔记",
          formatTime(note.updatedAt || note.createdAt),
          note.text,
          {
            editable: true,
            saveText: async (text) => {
              if (selectedFile()?.id !== file.id) return false;
              const data = await request("/api/research-notes", {
                method: "POST",
                body: JSON.stringify({
                  action: "update",
                  recordId: file.id,
                  relativePath: file.relativePath,
                  noteId: note.id,
                  text,
                  richText: normalizedRichTextSegments([], text),
                }),
              });
              applyServerState(data, file.id, appState.selectedIndex);
              return true;
            },
          }
        );
      });
    });
  elements.researchNoteList
    .querySelectorAll("[data-delete-note]")
    .forEach((button) => {
      button.addEventListener("click", () =>
        deleteResearchNote(button.dataset.deleteNote)
      );
    });
  elements.researchNoteList
    .querySelectorAll("[data-open-note-reference]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const type = button.dataset.openNoteReference;
        const page = normalizedOcrPage(button.dataset.noteReferencePage);
        const regionId = button.dataset.noteReferenceRegion || "";
        if (type === "original") {
          setOcrPage(page, true);
          elements.previewStage.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          return;
        }
        appState.ocrReferenceType =
          type === "ocr-raw" ? "raw" : "corrected";
        setOcrPage(page, true);
        appState.selectedOcrRegionId = regionId;
        appState.ocrSurface = "corrected";
        switchDetailsView("ocr-text");
        renderOcrWorkspace();
        elements.ocrReferenceDisclosure.open = true;
        elements.ocrReferenceText.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    });
}

function goToPdfAnnotationPage(page = annotationPage()) {
  const nextPage = Math.min(
    pdfAnnotationPageLimit(),
    Math.max(1, Number(page) || 1)
  );
  elements.annotationPageInput.value = String(nextPage);
  syncOcrPageFromOriginal(nextPage);
  if (appState.previewKind === "pdf" && appState.previewUrl) {
    if (!elements.pdfSelectionPreview.classList.contains("hidden")) {
      showPdfSelectionPage(nextPage).catch((error) => {
        showToast(
          `无法生成 PDF 第 ${nextPage} 页截图：${error.message}`,
          "error"
        );
      });
    } else if (pdfContinuousReady) {
      scrollPdfContinuousToPage(nextPage, true);
    } else {
      elements.pdfPreview.src = `${appState.previewUrl}#page=${nextPage}`;
    }
  }
  syncPdfAnnotationPageControls();
  renderAnnotationLayer();
}

function stepPdfAnnotationPage(direction) {
  if (appState.previewKind !== "pdf" || appState.busy) return;
  setAnnotationMode(false);
  goToPdfAnnotationPage(annotationPage() + direction);
}

async function jumpToAnnotation(annotationId) {
  const file = selectedFile();
  const annotation = (file?.annotations || []).find(
    (item) => item.id === annotationId
  );
  if (!annotation) return;
  setAnnotationMode(false);
  cancelAnnotationDraft();
  if (appState.previewKind === "pdf") {
    const nextPage = normalizedOcrPage(annotation.page);
    elements.annotationPageInput.value = String(nextPage);
    try {
      setStatus(`正在打开 PDF 第 ${nextPage} 页框选截图…`);
      await showPdfSelectionPage(nextPage);
    } catch (error) {
      showToast(`无法打开 PDF 框选截图：${error.message}`, "error");
      setStatus(error.message);
      return;
    }
  }
  imageView.active = true;
  const stageBounds = elements.previewStage.getBoundingClientRect();
  const displayedAnnotation = annotationStageRect(annotation);
  const centerX =
    Number(displayedAnnotation.x) + Number(displayedAnnotation.width) / 2;
  const centerY =
    Number(displayedAnnotation.y) + Number(displayedAnnotation.height) / 2;
  imageView.x = (0.5 - centerX) * stageBounds.width * imageView.scale;
  imageView.y = (0.5 - centerY) * stageBounds.height * imageView.scale;
  applyImageView();
  annotationState.highlightId = annotation.id;
  renderAnnotationLayer();
  elements.previewStage.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => {
    if (annotationState.highlightId === annotation.id) {
      annotationState.highlightId = "";
      renderAnnotationLayer();
    }
  }, 2400);
  showToast(`已跳到${annotationLocationLabel(annotation.page)}`);
}

function showAnnotationCardFromPreview(annotationId) {
  if (!annotationId) return;
  if (appState.detailsView === "screenshot-storage") {
    appState.screenshotAnnotationId = annotationId;
    annotationState.highlightId = "";
    renderAnnotationLayer();
    renderPdfContinuousAnnotationLayers();
    showToast("已选中当前框选，可直接保存当前框选 PNG");
    setStatus("截图存储已选中此框；再次选择其他框可随时切换。");
    return;
  }
  if (appState.focusReading) {
    openAnnotationFloatingEditor(annotationId);
    setStatus("已打开可移动的框选内容编辑窗口");
    return;
  }
  setAnnotationMode(false);
  expandedSavedAnnotationIds.add(annotationId);
  appState.notesSurface = "annotations";
  switchDetailsView("notes");
  renderResearchNotes();
  window.requestAnimationFrame(() => {
    const card = elements.annotationList.querySelector(
      `[data-annotation-card="${CSS.escape(annotationId)}"]`
    );
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.add("annotation-card-highlight");
    window.setTimeout(
      () => card.classList.remove("annotation-card-highlight"),
      1800
    );
  });
  setStatus("已定位到该框选对应的研究笔记批注");
}

async function beginAnnotationEdit(annotationId) {
  const file = selectedFile();
  const annotation = (file?.annotations || []).find(
    (item) => item.id === annotationId
  );
  if (!annotation) return;
  await jumpToAnnotation(annotationId);
  annotationState.highlightId = "";
  annotationState.editId = annotation.id;
  const editableAnnotation = annotationMediaRect(annotation);
  annotationState.editOriginal = {
    page: Number(annotation.page) || 1,
    x: Number(editableAnnotation.x),
    y: Number(editableAnnotation.y),
    width: Number(editableAnnotation.width),
    height: Number(editableAnnotation.height),
    coordinateSpace: "media",
  };
  annotationState.editRect = { ...annotationState.editOriginal };
  annotationState.editAction = "";
  elements.annotationEditBar.classList.remove("hidden");
  appState.notesSurface = "annotations";
  switchDetailsView("notes");
  renderAnnotationLayer();
  renderResearchNotes();
  setStatus("正在调整框选：拖动矩形移动，拖动四角改变大小");
}

function cancelAnnotationEdit(showMessage = true) {
  if (!annotationState.editId) return;
  annotationState.editId = "";
  annotationState.editOriginal = null;
  annotationState.editRect = null;
  annotationState.editAction = "";
  annotationState.editPointerRect = null;
  annotationState.editBounds = null;
  elements.annotationEditBar.classList.add("hidden");
  renderAnnotationLayer();
  renderResearchNotes();
  if (showMessage) setStatus("已取消调整框选");
}

async function saveAnnotationEdit(options = {}) {
  const file = selectedFile();
  const rect = annotationState.editRect
    ? normalizedAnnotationEditRect(annotationState.editRect)
    : null;
  const annotationId = annotationState.editId;
  if (!file || !rect || !annotationId || appState.busy) return false;
  if (rect.width < 0.005 || rect.height < 0.005) {
    showToast("调整后的框选范围太小", "error");
    return false;
  }
  setBusy(true);
  try {
    const data = await request("/api/annotations", {
      method: "POST",
      body: JSON.stringify({
        action: "update",
        recordId: file.id,
        relativePath: file.relativePath,
        annotationId,
        page: rect.page,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        coordinateSpace: "media",
      }),
    });
    const updatedFile = (data.files || []).find((item) => item.id === file.id);
    const updatedAnnotation = (updatedFile?.annotations || []).find(
      (item) => item.id === annotationId
    );
    if (!annotationEditRectsMatch(updatedAnnotation, rect)) {
      throw new Error("新位置未被完整保存，请保留当前调整框并重试");
    }
    annotationState.editId = "";
    annotationState.editOriginal = null;
    annotationState.editRect = null;
    annotationState.editAction = "";
    annotationState.editPointerRect = null;
    annotationState.editBounds = null;
    elements.annotationEditBar.classList.add("hidden");
    applyServerState(data, file.id, appState.selectedIndex);
    appState.notesSurface = "annotations";
    switchDetailsView("notes");
    if (!options.silent) showToast("框选的新位置和大小已保存");
    setStatus(
      options.silent
        ? "框选的新位置已同步保存，正在继续保存框选内容"
        : "框选的位置和大小已更新"
    );
    return true;
  } catch (error) {
    showToast(error.message, "error");
    return false;
  } finally {
    setBusy(false);
  }
}

function nextDefaultAnnotationName(file = selectedFile()) {
  let largestNumber = 0;
  (file?.annotations || []).forEach((annotation) => {
    const match = String(annotation.text || "").trim().match(/^默认(\d+)$/u);
    if (match) {
      largestNumber = Math.max(largestNumber, Number(match[1]) || 0);
    }
  });
  return `默认${largestNumber + 1}`;
}

async function saveAutomaticAnnotation(draft, options = {}) {
  const file = selectedFile();
  if (!file || !draft || appState.busy) return;
  const mediaDraft =
    draft.coordinateSpace === "media" ? draft : stageRectToMediaRect(draft);
  const text = nextDefaultAnnotationName(file);
  let savedAnnotation = null;
  setBusy(true);
  setStatus(`正在保存框选位置“${text}”…`);
  try {
    const data = await request("/api/annotations", {
      method: "POST",
      body: JSON.stringify({
        action: "add",
        recordId: file.id,
        relativePath: file.relativePath,
        page: mediaDraft.page,
        x: mediaDraft.x,
        y: mediaDraft.y,
        width: mediaDraft.width,
        height: mediaDraft.height,
        coordinateSpace: "media",
        color: mediaDraft.color,
        text,
      }),
    });
    annotationState.draft = null;
    elements.annotationDraftText.value = "";
    elements.annotationDraftEditor.classList.add("hidden");
    applyServerState(data, file.id, appState.selectedIndex);
    savedAnnotation = (selectedFile()?.annotations || []).find(
      (item) => item.id === data.annotationId
    );
    annotationState.highlightId = data.annotationId || "";
    renderResearchNotes();
    renderAnnotationLayer();
    if (options.preserveScreenshotView) {
      appState.screenshotAnnotationId = data.annotationId || "";
      switchDetailsView("screenshot-storage");
      showToast(`已保存截图框选位置“${text}”`);
      setStatus("截图存储仍停留在当前区域，可直接保存当前框选 PNG。 ");
    } else {
      showToast(`已自动保存框选位置“${text}”，正在 OCR`);
      setStatus(`框选位置“${text}”已保存，正在自动识别框选内容…`);
    }
  } catch (error) {
    annotationState.draft = { ...mediaDraft, text };
    elements.annotationDraftText.value = text;
    elements.annotationDraftLocation.textContent = annotationLocationLabel(
      mediaDraft.page
    );
    elements.annotationDraftEditor.classList.remove("hidden");
    renderAnnotationLayer();
    showToast(`自动保存框选失败：${error.message}`, "error");
    setStatus(error.message);
  } finally {
    setBusy(false);
  }
  if (savedAnnotation && options.recognize !== false) {
    await recognizeOcrSelection(
      savedAnnotation,
      "region",
      savedAnnotation.id,
      true
    );
  }
}

async function saveAnnotationDraft(autoRecognize = false) {
  const file = selectedFile();
  const draft = annotationState.draft;
  const mediaDraft =
    draft?.coordinateSpace === "media" ? draft : stageRectToMediaRect(draft || {});
  const text = elements.annotationDraftText.value.trim();
  let savedAnnotation = null;
  if (!file || !draft || appState.busy) return;
  if (!text) {
    showToast("请先填写初始框选记录", "error");
    elements.annotationDraftText.focus();
    return;
  }
  setBusy(true);
  try {
    const data = await request("/api/annotations", {
      method: "POST",
      body: JSON.stringify({
        action: "add",
        recordId: file.id,
        relativePath: file.relativePath,
        page: mediaDraft.page,
        x: mediaDraft.x,
        y: mediaDraft.y,
        width: mediaDraft.width,
        height: mediaDraft.height,
        coordinateSpace: "media",
        color: mediaDraft.color,
        text,
      }),
    });
    annotationState.draft = null;
    elements.annotationDraftText.value = "";
    elements.annotationDraftEditor.classList.add("hidden");
    applyServerState(data, file.id, appState.selectedIndex);
    savedAnnotation = (selectedFile()?.annotations || []).find(
      (item) => item.id === data.annotationId
    );
    annotationState.highlightId = data.annotationId || "";
    renderResearchNotes();
    renderAnnotationLayer();
    showToast("框选批注已保存");
    setStatus(`框选位置“${text}”已保存`);
  } catch (error) {
    showToast(error.message, "error");
  } finally {
    setBusy(false);
  }
  if (autoRecognize && savedAnnotation) {
    await recognizeOcrSelection(
      savedAnnotation,
      "region",
      savedAnnotation.id,
      true
    );
  }
}

async function saveAnnotationContent(
  annotationId,
  requestedText,
  requestedRichText = [],
  options = {}
) {
  if (
    annotationState.editId === annotationId &&
    annotationState.editRect &&
    !(await saveAnnotationEdit({ silent: true }))
  ) {
    return false;
  }
  const file = selectedFile();
  const annotation = (file?.annotations || []).find(
    (item) => item.id === annotationId
  );
  const text = String(requestedText || "").trim();
  const pendingTranslation =
    appState.pendingAnnotationTranslations.get(annotationId);
  const savingTranslationPair =
    pendingTranslation?.recordId === file?.id &&
    Boolean(String(pendingTranslation?.sourceText || "").trim());
  if (!file || !annotation || appState.busy) return false;
  if (!text) {
    showToast("框选内容不能为空", "error");
    return false;
  }
  const useGlobalBusy = !options.silent;
  if (useGlobalBusy) setBusy(true);
  try {
    const data = await request("/api/annotation-content", {
      method: "POST",
      body: JSON.stringify({
        recordId: file.id,
        relativePath: file.relativePath,
        annotationId,
        text,
        richText: requestedRichText,
        translationSourceText:
          pendingTranslation?.recordId === file.id
            ? pendingTranslation.sourceText
            : "",
        translationSourceRichText:
          pendingTranslation?.recordId === file.id
            ? pendingTranslation.sourceRichText
            : [],
        translationSourceLanguage:
          pendingTranslation?.recordId === file.id
            ? pendingTranslation.sourceLanguage
            : "",
        translationTargetLanguage:
          pendingTranslation?.recordId === file.id
            ? pendingTranslation.targetLanguage
            : "",
        translationEngine:
          pendingTranslation?.recordId === file.id
            ? pendingTranslation.engine
            : "",
        translationModel:
          pendingTranslation?.recordId === file.id
            ? pendingTranslation.model
            : "",
      }),
    });
    appState.pendingAnnotationTranslations.delete(annotationId);
    expandedSavedAnnotationIds.delete(annotationId);
    applyServerState(data, file.id, appState.selectedIndex);
    renderResearchNotes();
    if (!options.silent) {
      showToast(
        savingTranslationPair
          ? "框选内容已保存，并已保留翻译前后文本"
          : "框选内容已保存为当前文本"
      );
      setStatus(
        savingTranslationPair
          ? "框选翻译前文本与最终翻译后文本已成对保存"
          : "框选内容已保存为唯一当前文本，不再另行保留 OCR 原文"
      );
    }
    return true;
  } catch (error) {
    showToast(error.message, "error");
    return false;
  } finally {
    if (useGlobalBusy) setBusy(false);
  }
}

function quoteAnnotationToResearchNote(annotationId, editor = null) {
  const file = selectedFile();
  const annotation = (file?.annotations || []).find(
    (item) => item.id === annotationId
  );
  if (!file || !annotation) return;
  const entry = annotationOcrDisplayEntry(annotation, file);
  const excerpt = (
    editor
      ? richTextPlain(richEditorSegments(editor))
      : annotationOcrDisplayText(annotation, file)
  ).trim();
  if (!excerpt) {
    showToast("当前框选没有可引用的文字", "error");
    return;
  }
  addNoteReference({
    type: "ocr-corrected",
    page: annotation.page,
    regionId: entry?.id || "",
    x: annotation.x,
    y: annotation.y,
    width: annotation.width,
    height: annotation.height,
    excerpt,
    sourceUpdatedAt:
      entry?.correctedAt ||
      entry?.updatedAt ||
      annotation.updatedAt ||
      "",
  });
  appendPlainTextToRichEditor(
    elements.researchNoteInput,
    `【框选批注 · ${annotationSystemLabel(annotation, file)} · ${annotationLocationLabel(
      annotation.page
    )}】\n“${excerpt}”`,
    "black"
  );
  appState.notesSurface = "personal";
  renderWorkspaceLayout();
  elements.researchNoteInput.focus();
  showToast("已引用至记录笔记");
  setStatus("框选当前文本已加入记录笔记草稿");
}

async function saveAnnotationRecord(
  annotationId,
  requestedRecord,
  requestedRichText = [],
  options = {}
) {
  const file = selectedFile();
  const annotation = (file?.annotations || []).find(
    (item) => item.id === annotationId
  );
  if (!file || !annotation || appState.busy) return false;
  const text = String(requestedRecord || "").trim();
  if (!text) {
    if (!options.silent) {
      showToast("框选记录不能为空", "error");
    }
    return false;
  }
  const useGlobalBusy = !options.silent;
  if (useGlobalBusy) setBusy(true);
  try {
    const data = await request("/api/annotations", {
      method: "POST",
      body: JSON.stringify({
        action: "rename",
        recordId: file.id,
        relativePath: file.relativePath,
        annotationId,
        text,
        richText: requestedRichText,
      }),
    });
    applyServerState(data, file.id, appState.selectedIndex);
    if (!options.silent) {
      showToast("框选记录已保存");
      setStatus("框选记录已完整保存");
    }
    return true;
  } catch (error) {
    showToast(error.message, "error");
    return false;
  } finally {
    if (useGlobalBusy) setBusy(false);
  }
}

async function deleteAnnotation(annotationId) {
  const file = selectedFile();
  if (!file || appState.busy) return false;
  if (!(await confirmAction("确定删除这条框选批注吗？"))) return false;
  if (annotationState.editId === annotationId) cancelAnnotationEdit(false);
  setBusy(true);
  try {
    const data = await request("/api/annotations", {
      method: "POST",
      body: JSON.stringify({
        action: "delete",
        recordId: file.id,
        relativePath: file.relativePath,
        annotationId,
      }),
    });
    expandedSavedAnnotationIds.delete(annotationId);
    applyServerState(data, file.id, appState.selectedIndex);
    showToast("框选批注已删除");
    return true;
  } catch (error) {
    showToast(error.message, "error");
    return false;
  } finally {
    setBusy(false);
  }
}

async function addResearchNote() {
  const file = selectedFile();
  const richText = richEditorSegments(elements.researchNoteInput);
  const text = richTextPlain(richText);
  if (!file || appState.busy) return;
  if (!text) {
    showToast("请先填写研究笔记", "error");
    elements.researchNoteInput.focus();
    return;
  }
  setBusy(true);
  try {
    const data = await request("/api/research-notes", {
      method: "POST",
      body: JSON.stringify({
        action: "add",
        recordId: file.id,
        relativePath: file.relativePath,
        text,
        richText,
        references: appState.noteReferenceDrafts,
      }),
    });
    elements.researchNoteInput.innerHTML = "";
    appState.noteReferenceDrafts = [];
    applyServerState(data, file.id, appState.selectedIndex);
    renderNoteReferenceDrafts();
    showToast("研究笔记已保存");
    setStatus("记录笔记已保存；OCR 引用和原件位置已一并记录");
  } catch (error) {
    showToast(error.message, "error");
  } finally {
    setBusy(false);
  }
}

async function deleteResearchNote(noteId) {
  const file = selectedFile();
  if (!file || appState.busy) return;
  if (!(await confirmAction("确定删除这条研究笔记吗？"))) return;
  setBusy(true);
  try {
    const data = await request("/api/research-notes", {
      method: "POST",
      body: JSON.stringify({
        action: "delete",
        recordId: file.id,
        relativePath: file.relativePath,
        noteId,
      }),
    });
    applyServerState(data, file.id, appState.selectedIndex);
    showToast("研究笔记已删除");
  } catch (error) {
    showToast(error.message, "error");
  } finally {
    setBusy(false);
  }
}

async function saveResearchNoteEdit(noteId) {
  const file = selectedFile();
  const editor = elements.researchNoteList.querySelector(
    `[data-research-note-edit-input="${CSS.escape(noteId)}"]`
  );
  if (!file || !editor || appState.busy) return;
  const richText = richEditorSegments(editor);
  const text = richTextPlain(richText);
  if (!text) {
    showToast("研究笔记不能为空", "error");
    editor.focus();
    return;
  }
  setBusy(true);
  try {
    const data = await request("/api/research-notes", {
      method: "POST",
      body: JSON.stringify({
        action: "update",
        recordId: file.id,
        relativePath: file.relativePath,
        noteId,
        text,
        richText,
      }),
    });
    appState.editingResearchNoteId = "";
    applyServerState(data, file.id, appState.selectedIndex);
    showToast("研究笔记已更新");
    setStatus("研究笔记的文字与字号、颜色等格式修改已保存");
  } catch (error) {
    showToast(error.message, "error");
  } finally {
    setBusy(false);
  }
}

function setImageZoom(nextScale) {
  imageView.active = true;
  if (annotationState.active) {
    elements.zoomHint.textContent =
      "框选区域：滚轮仍可缩放 · 拖出矩形；需要移动时点击“移动原件”";
  } else if (appState.previewKind === "pdf") {
    elements.zoomHint.textContent =
      "缩放模式：滚轮缩放 · 按住鼠标左键拖动 · 点击左上角退出";
  }
  imageView.scale = Math.min(6, Math.max(0.5, nextScale));
  if (imageView.scale === 1) {
    imageView.x = 0;
    imageView.y = 0;
  }
  applyImageView();
}

function renderOperations() {
  elements.operationCount.textContent = WorkbenchUiRules.optionalCount(
    appState.operations.length,
    (count) => `${count} 条`
  );
  elements.operationCount.classList.toggle(
    "hidden",
    appState.operations.length === 0
  );
  if (!appState.operations.length) {
    elements.operationList.innerHTML =
      '<div class="operation-item">完成保存或项目操作后会显示在这里。</div>';
    return;
  }
  elements.operationList.innerHTML = appState.operations
    .slice(0, 12)
    .map(
      (operation) => `
        <div class="operation-item">
          <strong>${escapeHtml(operation.summary || operation.type)}</strong>
          ${escapeHtml(formatTime(operation.at))}
        </div>`
    )
    .join("");
}

function favoriteWebsiteHost(value) {
  try {
    return new URL(value).hostname.replace(/^www\./iu, "");
  } catch {
    return value;
  }
}

function favoriteWebsiteCategoryById(categoryId) {
  return (appState.favoriteWebsiteCategories || []).find(
    (item) => item.id === categoryId
  );
}

function favoriteWebsiteCategoryLabel(categoryId) {
  return favoriteWebsiteCategoryById(categoryId)?.name || "未分类";
}

function beginFavoriteWebsiteCategoryRename(categoryId) {
  const category = favoriteWebsiteCategoryById(categoryId);
  const button = Array.from(
    elements.favoriteCategoryList.querySelectorAll("[data-favorite-folder]")
  ).find((item) => item.dataset.favoriteFolder === categoryId);
  if (!category || !button) return;

  const input = document.createElement("input");
  input.type = "text";
  input.className = "favorite-folder-rename-input";
  input.maxLength = 60;
  input.value = category.name;
  input.setAttribute("aria-label", `修改文件夹名称：${category.name}`);
  button.replaceWith(input);

  let finished = false;
  const restore = () => {
    if (finished) return;
    finished = true;
    renderFavoriteWebsiteCategories();
  };
  const commit = async (keepFocusWhenEmpty = false) => {
    if (finished) return;
    const name = input.value.trim();
    if (!name) {
      if (keepFocusWhenEmpty) {
        showToast("文件夹名称不能为空", "error");
        input.focus();
        return;
      }
      restore();
      return;
    }
    if (name === category.name) {
      restore();
      return;
    }

    finished = true;
    input.disabled = true;
    try {
      const data = await request("/api/favorite-website-categories", {
        method: "POST",
        body: JSON.stringify({
          action: "update",
          categoryId: category.id,
          name,
        }),
      });
      applyServerState(data, appState.selectedId, appState.selectedIndex);
      showToast("网站文件夹已改名");
    } catch (error) {
      finished = false;
      input.disabled = false;
      showToast(error.message, "error");
      input.focus();
      input.select();
    }
  };

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.isComposing) {
      event.preventDefault();
      commit(true);
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      restore();
    }
  });
  input.addEventListener("blur", () => commit(false));
  input.focus();
  input.select();
}

function renderFavoriteWebsiteCategories() {
  const categories = appState.favoriteWebsiteCategories || [];
  const validIds = new Set(categories.map((item) => item.id));

  const previousCategory = elements.favoriteWebsiteCategorySelect.value;
  elements.favoriteWebsiteCategorySelect.innerHTML = [
    '<option value="">不放入文件夹</option>',
    ...categories.map(
      (category) =>
        `<option value="${escapeHtml(category.id)}">${escapeHtml(
          category.name
        )}</option>`
    ),
  ].join("");
  if (validIds.has(previousCategory)) {
    elements.favoriteWebsiteCategorySelect.value = previousCategory;
  }
  elements.favoriteCategoryList.innerHTML = categories.length
    ? categories
        .map(
          (category) => `
            <div class="favorite-category-row">
              <button type="button" class="favorite-folder-button"
                data-favorite-folder="${escapeHtml(category.id)}"
                title="双击改名">
                ${escapeHtml(category.name)}
              </button>
              <button type="button" class="favorite-folder-delete"
                data-delete-favorite-category="${escapeHtml(category.id)}"
                aria-label="删除文件夹 ${escapeHtml(category.name)}"
                title="删除文件夹">×</button>
            </div>`
        )
        .join("")
    : "";
  elements.favoriteWebsiteFolders
    .querySelectorAll("[data-favorite-folder]")
    .forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.favoriteFolder === appState.favoriteWebsiteCategoryFilter
      );
    });
  elements.favoriteCategoryList
    .querySelectorAll("[data-favorite-folder]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        appState.favoriteWebsiteCategoryFilter =
          appState.favoriteWebsiteCategoryFilter === button.dataset.favoriteFolder
            ? ""
            : button.dataset.favoriteFolder;
        elements.favoriteWebsiteFolders
          .querySelectorAll("[data-favorite-folder]")
          .forEach((folderButton) => {
            folderButton.classList.toggle(
              "active",
              folderButton.dataset.favoriteFolder ===
                appState.favoriteWebsiteCategoryFilter
            );
          });
        renderFavoriteWebsites({ preserveFolderList: true });
      });
      button.addEventListener("dblclick", (event) => {
        event.preventDefault();
        beginFavoriteWebsiteCategoryRename(button.dataset.favoriteFolder);
      });
    });
  elements.favoriteCategoryList
    .querySelectorAll("[data-delete-favorite-category]")
    .forEach((button) => {
      button.addEventListener("click", async () => {
        const category = favoriteWebsiteCategoryById(
          button.dataset.deleteFavoriteCategory
        );
        if (
          !category ||
          !(await confirmAction(
            `确定删除文件夹“${category.name}”吗？其中的网址会保留。`
          ))
        ) {
          return;
        }
        try {
          const data = await request("/api/favorite-website-categories", {
            method: "POST",
            body: JSON.stringify({
              action: "delete",
              categoryId: category.id,
            }),
          });
          applyServerState(data, appState.selectedId, appState.selectedIndex);
          if (appState.favoriteWebsiteCategoryFilter === category.id) {
            appState.favoriteWebsiteCategoryFilter = "";
            renderFavoriteWebsites();
          }
          showToast("网站文件夹已删除");
        } catch (error) {
          showToast(error.message, "error");
        }
      });
    });
}

async function addFavoriteWebsiteCategory() {
  const name = elements.favoriteCategoryNameInput.value.trim();
  if (!name) {
    elements.favoriteCategoryNameInput.focus();
    return;
  }
  elements.addFavoriteCategoryButton.disabled = true;
  try {
    const data = await request("/api/favorite-website-categories", {
      method: "POST",
      body: JSON.stringify({ action: "add", name }),
    });
    applyServerState(data, appState.selectedId, appState.selectedIndex);
    const created = (appState.favoriteWebsiteCategories || []).find(
      (category) => category.name === name
    );
    elements.favoriteCategoryNameInput.value = "";
    elements.favoriteCategoryManager.classList.add("hidden");
    renderFavoriteWebsites();
    if (created) elements.favoriteWebsiteCategorySelect.value = created.id;
    showToast("网站分类已创建");
  } catch (error) {
    showToast(error.message, "error");
  } finally {
    elements.addFavoriteCategoryButton.disabled = false;
  }
}

function resetFavoriteWebsiteEditor() {
  appState.editingFavoriteWebsiteId = "";
  elements.favoriteWebsiteNameInput.value = "";
  elements.favoriteWebsiteUrlInput.value = "";
  elements.favoriteWebsiteCategorySelect.value = "";
  elements.saveFavoriteWebsiteButton.textContent = "保存网站";
  elements.favoriteWebsiteEditorStatus.textContent = "";
  elements.favoriteWebsiteEditor.classList.add("hidden");
}

function renderFavoriteWebsites({ preserveFolderList = false } = {}) {
  if (!preserveFolderList) renderFavoriteWebsiteCategories();
  const allWebsites = appState.favoriteWebsites || [];
  const categories = appState.favoriteWebsiteCategories || [];
  const activeFolder = appState.favoriteWebsiteCategoryFilter || "";
  const folderTitle =
    categories.find((item) => item.id === activeFolder)?.name || "网站";
  elements.favoriteWebsiteListTitle.textContent = folderTitle;
  const websites = WorkbenchUiRules.filterFavoriteWebsites(
    allWebsites,
    activeFolder,
    appState.favoriteWebsiteQuery
  );
  elements.favoriteWebsitesList.innerHTML = websites.length
    ? websites
        .map(
          (website) => `
            <article class="favorite-website-row" draggable="true"
              data-favorite-website-id="${escapeHtml(website.id)}">
              <button type="button" class="favorite-website-open"
                data-open-favorite-website="${escapeHtml(website.id)}"
                title="打开 ${escapeHtml(website.url)}">
                <span class="favorite-website-favicon" aria-hidden="true">${escapeHtml(
                  (website.name || favoriteWebsiteHost(website.url)).slice(0, 1)
                )}</span>
                <span class="favorite-website-copy">
                  <strong>${escapeHtml(website.name)}</strong>
                  <small>${escapeHtml(favoriteWebsiteHost(website.url))}</small>
                </span>
              </button>
              <details class="favorite-website-menu">
                <summary aria-label="${escapeHtml(website.name)}的操作">⋯</summary>
                <div>
                  <button type="button" data-edit-favorite-website="${escapeHtml(
                    website.id
                  )}">编辑</button>
                  <button type="button" class="danger"
                    data-delete-favorite-website="${escapeHtml(website.id)}">删除</button>
                </div>
              </details>
            </article>`
        )
        .join("")
    : `<div class="favorite-websites-empty">${
        appState.favoriteWebsiteQuery
          ? "没有匹配的网站"
          : "这里还没有网站"
      }</div>`;

  elements.favoriteWebsitesList
    .querySelectorAll("[data-open-favorite-website]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const website = allWebsites.find(
          (item) => item.id === button.dataset.openFavoriteWebsite
        );
        if (!website) return;
        window.open(website.url, "_blank", "noopener,noreferrer");
        request("/api/favorite-websites", {
          method: "POST",
          body: JSON.stringify({ action: "touch", websiteId: website.id }),
        })
          .then((data) => applyServerState(data, appState.selectedId, appState.selectedIndex))
          .catch(() => {});
      });
    });
  elements.favoriteWebsitesList
    .querySelectorAll("[data-edit-favorite-website]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const website = allWebsites.find(
          (item) => item.id === button.dataset.editFavoriteWebsite
        );
        if (!website) return;
        appState.editingFavoriteWebsiteId = website.id;
        elements.favoriteWebsiteNameInput.value = website.name;
        elements.favoriteWebsiteUrlInput.value = website.url;
        elements.favoriteWebsiteCategorySelect.value =
          favoriteWebsiteCategoryById(website.categoryId)?.id || "";
        elements.saveFavoriteWebsiteButton.textContent = "保存修改";
        elements.favoriteWebsiteEditor.classList.remove("hidden");
        elements.favoriteWebsiteEditorStatus.textContent =
          `正在修改：${website.name}`;
        elements.favoriteWebsiteNameInput.focus();
      });
    });
  elements.favoriteWebsitesList
    .querySelectorAll("[data-delete-favorite-website]")
    .forEach((button) => {
      button.addEventListener("click", async () => {
        const website = allWebsites.find(
          (item) => item.id === button.dataset.deleteFavoriteWebsite
        );
        if (
          !website ||
          !(await confirmAction(`确定删除常用网站“${website.name}”吗？`))
        ) {
          return;
        }
        try {
          const data = await request("/api/favorite-websites", {
            method: "POST",
            body: JSON.stringify({
              action: "delete",
              websiteId: website.id,
            }),
          });
          applyServerState(data, appState.selectedId, appState.selectedIndex);
          if (appState.editingFavoriteWebsiteId === website.id) {
            resetFavoriteWebsiteEditor();
          }
          showToast("常用网站已删除");
        } catch (error) {
          showToast(error.message, "error");
        }
      });
    });
}

function openFavoriteWebsites() {
  closeTimeline();
  closeAiSuggestion();
  closeFolderImport();
  closeTextExport();
  elements.historyModal.classList.add("hidden");
  setLibraryDrawer(false);
  setFocusReading(false);
  elements.favoriteCategoryManager.classList.add("hidden");
  appState.favoriteWebsiteCategoryFilter = "";
  appState.favoriteWebsiteQuery = "";
  elements.favoriteWebsiteSearchInput.value = "";
  resetFavoriteWebsiteEditor();
  renderFavoriteWebsites();
  elements.favoriteWebsitesModal.classList.remove("hidden");
  setActiveRailButton(elements.favoriteWebsitesNavButton);
}

function closeFavoriteWebsites() {
  elements.favoriteWebsitesModal.classList.add("hidden");
  elements.favoriteCategoryManager.classList.add("hidden");
  resetFavoriteWebsiteEditor();
  setActiveRailButton(elements.workspaceNavButton);
}

async function saveFavoriteWebsite() {
  let name = elements.favoriteWebsiteNameInput.value.trim();
  const websiteUrl = elements.favoriteWebsiteUrlInput.value.trim();
  if (!websiteUrl) {
    elements.favoriteWebsiteEditorStatus.textContent = "请填写网站地址";
    elements.favoriteWebsiteUrlInput.focus();
    return;
  }
  if (!name) name = favoriteWebsiteHost(websiteUrl) || "未命名网站";
  elements.saveFavoriteWebsiteButton.disabled = true;
  elements.favoriteWebsiteEditorStatus.textContent = "正在保存…";
  try {
    const editingId = appState.editingFavoriteWebsiteId;
    const data = await request("/api/favorite-websites", {
      method: "POST",
      body: JSON.stringify({
        action: editingId ? "update" : "add",
        websiteId: editingId,
        name,
        url: websiteUrl,
        categoryId: elements.favoriteWebsiteCategorySelect.value,
      }),
    });
    applyServerState(data, appState.selectedId, appState.selectedIndex);
    resetFavoriteWebsiteEditor();
    showToast(editingId ? "网址卡片已修改" : "网址卡片已添加");
  } catch (error) {
    elements.favoriteWebsiteEditorStatus.textContent = error.message;
    showToast(error.message, "error");
  } finally {
    elements.saveFavoriteWebsiteButton.disabled = false;
  }
}

function renderHistoryRecords() {
  const query = appState.historyQuery.trim().toLocaleLowerCase();
  const records = (appState.operations || []).filter((operation) => {
    if (!query) return true;
    return `${operation.summary || ""} ${operation.type || ""}`
      .toLocaleLowerCase()
      .includes(query);
  });
  elements.historyRecordCount.textContent = query
    ? `${records.length} 条`
    : WorkbenchUiRules.optionalCount(records.length, (count) => `${count} 条`);
  elements.historyRecordCount.classList.toggle(
    "hidden",
    !elements.historyRecordCount.textContent
  );
  elements.historyRecordList.innerHTML = records.length
    ? records
        .map(
          (operation, index) => `
            <article class="history-record-item">
              <span class="history-record-index">${String(index + 1).padStart(
                2,
                "0"
              )}</span>
              <div>
                <strong>${escapeHtml(
                  operation.summary || operation.type || "操作记录"
                )}</strong>
                <small>${escapeHtml(operation.type || "operation")} · ${escapeHtml(
                  formatTime(operation.at)
                )}</small>
              </div>
            </article>`
        )
        .join("")
    : '<div class="notes-empty">没有符合条件的操作记录。</div>';
}

function openHistory() {
  closeTimeline();
  closeAiSuggestion();
  closeFolderImport();
  closeTextExport();
  elements.favoriteWebsitesModal.classList.add("hidden");
  resetFavoriteWebsiteEditor();
  setLibraryDrawer(false);
  setFocusReading(false);
  elements.historySearchInput.value = appState.historyQuery;
  renderHistoryRecords();
  elements.historyModal.classList.remove("hidden");
  setActiveRailButton(elements.historyNavButton);
}

function closeHistory() {
  elements.historyModal.classList.add("hidden");
  setActiveRailButton(elements.workspaceNavButton);
}

function sortStorageKey() {
  return `historical-workbench-sort:${appState.libraryId || "default"}`;
}

function rememberSortMode() {
  try {
    localStorage.setItem(sortStorageKey(), appState.sortMode);
  } catch {
    // 浏览器禁用本地存储时仍可在本次使用中排序。
  }
}

function loadSortMode() {
  try {
    const saved = localStorage.getItem(sortStorageKey());
    const allowed = ["default", "date-asc", "date-desc", "paper", "recent"];
    appState.sortMode = allowed.includes(saved) ? saved : "default";
  } catch {
    appState.sortMode = "default";
  }
  elements.sortSelect.value = appState.sortMode;
}

function textCompare(a, b) {
  return String(a || "").localeCompare(String(b || ""), "zh-CN", {
    numeric: true,
    sensitivity: "base",
  });
}

function tieBreakFiles(a, b) {
  return (
    textCompare(a.paper, b.paper) ||
    textCompare(a.edition, b.edition) ||
    textCompare(a.title, b.title) ||
    textCompare(a.name, b.name)
  );
}

function sortFiles(files) {
  const sorted = [...files];
  if (appState.sortMode === "default") return sorted;
  if (appState.sortMode === "paper") {
    return sorted.sort(
      (a, b) =>
        textCompare(a.paper, b.paper) ||
        textCompare(a.date, b.date) ||
        tieBreakFiles(a, b)
    );
  }
  if (appState.sortMode === "recent") {
    return sorted.sort(
      (a, b) =>
        String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")) ||
        tieBreakFiles(a, b)
    );
  }
  const descending = appState.sortMode === "date-desc";
  return sorted.sort((a, b) => {
    const aHasDate = /^\d{4}(?:-\d{2})?(?:-\d{2})?$/.test(a.date || "");
    const bHasDate = /^\d{4}(?:-\d{2})?(?:-\d{2})?$/.test(b.date || "");
    if (aHasDate !== bHasDate) return aHasDate ? -1 : 1;
    if (!aHasDate && !bHasDate) return tieBreakFiles(a, b);
    const dateOrder = String(a.date).localeCompare(String(b.date));
    return (descending ? -dateOrder : dateOrder) || tieBreakFiles(a, b);
  });
}

function kindLabel(kind) {
  if (kind === "paper") return "论文";
  if (kind === "book") return "专著";
  return "史料";
}

function paperTypeLabel(type) {
  return type === "thesis" ? "学位论文" : "期刊论文";
}

function renderEngineSettingsPanels() {
  const allowed = ["ocr", "sentence", "translation"];
  if (!allowed.includes(appState.engineSettingsPanel)) {
    appState.engineSettingsPanel = "ocr";
  }
  elements.engineSettingsButtons.forEach((button) => {
    const active =
      button.dataset.engineSettingsTab === appState.engineSettingsPanel;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  elements.engineSettingsPanels.forEach((panel) => {
    panel.classList.toggle(
      "hidden",
      panel.dataset.engineSettingsPanel !== appState.engineSettingsPanel
    );
  });
}

function renderDetailsView() {
  const allowedViews = [
    "metadata",
    "ocr-text",
    "screenshot-storage",
    "notes",
  ];
  if (appState.detailsView === "translation") {
    appState.detailsView = "ocr-text";
  }
  if (appState.detailsView === "ai-sentence") {
    appState.detailsView = "ocr-text";
  }
  const view = allowedViews.includes(appState.detailsView)
    ? appState.detailsView
    : "metadata";
  const foreignSource = isForeignSource();
  const showTextModes = view === "ocr-text";
  const showSharedEngineSettings =
    view === "ocr-text" || view === "notes";
  if (showTextModes) {
    appState.foreignTextMode = "ocr";
    appState.ocrSurface = "corrected";
  }
  elements.detailsViewButtons.forEach((button) => {
    const active = button.dataset.detailsView === view;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  elements.foreignTextModeTabs.classList.add("hidden");
  elements.sharedEngineSettingsMount.classList.toggle(
    "hidden",
    !showSharedEngineSettings
  );
  elements.ocrReferenceDisclosure.classList.toggle(
    "hidden",
    view !== "ocr-text"
  );
  elements.unifiedTextModeTabs.classList.toggle("hidden", !showTextModes);
  elements.mainTextTranslationButton.classList.toggle(
    "hidden",
    !showTextModes || !foreignSource
  );
  renderEngineSettingsPanels();
  elements.foreignTextModeButtons.forEach((button) => {
    const translationMode = button.dataset.foreignTextMode === "translation";
    button.classList.toggle("hidden", translationMode && !foreignSource);
    const active = button.dataset.foreignTextMode === appState.foreignTextMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  elements.detailsViewPanels.forEach((panel) => {
    const panelView = panel.dataset.detailsPanel;
    const visible = showTextModes
      ? panelView === "ocr-text"
      : panelView === view;
    panel.classList.toggle("hidden", !visible);
  });
  if (view !== "metadata") {
    renderOcrWorkspace();
    if (showTextModes && foreignSource) {
      renderTranslationSettings();
    }
  }
  renderWorkspaceLayout();
  renderAnnotationLayer();
}

function switchDetailsView(view) {
  if (view === "translation") {
    view = "ocr-text";
    appState.foreignTextMode = "translation";
  }
  if (view === "ai-sentence") {
    view = "ocr-text";
    appState.foreignTextMode = "ai-sentence";
  }
  appState.detailsView = [
    "metadata",
    "ocr-text",
    "screenshot-storage",
    "notes",
  ].includes(view)
    ? view
    : "metadata";
  renderDetailsView();
}

function renderKindNavigation() {
  elements.kindTabs.forEach((button) => {
    button.setAttribute(
      "aria-selected",
      String(button.dataset.kindTab === appState.activeKind)
    );
  });
  elements.listTitle.textContent = `${kindLabel(appState.activeKind)}列表`;
}

function renderKindEditor() {
  const kind = appState.editingKind;
  elements.sourceFields.classList.toggle("hidden", kind !== "source");
  elements.paperFields.classList.toggle("hidden", kind !== "paper");
  elements.bookFields.classList.toggle("hidden", kind !== "book");
  elements.recordKindButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.recordKind === kind);
  });
  renderSourceLanguage();
  elements.paperTypeButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.paperType === appState.editingPaperType
    );
  });
  const thesis = appState.editingPaperType === "thesis";
  elements.journalPaperFields.classList.toggle("hidden", thesis);
  elements.thesisPaperFields.classList.toggle("hidden", !thesis);
  renderEditionUnit();
  renderDetailsView();
  updateFilenamePreview();
  renderRecentChips();
}

function recordedEditionNumbers() {
  return [
    ...new Set(
      appState.allFiles
        .filter((file) => file.kind === "source")
        .map((file) => file.editionNumber)
        .filter(Boolean)
    ),
  ];
}

function renderEditionUnit() {
  elements.editionUnitButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.editionUnit === appState.editingEditionUnit
    );
  });
}

function renderEditionMenu() {
  const editions = recordedEditionNumbers();
  elements.editionNumberMenu.innerHTML = editions.length
    ? editions
        .map(
          (value, index) => `
            <button type="button" class="edition-option"
              data-edition-index="${index}" data-edition-value="${escapeHtml(value)}"
              role="option" aria-selected="${
                elements.editionNumberInput.value === value
              }">
              <span>${escapeHtml(value)}</span>
              <small>${index === 0 ? "最近记录" : "已记录"}</small>
            </button>`
        )
        .join("")
    : '<div class="paper-menu-empty">保存一次后，版次数字会记录在这里</div>';
  elements.editionNumberMenu
    .querySelectorAll(".edition-option")
    .forEach((button) => {
      button.addEventListener("click", () => {
        elements.editionNumberInput.value = button.dataset.editionValue;
        closeEditionMenu();
        updateFilenamePreview();
      });
    });
}

function openEditionMenu() {
  closePaperMenu();
  closeDateMenus();
  closeIssueMenu();
  renderEditionMenu();
  elements.editionNumberMenu.classList.remove("hidden");
  elements.editionNumberInput.setAttribute("aria-expanded", "true");
  const buttons = [
    ...elements.editionNumberMenu.querySelectorAll(".edition-option"),
  ];
  editionKeyboardIndex = Math.max(
    0,
    buttons.findIndex(
      (button) =>
        button.dataset.editionValue === elements.editionNumberInput.value
    )
  );
  buttons.forEach((button, index) => {
    button.classList.toggle("keyboard-active", index === editionKeyboardIndex);
  });
}

function closeEditionMenu() {
  elements.editionNumberMenu.classList.add("hidden");
  elements.editionNumberInput.setAttribute("aria-expanded", "false");
}

function toggleEditionMenu() {
  if (elements.editionNumberMenu.classList.contains("hidden")) {
    openEditionMenu();
  } else {
    closeEditionMenu();
  }
}

function handleEditionKeyboard(event) {
  const buttons = [
    ...elements.editionNumberMenu.querySelectorAll(".edition-option"),
  ];
  if (event.key === "Escape") {
    closeEditionMenu();
    return;
  }
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    if (elements.editionNumberMenu.classList.contains("hidden")) {
      openEditionMenu();
      return;
    }
    if (!buttons.length) return;
    editionKeyboardIndex =
      event.key === "ArrowDown"
        ? (editionKeyboardIndex + 1) % buttons.length
        : (editionKeyboardIndex - 1 + buttons.length) % buttons.length;
    buttons.forEach((button, index) => {
      button.classList.toggle("keyboard-active", index === editionKeyboardIndex);
    });
    buttons[editionKeyboardIndex].scrollIntoView({ block: "nearest" });
    return;
  }
  if (
    (event.key === " " || event.key === "Enter") &&
    !elements.editionNumberMenu.classList.contains("hidden") &&
    buttons[editionKeyboardIndex]
  ) {
    event.preventDefault();
    buttons[editionKeyboardIndex].click();
  }
}

function recordedIssueNumbers() {
  return [
    ...new Set(
      appState.allFiles
        .filter((file) => file.kind === "paper")
        .map((file) => file.issueNumber)
        .filter(Boolean)
    ),
  ];
}

function renderIssueUnit() {
  elements.issueUnitButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.issueUnit === appState.editingIssueUnit
    );
  });
}

function renderIssueMenu() {
  const issues = recordedIssueNumbers();
  elements.issueNumberMenu.innerHTML = issues.length
    ? issues
        .map(
          (value, index) => `
            <button type="button" class="edition-option"
              data-issue-index="${index}" data-issue-value="${escapeHtml(value)}"
              role="option" aria-selected="${
                elements.issueNumberInput.value === value
              }">
              <span>${escapeHtml(value)}</span>
              <small>${index === 0 ? "最近记录" : "已记录"}</small>
            </button>`
        )
        .join("")
    : '<div class="paper-menu-empty">保存一次后，期号数字会记录在这里</div>';
  elements.issueNumberMenu
    .querySelectorAll(".edition-option")
    .forEach((button) => {
      button.addEventListener("click", () => {
        elements.issueNumberInput.value = button.dataset.issueValue;
        closeIssueMenu();
        updateFilenamePreview();
      });
    });
}

function openIssueMenu() {
  closePaperMenu();
  closeDateMenus();
  closeEditionMenu();
  renderIssueMenu();
  elements.issueNumberMenu.classList.remove("hidden");
  elements.issueNumberInput.setAttribute("aria-expanded", "true");
  const buttons = [
    ...elements.issueNumberMenu.querySelectorAll(".edition-option"),
  ];
  issueKeyboardIndex = Math.max(
    0,
    buttons.findIndex(
      (button) => button.dataset.issueValue === elements.issueNumberInput.value
    )
  );
  buttons.forEach((button, index) => {
    button.classList.toggle("keyboard-active", index === issueKeyboardIndex);
  });
}

function closeIssueMenu() {
  elements.issueNumberMenu.classList.add("hidden");
  elements.issueNumberInput.setAttribute("aria-expanded", "false");
}

function toggleIssueMenu() {
  if (elements.issueNumberMenu.classList.contains("hidden")) {
    openIssueMenu();
  } else {
    closeIssueMenu();
  }
}

function handleIssueKeyboard(event) {
  const buttons = [
    ...elements.issueNumberMenu.querySelectorAll(".edition-option"),
  ];
  if (event.key === "Escape") {
    closeIssueMenu();
    return;
  }
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    if (elements.issueNumberMenu.classList.contains("hidden")) {
      openIssueMenu();
      return;
    }
    if (!buttons.length) return;
    issueKeyboardIndex =
      event.key === "ArrowDown"
        ? (issueKeyboardIndex + 1) % buttons.length
        : (issueKeyboardIndex - 1 + buttons.length) % buttons.length;
    buttons.forEach((button, index) => {
      button.classList.toggle("keyboard-active", index === issueKeyboardIndex);
    });
    buttons[issueKeyboardIndex].scrollIntoView({ block: "nearest" });
    return;
  }
  if (
    (event.key === " " || event.key === "Enter") &&
    !elements.issueNumberMenu.classList.contains("hidden") &&
    buttons[issueKeyboardIndex]
  ) {
    event.preventDefault();
    buttons[issueKeyboardIndex].click();
  }
}

function renderRecordedOptions() {
  renderEditionMenu();
  renderEditionUnit();
  renderIssueMenu();
  renderIssueUnit();

  const currentYear = new Date().getFullYear();
  elements.paperYearOptions.innerHTML = [
    UNKNOWN_DATE_PART,
    ...Array.from(
      { length: currentYear - 1799 },
      (_, index) => currentYear - index
    ),
  ]
    .map((value) => `<option value="${value}"></option>`)
    .join("");
  elements.optionalMonthOptions.innerHTML = [
    UNKNOWN_DATE_PART,
    ...Array.from({ length: 12 }, (_, index) => index + 1),
  ]
    .map((value) => `<option value="${value}"></option>`)
    .join("");
  elements.optionalDayOptions.innerHTML = [
    UNKNOWN_DATE_PART,
    ...Array.from({ length: 31 }, (_, index) => index + 1),
  ]
    .map((value) => `<option value="${value}"></option>`)
    .join("");
}

function timelineProjectNames() {
  return [...new Set(appState.allFiles.map((file) => file.project).filter(Boolean))]
    .sort((a, b) => textCompare(a, b));
}

function isTimelineDate(value) {
  return /^\d{4}(?:-\d{2})?(?:-\d{2})?$/.test(String(value || ""));
}

function displayTimelineDate(value) {
  const [year, month, day] = String(value || "").split("-");
  if (!year) return "日期未定";
  if (!month) return "日期未定";
  if (!day) return `${Number(month)}月`;
  return `${Number(month)}月${Number(day)}日`;
}

function timelineTitle(file) {
  if (file.kind === "book") return file.citation || file.title || file.name;
  if (file.kind === "paper") {
    return `${file.author ? `${file.author}：` : ""}${
      file.title || file.name
    }`;
  }
  return file.title || file.name;
}

function timelineMeta(file) {
  const source =
    file.kind === "paper"
      ? file.paperType === "thesis"
        ? `${paperTypeLabel(file.paperType)} · ${file.institution || "单位未填"}`
        : `${paperTypeLabel(file.paperType)} · ${file.journal || "期刊未填"}`
      : file.kind === "book"
      ? "专著书目"
      : [file.paper, file.edition].filter(Boolean).join(" · ") || "史料";
  const tags = (file.tags || []).slice(0, 3).join(" · ");
  return [file.project, source, tags].filter(Boolean).join(" · ");
}

function renderTimelineProjectOptions() {
  const names = timelineProjectNames();
  appState.timelineProjects = appState.timelineProjects.filter((name) =>
    names.includes(name)
  );
  elements.timelineProjectOptions.innerHTML = names
    .map((name) => {
      const count = appState.allFiles.filter((file) => file.project === name).length;
      const checked = appState.timelineProjects.includes(name);
      return `
        <label class="timeline-project-option">
          <input type="checkbox" value="${escapeHtml(name)}" ${
            checked ? "checked" : ""
          } />
          <span title="${escapeHtml(name)}">${escapeHtml(name)}</span>
          <small>${count} 份</small>
        </label>`;
    })
    .join("");
  elements.timelineProjectOptions
    .querySelectorAll('input[type="checkbox"]')
    .forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        appState.timelineProjects = [
          ...elements.timelineProjectOptions.querySelectorAll(
            'input[type="checkbox"]:checked'
          ),
        ].map((input) => input.value);
        renderTimeline();
      });
    });
}

function renderTimeline() {
  const selectedProjects = appState.timelineProjects;
  const selectedKinds = appState.timelineKinds;
  const query = appState.timelineQuery.trim().toLocaleLowerCase();
  const scoped = appState.allFiles.filter(
    (file) =>
      selectedProjects.includes(file.project) &&
      selectedKinds.includes(file.kind) &&
      (!query || searchableText(file).includes(query))
  );
  const dated = scoped
    .filter((file) => isTimelineDate(file.date))
    .sort((a, b) => {
      const order = String(a.date).localeCompare(String(b.date));
      return (
        (appState.timelineOrder === "desc" ? -order : order) ||
        tieBreakFiles(a, b)
      );
    });
  const undated = scoped.length - dated.length;
  const chronological = [...dated].sort((a, b) =>
    String(a.date).localeCompare(String(b.date))
  );
  const firstYear = chronological[0]?.date?.slice(0, 4) || "";
  const lastYear = chronological.at(-1)?.date?.slice(0, 4) || "";

  elements.timelineItemCount.textContent = dated.length;
  elements.timelineUndatedCount.textContent = undated;
  elements.timelineYearRange.textContent = firstYear
    ? firstYear === lastYear
      ? firstYear
      : `${firstYear}—${lastYear}`
    : "—";
  elements.timelineSelectionSummary.textContent = selectedProjects.length
    ? `已选择 ${selectedProjects.length} 个项目：${selectedProjects.join("、")}`
    : "请选择至少一个项目";

  if (!selectedProjects.length) {
    elements.timelineList.innerHTML =
      '<div class="timeline-empty"><span>请在左侧选择一个或多个项目</span></div>';
    return;
  }
  if (!dated.length) {
    elements.timelineList.innerHTML =
      '<div class="timeline-empty"><span>当前条件下没有已标日期的资料</span></div>';
    return;
  }

  const grouped = new Map();
  dated.forEach((file) => {
    const year = file.date.slice(0, 4);
    if (!grouped.has(year)) grouped.set(year, []);
    grouped.get(year).push(file);
  });
  elements.timelineList.innerHTML = [...grouped.entries()]
    .map(
      ([year, files]) => `
        <section class="timeline-year">
          <div class="timeline-year-label">${escapeHtml(year)}</div>
          <div class="timeline-year-items">
            ${files
              .map(
                (file) => `
                  <button type="button" class="timeline-item"
                    data-timeline-id="${escapeHtml(file.id)}">
                    <span class="timeline-date">${escapeHtml(
                      displayTimelineDate(file.date)
                    )}</span>
                    <span class="timeline-copy">
                      <strong title="${escapeHtml(timelineTitle(file))}">${escapeHtml(
                        timelineTitle(file)
                      )}</strong>
                      <span>${escapeHtml(timelineMeta(file))}</span>
                    </span>
                    <span class="timeline-type">${escapeHtml(
                      kindLabel(file.kind)
                    )}</span>
                  </button>`
              )
              .join("")}
          </div>
        </section>`
    )
    .join("");

  elements.timelineList.querySelectorAll("[data-timeline-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const file = appState.allFiles.find(
        (item) => item.id === button.dataset.timelineId
      );
      if (!file) return;
      closeTimeline();
      appState.activeKind = file.kind;
      appState.activeProject = file.project;
      appState.searchQuery = "";
      elements.searchInput.value = "";
      refreshFilteredFiles(file.id, null);
      setStatus(`已从时间线打开：${timelineTitle(file)}`);
    });
  });
}

function setActiveRailButton(activeButton) {
  [
    elements.folderImportButton,
    elements.workspaceNavButton,
    elements.timelineButton,
    elements.aiSuggestionNavButton,
    elements.favoriteWebsitesNavButton,
    elements.historyNavButton,
    elements.exportNavButton,
  ].forEach((button) => {
    const active = button === activeButton;
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
}

function openTimeline() {
  elements.historyModal.classList.add("hidden");
  elements.favoriteWebsitesModal.classList.add("hidden");
  elements.folderImportModal.classList.add("hidden");
  elements.aiSuggestionModal.classList.add("hidden");
  elements.textExportModal.classList.add("hidden");
  const names = timelineProjectNames();
  if (!appState.timelineProjects.length) {
    appState.timelineProjects =
      appState.activeProject !== "all" && names.includes(appState.activeProject)
        ? [appState.activeProject]
        : names;
  }
  renderTimelineProjectOptions();
  elements.timelineKindOptions.forEach((checkbox) => {
    checkbox.checked = appState.timelineKinds.includes(checkbox.value);
  });
  elements.timelineSearchInput.value = appState.timelineQuery;
  elements.timelineOrderButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.timelineOrder === appState.timelineOrder
    );
  });
  renderTimeline();
  elements.timelineModal.classList.remove("hidden");
  setActiveRailButton(elements.timelineButton);
}

function closeTimeline() {
  elements.timelineModal.classList.add("hidden");
  setActiveRailButton(elements.workspaceNavButton);
}

const AI_SUGGESTION_TYPE_LABELS = {
  lead: "研究线索",
  relation: "材料关联",
  gap: "矛盾与缺口",
  question: "待核问题",
  search: "后续检索词",
};

const AI_SUGGESTION_SCOPE_LABELS = {
  metadata: "书目信息",
  ocr: "对照文本",
  annotations: "框选批注",
  notes: "记录笔记",
  translations: "原文翻译",
};

function aiSuggestionMaterialTitle(file) {
  return file.name || file.title || file.paper || file.citation || "未命名材料";
}

function currentAiMaterialName(material) {
  const currentFile = appState.allFiles.find(
    (file) => file.id === material?.recordId
  );
  return (
    currentFile?.name ||
    material?.name ||
    material?.title ||
    material?.recordId ||
    "未命名材料"
  );
}

function aiSuggestionReferenceSummary(file) {
  const pageNumbers = Array.from(
    new Set(
      [
        ...(file.ocrPages || []).map((item) => item.page),
        ...(file.ocrRegions || []).map((item) => item.page),
      ].filter(Boolean)
    )
  )
    .sort((a, b) => Number(a) - Number(b))
    .slice(0, 12);
  const annotationIds = (file.ocrRegions || [])
    .map((item) => item.annotationId)
    .filter(Boolean)
    .slice(0, 8);
  return [
    pageNumbers.length ? `文字页码 ${pageNumbers.join("、")}` : "",
    annotationIds.length ? `框选 ${annotationIds.join("、")}` : "",
    (file.researchNotes || []).length
      ? `笔记 ${(file.researchNotes || []).length} 条`
      : "",
    (file.translations || []).length
      ? `译文 ${(file.translations || []).length} 条`
      : "",
  ]
    .filter(Boolean)
    .join("；");
}

function selectedAiSuggestionFiles() {
  return appState.allFiles.filter((file) =>
    appState.aiSuggestionSelectedIds.has(file.id)
  );
}

function visibleAiSuggestionFiles() {
  const kinds = new Set(
    elements.aiSuggestionKindFilters
      .filter((input) => input.checked)
      .map((input) => input.value)
  );
  const query = elements.aiSuggestionSearchInput.value
    .trim()
    .toLocaleLowerCase();
  return appState.allFiles.filter(
    (file) =>
      kinds.has(file.kind) &&
      (!query || searchableText(file).includes(query))
  );
}

function selectedAiSuggestionTypes() {
  return elements.aiSuggestionTypeInputs
    .filter((input) => input.checked)
    .map((input) => input.value);
}

function selectedAiSuggestionScope() {
  return {
    metadata: elements.aiSuggestionIncludeMetadata.checked,
    ocr: elements.aiSuggestionIncludeOcr.checked,
    annotations: elements.aiSuggestionIncludeAnnotations.checked,
    notes: elements.aiSuggestionIncludeNotes.checked,
    translations: elements.aiSuggestionIncludeTranslations.checked,
  };
}

function aiSuggestionProviderInfo(provider) {
  const providerName =
    provider === "claude"
      ? "Claude"
      : provider === "deepseek"
        ? "DeepSeek"
        : "千问";
  const sentenceConfigured =
    appState.aiSentenceSettings.provider === provider &&
    appState.aiSentenceSettings.configured;
  const translation = appState.translationSettings?.[provider] || {};
  return {
    providerName,
    configured: sentenceConfigured || Boolean(translation.configured),
    model: sentenceConfigured
      ? appState.aiSentenceSettings.model
      : translation.model || "",
  };
}

function renderAiSuggestionMaterials() {
  const files = visibleAiSuggestionFiles();
  elements.aiSuggestionSelectedCount.textContent = WorkbenchUiRules.optionalCount(
    appState.aiSuggestionSelectedIds.size,
    (count) => `${count} 份`
  );
  elements.aiSuggestionSelectedCount.classList.toggle(
    "hidden",
    appState.aiSuggestionSelectedIds.size === 0
  );
  if (!files.length) {
    elements.aiSuggestionMaterialList.innerHTML =
      '<div class="ai-suggestion-empty">当前筛选条件下没有材料</div>';
    return;
  }
  elements.aiSuggestionMaterialList.innerHTML = files
    .map((file) => {
      const checked = appState.aiSuggestionSelectedIds.has(file.id);
      const meta = [
        kindLabel(file.kind),
        file.project,
        file.date,
        file.author,
      ]
        .filter(Boolean)
        .join(" · ");
      return `
        <label class="ai-suggestion-material">
          <input type="checkbox" data-ai-material-id="${escapeHtml(file.id)}"
            ${checked ? "checked" : ""} />
          <span>
            <strong title="${escapeHtml(file.name)}">${escapeHtml(
              aiSuggestionMaterialTitle(file)
            )}</strong>
            <span>${escapeHtml(meta || file.name)}</span>
          </span>
        </label>`;
    })
    .join("");
  elements.aiSuggestionMaterialList
    .querySelectorAll("[data-ai-material-id]")
    .forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const id = checkbox.dataset.aiMaterialId;
        if (checkbox.checked) {
          if (appState.aiSuggestionSelectedIds.size >= 20) {
            checkbox.checked = false;
            showToast("一次最多选择 20 份材料", "error");
            return;
          }
          appState.aiSuggestionSelectedIds.add(id);
        } else {
          appState.aiSuggestionSelectedIds.delete(id);
        }
        elements.aiSuggestionConsent.checked = false;
        elements.aiChatConsent.checked = false;
        renderAiSuggestionMaterials();
        renderAiSuggestionPreview();
        renderAiChat();
      });
    });
}

function renderAiSuggestionPreview() {
  const files = selectedAiSuggestionFiles();
  const types = selectedAiSuggestionTypes();
  const scope = selectedAiSuggestionScope();
  const scopeLabels = Object.entries(scope)
    .filter(([, included]) => included)
    .map(([key]) => AI_SUGGESTION_SCOPE_LABELS[key]);
  const provider = elements.aiSuggestionProviderSelect.value || "qwen";
  const providerInfo = aiSuggestionProviderInfo(provider);
  const textLimit = Number(elements.aiSuggestionTextLimit.value) || 10000;
  elements.aiSuggestionProviderStatus.textContent = providerInfo.configured
    ? `已配置 ${providerInfo.providerName} · ${providerInfo.model || "使用本机保存模型"}`
    : `${providerInfo.providerName} 尚未配置，请先在“AI 断句”区保存对应凭据`;
  elements.aiSuggestionProviderStatus.classList.toggle(
    "configured",
    providerInfo.configured
  );
  const materialNames = files.length
    ? files
        .map(
          (file, index) =>
            escapeHtml(
              `${index + 1}. ${kindLabel(file.kind)}｜${aiSuggestionMaterialTitle(
                file
              )}${
                aiSuggestionReferenceSummary(file)
                  ? `（${aiSuggestionReferenceSummary(file)}）`
                  : ""
              }`
            )
        )
        .join("<br />")
    : "尚未勾选材料";
  elements.aiSuggestionPreview.innerHTML = `
    <div><strong>材料：</strong>${files.length} 份（上限 20 份）</div>
    <div class="ai-suggestion-preview-materials">${materialNames}</div>
    <div><strong>固定标识：</strong>每份材料始终附记录编号、类型与标题，用于建议回引。</div>
    <div><strong>文本范围：</strong>${
      scopeLabels.length ? escapeHtml(scopeLabels.join("、")) : "尚未选择"
    }</div>
    <div><strong>长度上限：</strong>每份材料 ${textLimit.toLocaleString(
      "zh-CN"
    )} 字；合计最多 120,000 字，超过时按材料数均分</div>
    <div><strong>建议类型：</strong>${
      types.length
        ? escapeHtml(types.map((type) => AI_SUGGESTION_TYPE_LABELS[type]).join("、"))
        : "尚未选择"
    }</div>
    <div><strong>服务商：</strong>${escapeHtml(providerInfo.providerName)}${
      providerInfo.model ? ` · ${escapeHtml(providerInfo.model)}` : ""
    }</div>`;
  const canGenerate =
    appState.isWritableLibrary &&
    !appState.busy &&
    !appState.aiSuggestionRunning &&
    files.length > 0 &&
    types.length > 0 &&
    scopeLabels.length > 0 &&
    providerInfo.configured &&
    elements.aiSuggestionConsent.checked;
  elements.generateAiSuggestionButton.disabled = !canGenerate;
}

function aiSuggestionBasisLabel(basis) {
  const parts = [
    basis.materialLabel || basis.recordId || "材料",
    basis.page ? `第 ${basis.page} 页` : "",
    basis.annotationId ? `框选 ${basis.annotationId}` : "",
  ].filter(Boolean);
  return parts.join(" · ");
}

function renderAiSuggestionRecords() {
  const records = appState.aiSuggestionRecords || [];
  elements.aiSuggestionRecordCount.textContent = WorkbenchUiRules.optionalCount(
    records.length,
    (count) => `${count} 条`
  );
  elements.aiSuggestionRecordCount.classList.toggle(
    "hidden",
    records.length === 0
  );
  if (!records.length) {
    elements.aiSuggestionRecordList.innerHTML =
      '<div class="ai-suggestion-empty">尚无 AI 建议记录。生成后会独立保存在当前资料库中，不覆盖 OCR、译文或研究笔记。</div>';
    return;
  }
  elements.aiSuggestionRecordList.innerHTML = records
    .map((record) => {
      const materials = (record.materials || [])
        .map(
          (material) =>
            `${kindLabel(material.kind)}｜${currentAiMaterialName(material)}`
        )
        .join("；");
      const items = (record.suggestions || [])
        .map((item) => {
          const inference = item.classification !== "fact";
          const basis = (item.basis || [])
            .map((entry) => {
              const excerpt = entry.excerpt
                ? `：“${String(entry.excerpt).slice(0, 120)}”`
                : "";
              return `${aiSuggestionBasisLabel(entry)}${excerpt}`;
            })
            .join("；");
          return `
            <article class="ai-suggestion-item${inference ? " inference" : ""}">
              <div class="ai-suggestion-item-heading">
                <span class="ai-suggestion-type">${escapeHtml(
                  item.typeLabel || AI_SUGGESTION_TYPE_LABELS[item.type] || "研究建议"
                )}</span>
                <span class="ai-suggestion-classification">${
                  inference ? "AI 推测" : "材料事实"
                }</span>
                <strong>${escapeHtml(item.title || "研究建议")}</strong>
              </div>
              <p>${escapeHtml(item.content || "")}</p>
              <div class="ai-suggestion-basis"><strong>依据：</strong>${
                basis ? escapeHtml(basis) : "AI 未返回具体依据，请重点人工复核"
              }</div>
            </article>`;
        })
        .join("");
      return `
        <article class="ai-suggestion-record">
          <div class="ai-suggestion-record-heading">
            <div>
              <h4>${escapeHtml(record.providerName || record.provider || "AI")} · ${escapeHtml(
                record.model || "研究建议"
              )}</h4>
              <p>${escapeHtml(formatTime(record.createdAt))} · ${
                (record.suggestions || []).length
              } 条建议 · 必须人工复核</p>
            </div>
            <button type="button" class="ai-suggestion-delete"
              data-delete-ai-suggestion="${escapeHtml(record.id)}">删除记录</button>
          </div>
          <div class="ai-suggestion-material-summary">
            <strong>所用材料：</strong>${escapeHtml(materials || "—")}
          </div>
          <div class="ai-suggestion-items">${
            items ||
            '<div class="ai-suggestion-empty">未能拆分为结构化建议。</div>'
          }</div>
        </article>`;
    })
    .join("");
  elements.aiSuggestionRecordList
    .querySelectorAll("[data-delete-ai-suggestion]")
    .forEach((button) => {
      button.addEventListener("click", () =>
        deleteAiSuggestionRecord(button.dataset.deleteAiSuggestion)
      );
    });
}

function switchAiSuggestionRightPanel(panel) {
  appState.aiSuggestionRightPanel = panel === "chat" ? "chat" : "records";
  elements.aiSuggestionRightTabs.forEach((button) => {
    const active =
      button.dataset.aiRightPanel === appState.aiSuggestionRightPanel;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  elements.aiSuggestionRightContents.forEach((content) => {
    content.classList.toggle(
      "hidden",
      content.dataset.aiRightContent !== appState.aiSuggestionRightPanel
    );
  });
  if (appState.aiSuggestionRightPanel === "chat") {
    renderAiChat();
  }
}

function renderAiChat() {
  renderAiChatFontSize();
  const messages = appState.aiChatMessages || [];
  const provider = elements.aiChatProviderSelect.value || "qwen";
  const providerInfo = aiSuggestionProviderInfo(provider);
  const selectedFiles = selectedAiSuggestionFiles();
  const scope = selectedAiSuggestionScope();
  const scopeLabels = Object.entries(scope)
    .filter(([, included]) => included)
    .map(([key]) => AI_SUGGESTION_SCOPE_LABELS[key]);
  elements.aiChatProviderStatus.textContent = providerInfo.configured
    ? `已配置 ${providerInfo.providerName} · ${
        providerInfo.model || "使用本机保存模型"
      }`
    : `${providerInfo.providerName} 尚未配置，请先在“AI 断句”区保存对应凭据`;
  elements.aiChatProviderStatus.classList.toggle(
    "configured",
    providerInfo.configured
  );
  elements.aiChatConsentText.textContent =
    `我确认将本次问题及左侧所选 ${selectedFiles.length} 份材料的所选纯文本范围发送给${providerInfo.providerName}；原件文件不会上传。`;
  elements.aiChatContextSummary.textContent = selectedFiles.length
    ? `自动附上 ${selectedFiles.length} 份材料 · ${
        scopeLabels.length ? scopeLabels.join("、") : "尚未选择文本范围"
      }`
    : "请先在左侧勾选材料";
  elements.aiChatMessages.innerHTML = messages.length
    ? messages
        .map((message) => {
          const assistant = message.role === "assistant";
          const contextCount = Number(message.contextMaterialCount) || 0;
          return `
            <article class="ai-chat-message ${
              assistant ? "assistant" : "user"
            }${message.pending ? " pending" : ""}${
              message.failed ? " failed" : ""
            }">
              ${
                contextCount
                  ? `<span class="ai-chat-context-badge">附 ${contextCount} 份材料</span>`
                  : ""
              }
              <p>${escapeHtml(message.text || "")}</p>
              <small>${
                assistant
                  ? `${escapeHtml(
                      message.providerName || message.provider || "AI"
                    )}${message.model ? ` · ${escapeHtml(message.model)}` : ""}`
                  : "操作者"
              } · ${escapeHtml(formatTime(message.createdAt))}${
                message.pending
                  ? " · 正在等待回答"
                  : message.failed
                    ? " · 发送未完成，可复制后重试"
                    : ""
              }</small>
            </article>`;
        })
        .join("")
    : '<div class="ai-chat-empty">在下方输入问题。左侧当前勾选的材料及范围会自动随问题附上。</div>';
  window.requestAnimationFrame(() => {
    const userMessages = elements.aiChatMessages.querySelectorAll(
      ".ai-chat-message.user"
    );
    const latestQuestion = userMessages[userMessages.length - 1];
    latestQuestion?.scrollIntoView({ block: "start" });
  });
  const canSend =
    appState.isWritableLibrary &&
    !appState.busy &&
    !appState.aiChatRunning &&
    providerInfo.configured &&
    Boolean(elements.aiChatQuestionInput.value.trim()) &&
    elements.aiChatConsent.checked &&
    selectedFiles.length > 0 &&
    scopeLabels.length > 0;
  elements.sendAiChatButton.disabled = !canSend;
  elements.clearAiChatButton.disabled =
    appState.busy || appState.aiChatRunning || !messages.length;
}

async function sendAiChatQuestion() {
  if (appState.busy || appState.aiChatRunning) return;
  const question = elements.aiChatQuestionInput.value.trim();
  const recordIds = selectedAiSuggestionFiles().map((file) => file.id);
  const scope = selectedAiSuggestionScope();
  if (!question) {
    showToast("请先输入问题", "error");
    return;
  }
  if (!recordIds.length || !Object.values(scope).some(Boolean)) {
    showToast("请先勾选要附加的材料和文本范围", "error");
    return;
  }
  if (!elements.aiChatConsent.checked) {
    showToast("每次发送前请明确确认", "error");
    return;
  }
  const pendingMessageId = `pending-${Date.now()}`;
  appState.aiChatMessages = [
    ...(appState.aiChatMessages || []),
    {
      id: pendingMessageId,
      role: "user",
      text: question,
      createdAt: new Date().toISOString(),
      contextMaterialCount: recordIds.length,
      pending: true,
    },
  ];
  elements.aiChatQuestionInput.value = "";
  elements.aiChatConsent.checked = false;
  appState.aiChatRunning = true;
  renderAiChat();
  setBusy(true);
  const selectedProvider = elements.aiChatProviderSelect.value;
  setStatus(
    selectedProvider === "qwen"
      ? "正在等待千问回答（已使用非思考同步模式，最长等待约2分钟）；回答内容必须人工复核…"
      : "正在等待 AI 回答；回答内容必须人工复核…"
  );
  try {
    const data = await request("/api/ai-chat", {
      method: "POST",
      body: JSON.stringify({
        action: "ask",
        question,
        provider: selectedProvider,
        recordIds,
        scope,
        textLimit: Number(elements.aiSuggestionTextLimit.value) || 10000,
        consent: true,
      }),
    });
    appState.aiChatMessages = data.aiChatMessages || [];
    renderAiChat();
    showToast("AI 已回答，请人工复核");
    setStatus("问答记录已独立保存，没有覆盖AI建议、OCR、译文或研究笔记");
  } catch (error) {
    appState.aiChatMessages = (appState.aiChatMessages || []).map((message) =>
      message.id === pendingMessageId
        ? { ...message, pending: false, failed: true }
        : message
    );
    showToast(error.message, "error");
    setStatus(`AI 问答未完成：${error.message}`);
  } finally {
    appState.aiChatRunning = false;
    setBusy(false);
    renderAiChat();
  }
}

async function clearAiChat() {
  if (
    appState.busy ||
    !(await confirmAction("确定清空当前资料库中的全部AI自由问答记录吗？"))
  ) {
    return;
  }
  setBusy(true);
  try {
    const data = await request("/api/ai-chat", {
      method: "POST",
      body: JSON.stringify({ action: "clear" }),
    });
    appState.aiChatMessages = data.aiChatMessages || [];
    renderAiChat();
    showToast("AI自由问答记录已清空");
  } catch (error) {
    showToast(error.message, "error");
  } finally {
    setBusy(false);
    renderAiChat();
  }
}

function renderAiSuggestionWorkspace() {
  renderAiSuggestionMaterials();
  renderAiSuggestionPreview();
  renderAiSuggestionRecords();
  renderAiChat();
  switchAiSuggestionRightPanel(appState.aiSuggestionRightPanel);
}

async function generateAiSuggestion() {
  if (appState.busy || appState.aiSuggestionRunning) return;
  const recordIds = selectedAiSuggestionFiles().map((file) => file.id);
  const types = selectedAiSuggestionTypes();
  const scope = selectedAiSuggestionScope();
  if (!recordIds.length || !types.length || !Object.values(scope).some(Boolean)) {
    showToast("请先选择材料、文本范围和建议类型", "error");
    return;
  }
  if (!elements.aiSuggestionConsent.checked) {
    showToast("发送前请核对预览并明确确认", "error");
    return;
  }
  appState.aiSuggestionRunning = true;
  setBusy(true);
  renderAiSuggestionPreview();
  const selectedProvider = elements.aiSuggestionProviderSelect.value;
  setStatus(
    selectedProvider === "qwen"
      ? "正在使用千问非思考同步模式生成 AI 建议（最长等待约2分钟）…"
      : "正在根据已确认的纯文本范围生成 AI 建议…"
  );
  try {
    const data = await request("/api/ai-suggestions", {
      method: "POST",
      body: JSON.stringify({
        action: "generate",
        recordIds,
        types,
        scope,
        textLimit: Number(elements.aiSuggestionTextLimit.value) || 10000,
        provider: selectedProvider,
        consent: true,
      }),
    });
    appState.aiSuggestionRecords =
      data.aiSuggestions || appState.aiSuggestionRecords;
    elements.aiSuggestionConsent.checked = false;
    renderAiSuggestionWorkspace();
    showToast("AI 建议已生成并保存，请逐条人工复核");
    setStatus("AI 建议已独立保存；没有覆盖 OCR、译文或记录笔记");
  } catch (error) {
    showToast(error.message, "error");
    setStatus(`AI 建议未完成：${error.message}`);
  } finally {
    appState.aiSuggestionRunning = false;
    setBusy(false);
    renderAiSuggestionPreview();
  }
}

async function deleteAiSuggestionRecord(id) {
  if (
    appState.busy ||
    !(await confirmAction("确定删除这条独立的 AI 建议记录吗？"))
  ) {
    return;
  }
  setBusy(true);
  try {
    const data = await request("/api/ai-suggestions", {
      method: "POST",
      body: JSON.stringify({ action: "delete", suggestionId: id }),
    });
    appState.aiSuggestionRecords =
      data.aiSuggestions || appState.aiSuggestionRecords;
    renderAiSuggestionRecords();
    showToast("AI 建议记录已删除");
  } catch (error) {
    showToast(error.message, "error");
  } finally {
    setBusy(false);
    renderAiSuggestionPreview();
  }
}

function openAiSuggestion() {
  elements.historyModal.classList.add("hidden");
  elements.favoriteWebsitesModal.classList.add("hidden");
  closeTimeline();
  appState.aiBuilderOpen = false;
  renderWorkspaceLayout();
  elements.folderImportModal.classList.add("hidden");
  elements.textExportModal.classList.add("hidden");
  if (
    !appState.aiSuggestionSelectedIds.size &&
    appState.selectedId &&
    appState.allFiles.some((file) => file.id === appState.selectedId)
  ) {
    appState.aiSuggestionSelectedIds.add(appState.selectedId);
  }
  renderAiSuggestionWorkspace();
  elements.aiSuggestionModal.classList.remove("hidden");
  setActiveRailButton(elements.aiSuggestionNavButton);
}

function closeAiSuggestion() {
  elements.aiSuggestionModal.classList.add("hidden");
  setActiveRailButton(elements.workspaceNavButton);
}

function folderImportFileSize(value) {
  const bytes = Math.max(0, Number(value) || 0);
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

function resetFolderImportScan() {
  appState.folderImport = {
    token: "",
    sourceFolder: "",
    items: [],
    selectedIds: new Set(),
    capped: false,
    browserFiles: new Map(),
  };
}

function renderFolderImportProjectOptions() {
  const current = elements.folderImportProject.value;
  elements.folderImportProject.innerHTML = appState.projects
    .map(
      (project) =>
        `<option value="${escapeHtml(project.name)}">${escapeHtml(
          project.name
        )}</option>`
    )
    .join("");
  const preferred =
    current ||
    (appState.activeProject !== "all" ? appState.activeProject : "");
  if (
    preferred &&
    appState.projects.some((project) => project.name === preferred)
  ) {
    elements.folderImportProject.value = preferred;
  }
}

function folderImportExistingPaths() {
  const project = elements.folderImportProject.value;
  return new Set(
    appState.allFiles
      .filter((file) => file.project === project)
      .map((file) => file.relativePath.replace(/\//g, "\\").toLowerCase())
  );
}

function updateFolderImportControls() {
  const state = appState.folderImport;
  const selectedCount = state.selectedIds.size;
  const canPrepareImport = appState.isWritableLibrary;
  elements.folderImportProject.disabled = appState.busy || !canPrepareImport;
  elements.chooseImportSourceFolderButton.disabled =
    appState.busy || !canPrepareImport;
  elements.chooseImportSourceFilesButton.disabled =
    appState.busy || !canPrepareImport;
  elements.folderImportRecursive.disabled = appState.busy || !canPrepareImport;
  elements.folderImportPreserveStructure.disabled =
    appState.busy || !canPrepareImport;
  elements.folderImportConflictPolicy.disabled =
    appState.busy || !canPrepareImport;
  elements.folderImportSelectionSummary.textContent = state.items.length
    ? `已扫描 ${state.items.length} 份，已勾选 ${selectedCount} 份${
        state.capped ? "；扫描结果已达到2000份上限" : ""
      }`
    : "尚未扫描材料";
  elements.selectAllFolderImportItems.disabled =
    appState.busy || !state.items.length;
  elements.deselectAllFolderImportItems.disabled =
    appState.busy || !selectedCount;
  elements.clearFolderImportItems.disabled =
    appState.busy || !state.items.length;
  elements.commitFolderImportButton.disabled =
    appState.busy ||
    !canPrepareImport ||
    !state.token ||
    !selectedCount ||
    !elements.folderImportProject.value;
  elements.commitFolderImportButton.textContent = selectedCount
    ? `导入 ${selectedCount} 项`
    : "导入";
}

function renderFolderImportList() {
  const state = appState.folderImport;
  if (!state.items.length) {
    elements.folderImportList.innerHTML = "";
    updateFolderImportControls();
    return;
  }
  const project = elements.folderImportProject.value;
  const preserve = elements.folderImportPreserveStructure.checked;
  const existingPaths = folderImportExistingPaths();
  elements.folderImportList.innerHTML = state.items
    .map((item) => {
      const destinationRelative = `${project}\\${
        preserve ? item.relativePath : item.name
      }`
        .replace(/\//g, "\\")
        .toLowerCase();
      const conflict = existingPaths.has(destinationRelative);
      return `
        <div class="folder-import-item">
          <input type="checkbox" data-folder-import-id="${escapeHtml(item.id)}"
            ${state.selectedIds.has(item.id) ? "checked" : ""} />
          <strong title="${escapeHtml(item.name)}">${escapeHtml(
            item.name
          )}</strong>
          <span class="folder-import-relative" title="${escapeHtml(
            item.relativePath
          )}">${escapeHtml(item.relativePath)}</span>
          <span class="folder-import-kind">${escapeHtml(
            String(item.extension || "").replace(".", "").toUpperCase()
          )}</span>
          <span class="folder-import-size">${
            conflict
              ? "目标位置已有同名"
              : escapeHtml(folderImportFileSize(item.size))
          }</span>
          <button type="button" class="folder-import-remove"
            data-remove-folder-import-id="${escapeHtml(item.id)}"
            aria-label="从导入候选中移除 ${escapeHtml(item.name)}"
            title="从候选清单移除">×</button>
        </div>`;
    })
    .join("");
  elements.folderImportList
    .querySelectorAll("[data-folder-import-id]")
    .forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          state.selectedIds.add(checkbox.dataset.folderImportId);
        } else {
          state.selectedIds.delete(checkbox.dataset.folderImportId);
        }
        updateFolderImportControls();
      });
    });
  elements.folderImportList
    .querySelectorAll("[data-remove-folder-import-id]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const itemId = button.dataset.removeFolderImportId;
        state.items = state.items.filter((item) => item.id !== itemId);
        state.selectedIds.delete(itemId);
        state.browserFiles.delete(itemId);
        if (!state.items.length) {
          state.token = "";
          state.sourceFolder = "";
          state.capped = false;
        }
        renderFolderImportList();
        setStatus("已从导入候选中移除一份材料；来源文件未被删除");
      });
    });
  updateFolderImportControls();
}

function openFolderImport() {
  elements.historyModal.classList.add("hidden");
  elements.favoriteWebsitesModal.classList.add("hidden");
  closeTimeline();
  closeAiSuggestion();
  elements.textExportModal.classList.add("hidden");
  const alreadyOpen = !elements.folderImportModal.classList.contains("hidden");
  if (!appState.busy && !alreadyOpen) {
    resetFolderImportScan();
  }
  renderFolderImportProjectOptions();
  renderFolderImportList();
  elements.folderImportModal.classList.remove("hidden");
  setActiveRailButton(elements.folderImportButton);
  if (appState.busy) {
    setStatus("导入窗口已打开；当前操作完成后即可继续选择和导入材料。");
  } else if (!appState.isWritableLibrary) {
    setStatus("请先在导入窗口右上角选择可写资料库。");
  } else if (!appState.projects.length) {
    setStatus("首次导入时将自动建立“未归档资料”项目。");
  }
}

function closeFolderImport() {
  elements.folderImportModal.classList.add("hidden");
  setActiveRailButton(elements.workspaceNavButton);
}

const BROWSER_FOLDER_IMPORT_EXTENSIONS = new Set([
  ".pdf",
  ".png",
  ".jpg",
  ".jpeg",
  ".tif",
  ".tiff",
  ".bmp",
  ".webp",
]);

function folderImportSourceKey(sourceFolder, relativePath) {
  return `${String(sourceFolder || "所选文件夹")}/${String(
    relativePath || ""
  )}`
    .replaceAll("\\", "/")
    .toLocaleLowerCase();
}

function applyFolderImportScan(data, browserFiles = new Map()) {
  const state = appState.folderImport;
  const sourceFolder = String(data.sourceFolder || "所选文件夹");
  const existingKeys = new Set(
    state.items.map(
      (item) =>
        item._sourceKey ||
        folderImportSourceKey(item._sourceFolder, item.relativePath)
    )
  );
  const addedItems = [];
  for (const item of data.items || []) {
    const sourceKey = folderImportSourceKey(
      sourceFolder,
      item.relativePath
    );
    if (existingKeys.has(sourceKey)) {
      continue;
    }
    existingKeys.add(sourceKey);
    const appended = {
      ...item,
      _scanToken:
        data.token && data.token !== "browser-folder-import" ? data.token : "",
      _sourceFolder: sourceFolder,
      _sourceKey: sourceKey,
    };
    addedItems.push(appended);
    state.selectedIds.add(appended.id);
    if (browserFiles.has(item.id)) {
      state.browserFiles.set(item.id, browserFiles.get(item.id));
    }
  }
  state.items.push(...addedItems);
  state.token = state.items.length ? "folder-import-batch" : "";
  state.sourceFolder = sourceFolder;
  state.capped = state.capped || Boolean(data.capped);
  renderFolderImportList();
  const duplicateCount = Math.max(
    0,
    (data.items?.length || 0) - addedItems.length
  );
  setStatus(
    addedItems.length
      ? `本次新增 ${addedItems.length} 份，清单共 ${state.items.length} 份${
          duplicateCount ? `；已略过 ${duplicateCount} 份重复材料` : ""
        }`
      : data.items?.length
        ? "所选文件夹中的材料已经在当前清单中"
        : "所选文件夹中没有支持的材料文件"
  );
}

function prepareBrowserFolderImport(fileList) {
  const recursive = elements.folderImportRecursive.checked;
  const browserFiles = new Map();
  const items = [];
  let sourceFolder = "";
  for (const file of Array.from(fileList || [])) {
    const rawRelative = String(file.webkitRelativePath || file.name || "")
      .replaceAll("\\", "/")
      .replace(/^\/+/, "");
    const parts = rawRelative.split("/").filter(Boolean);
    if (!parts.length) continue;
    if (!sourceFolder && parts.length > 1) sourceFolder = parts[0];
    const relativeParts = parts.length > 1 ? parts.slice(1) : parts;
    if (!recursive && relativeParts.length > 1) continue;
    const relativePath = relativeParts.join("/");
    const name = relativeParts.at(-1) || file.name;
    const dotIndex = name.lastIndexOf(".");
    const extension =
      dotIndex >= 0 ? name.slice(dotIndex).toLocaleLowerCase() : "";
    if (!BROWSER_FOLDER_IMPORT_EXTENSIONS.has(extension)) continue;
    const id = `browser-folder-import-${crypto.randomUUID()}`;
    items.push({
      id,
      name,
      relativePath,
      extension,
      size: file.size,
    });
    browserFiles.set(id, file);
    if (items.length >= 2000) break;
  }
  items.sort((a, b) =>
    a.relativePath.localeCompare(b.relativePath, "zh-CN", { numeric: true })
  );
  applyFolderImportScan(
    {
      token: browserFiles.size ? "browser-folder-import" : "",
      sourceFolder: sourceFolder || "所选文件夹",
      items,
      capped: items.length >= 2000,
    },
    browserFiles
  );
}

async function chooseFolderImportSource() {
  if (appState.busy) return;
  const desktopBridge = window.historicalWorkbenchDesktop;
  if (typeof desktopBridge?.chooseFolder !== "function") {
    elements.folderImportBrowserPicker.value = "";
    elements.folderImportBrowserPicker.click();
    setStatus("请在浏览器文件夹窗口中选择需要批量导入的材料文件夹…");
    return;
  }
  setStatus("请在弹出的窗口中选择需要批量导入的材料文件夹…");
  try {
    const selection = await desktopBridge.chooseFolder({
      title: "选择需要批量导入的材料文件夹",
      createDirectory: false,
    });
    if (selection?.cancelled || !selection?.folderPath) {
      setStatus("已取消选择导入文件夹");
      return;
    }
    await scanFolderImportPaths([selection.folderPath]);
  } catch (error) {
    showToast(error.message, "error");
    setStatus("文件夹扫描未完成");
  }
}

async function ensureFolderImportProject() {
  if (!appState.isWritableLibrary) {
    throw new Error("请先选择或初始化一个可写资料库");
  }
  if (!appState.projects.length) {
    const data = await request("/api/create-project", {
      method: "POST",
      body: JSON.stringify({ name: "未归档资料" }),
    });
    appState.activeProject = data.createdProject;
    applyServerState(data, appState.selectedId, appState.selectedIndex);
    showToast("已自动建立“未归档资料”项目");
  }
  renderFolderImportProjectOptions();
  if (!elements.folderImportProject.value && appState.projects.length) {
    elements.folderImportProject.value = appState.projects[0].name;
  }
  return elements.folderImportProject.value;
}

async function scanFolderImportPaths(sourcePaths) {
  const paths = Array.from(sourcePaths || []).filter(Boolean);
  if (!paths.length || appState.busy) return;
  setBusy(true);
  setStatus(`正在扫描 ${paths.length} 个导入来源…`);
  try {
    const targetProject = await ensureFolderImportProject();
    const data = await request("/api/folder-import-scan", {
      method: "POST",
      body: JSON.stringify({
        targetProject,
        recursive: elements.folderImportRecursive.checked,
        sourcePaths: paths,
      }),
    });
    applyFolderImportScan(data);
  } catch (error) {
    showToast(error.message, "error");
    setStatus(`导入来源扫描未完成：${error.message}`);
  } finally {
    setBusy(false);
    renderFolderImportList();
  }
}

async function chooseFolderImportFiles() {
  if (appState.busy) return;
  const desktopBridge = window.historicalWorkbenchDesktop;
  if (typeof desktopBridge?.chooseFiles !== "function") {
    elements.folderImportBrowserFilePicker.value = "";
    elements.folderImportBrowserFilePicker.click();
    return;
  }
  const selection = await desktopBridge.chooseFiles({
    title: "选择需要导入的史料文件",
  });
  if (selection?.cancelled || !selection?.filePaths?.length) {
    setStatus("已取消选择导入文件");
    return;
  }
  await scanFolderImportPaths(selection.filePaths);
}

async function commitFolderImport() {
  const state = appState.folderImport;
  if (
    appState.busy ||
    !state.token ||
    !state.selectedIds.size
  ) {
    return;
  }
  const targetProject = elements.folderImportProject.value;
  setBusy(true);
  setStatus(`正在把已勾选材料复制到项目“${targetProject}”…`);
  try {
    let importedCount = 0;
    let skippedCount = 0;
    const failures = [];
    const selectedItems = state.items.filter((item) =>
      state.selectedIds.has(item.id)
    );
    const nativeGroups = new Map();
    for (const item of selectedItems) {
      if (state.browserFiles.has(item.id)) continue;
      if (!item._scanToken) {
        failures.push({
          name: item.name,
          relativePath: item.relativePath,
          message: "该文件夹扫描记录已失效，请重新选择来源文件夹",
        });
        continue;
      }
      if (!nativeGroups.has(item._scanToken)) {
        nativeGroups.set(item._scanToken, []);
      }
      nativeGroups.get(item._scanToken).push(item);
    }
    for (const item of selectedItems) {
      if (!state.browserFiles.has(item.id)) continue;
      const file = state.browserFiles.get(item.id);
      if (!file) {
        failures.push({
          name: item.name,
          relativePath: item.relativePath,
          message: "浏览器没有保留该文件，请重新选择来源文件夹",
        });
        continue;
      }
      const query = new URLSearchParams({
        targetProject,
        relativePath: item.relativePath,
        preserveStructure: String(
          elements.folderImportPreserveStructure.checked
        ),
        conflictPolicy: elements.folderImportConflictPolicy.value,
        consent: "true",
      });
      try {
        const response = await fetch(
          `/api/folder-import-browser-file?${query.toString()}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/octet-stream" },
            body: file,
          }
        );
        const result = await response.json();
        if (!response.ok || result.ok === false) {
          throw new Error(result.error || "材料复制失败");
        }
        importedCount += result.importedCount || 0;
        skippedCount += result.skippedCount || 0;
      } catch (error) {
        failures.push({
          name: item.name,
          relativePath: item.relativePath,
          message: String(error.message || error),
        });
      }
    }
    for (const [token, items] of nativeGroups) {
      try {
        const batchData = await request("/api/folder-import-commit", {
          method: "POST",
          body: JSON.stringify({
            token,
            itemIds: items.map((item) => item.id),
            targetProject,
            preserveStructure:
              elements.folderImportPreserveStructure.checked,
            conflictPolicy: elements.folderImportConflictPolicy.value,
            consent: true,
          }),
        });
        const batchResult = batchData.folderImportResult || {};
        importedCount += batchResult.importedCount || 0;
        skippedCount += batchResult.skippedCount || 0;
        failures.push(...(batchResult.failures || []));
      } catch (error) {
        failures.push(
          ...items.map((item) => ({
            name: item.name,
            relativePath: item.relativePath,
            message: String(error.message || error),
          }))
        );
      }
    }
    const data = await request("/api/bootstrap");
    data.folderImportResult = {
      project: targetProject,
      importedCount,
      skippedCount,
      failedCount: failures.length,
      failures,
    };
    const result = data.folderImportResult || {};
    appState.activeProject = targetProject;
    applyServerState(data, "", 0);
    closeFolderImport();
    showToast(
      `已导入${result.importedCount || 0}份，跳过${
        result.skippedCount || 0
      }份，失败${result.failedCount || 0}份`
    );
    setStatus(
      result.failedCount
        ? `文件夹导入部分完成；${result.failedCount}份失败，来源文件均未移动或删除`
        : `文件夹导入完成；来源文件均未移动或删除`
    );
  } catch (error) {
    showToast(error.message, "error");
    setStatus("文件夹导入未完成；来源文件没有被移动或删除");
  } finally {
    setBusy(false);
    updateFolderImportControls();
  }
}

function textExportProjectOptions() {
  const current = elements.textExportProjectFilter.value;
  elements.textExportProjectFilter.innerHTML = [
    '<option value="all">全部项目</option>',
    ...appState.projects.map(
      (project) =>
        `<option value="${escapeHtml(project.name)}">${escapeHtml(
          project.name
        )}（${project.count}份）</option>`
    ),
    '<option value="未分类">未分类</option>',
  ].join("");
  const preferred =
    current ||
    (appState.activeProject !== "all" ? appState.activeProject : "all");
  elements.textExportProjectFilter.value = Array.from(
    elements.textExportProjectFilter.options
  ).some((option) => option.value === preferred)
    ? preferred
    : "all";
}

function filteredTextExportFiles() {
  const project = elements.textExportProjectFilter.value || "all";
  const query = elements.textExportSearchInput.value
    .trim()
    .toLocaleLowerCase();
  return appState.allFiles.filter((file) => {
    if (project !== "all" && file.project !== project) return false;
    if (!query) return true;
    return [
      file.name,
      file.originalName,
      file.title,
      file.author,
      file.paper,
      file.journal,
      file.project,
      ...(file.tags || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase()
      .includes(query);
  });
}

function selectedTextExportScopes() {
  return new Set(
    elements.textExportScopeInputs
      .filter((input) => input.checked)
      .map((input) => input.dataset.exportScope)
  );
}

function updateTextExportControls() {
  const visible = filteredTextExportFiles();
  const selectedCount = appState.textExportSelectedIds.size;
  const scopeCount = selectedTextExportScopes().size;
  elements.textExportSelectionSummary.textContent =
    `当前列表 ${visible.length} 份，已选择 ${selectedCount} 份`;
  elements.selectVisibleTextExportItems.disabled =
    appState.busy || !visible.length;
  elements.clearTextExportItems.disabled =
    appState.busy || !selectedCount;
  elements.downloadTextExportButton.disabled =
    appState.busy ||
    !selectedCount ||
    !scopeCount ||
    !elements.textExportFilename.value.trim();
  elements.resetTextExportFolderButton.disabled =
    appState.busy || !appState.textExportDirectoryHandle;
}

function renderTextExportLocation() {
  const handle = appState.textExportDirectoryHandle;
  elements.textExportFolderName.textContent = handle?.name
    ? handle.name
    : "浏览器默认下载位置";
  elements.textExportFolderName.title = handle?.name || "";
  elements.textExportFolderHint.textContent = handle
    ? "导出文件将直接写入这个文件夹；浏览器不会向网页暴露完整磁盘路径。"
    : "可选择自定义文件夹；浏览器出于隐私保护只显示文件夹名称。";
  updateTextExportControls();
}

async function chooseTextExportFolder() {
  if (appState.busy) return;
  if (typeof window.showDirectoryPicker !== "function") {
    showToast(
      "当前浏览器不支持自定义导出文件夹，将继续使用浏览器默认下载位置",
      "error"
    );
    return;
  }
  try {
    const handle = await window.showDirectoryPicker({
      id: "historical-workbench-text-export",
      mode: "readwrite",
    });
    if (typeof handle.requestPermission === "function") {
      const permission = await handle.requestPermission({
        mode: "readwrite",
      });
      if (permission !== "granted") {
        throw new Error("没有获得所选文件夹的写入权限");
      }
    }
    appState.textExportDirectoryHandle = handle;
    renderTextExportLocation();
    showToast(`已选择导出文件夹：${handle.name}`);
  } catch (error) {
    if (error?.name === "AbortError") {
      setStatus("已取消选择导出文件夹");
      return;
    }
    showToast(`无法使用所选导出文件夹：${error.message}`, "error");
  }
}

function resetTextExportFolder() {
  appState.textExportDirectoryHandle = null;
  renderTextExportLocation();
  setStatus("文本导出将使用浏览器默认下载位置");
}

function renderTextExportMaterials() {
  const files = filteredTextExportFiles();
  if (!files.length) {
    elements.textExportMaterialList.innerHTML =
      '<div class="import-review-empty">当前筛选范围没有可导出的材料。</div>';
    updateTextExportControls();
    return;
  }
  elements.textExportMaterialList.innerHTML = files
    .map(
      (file) => `
        <label class="text-export-material-item">
          <input type="checkbox" data-text-export-id="${escapeHtml(file.id)}"
            ${appState.textExportSelectedIds.has(file.id) ? "checked" : ""} />
          <strong title="${escapeHtml(file.name)}">${escapeHtml(
            file.name
          )}</strong>
          <span class="text-export-project">${escapeHtml(file.project)}</span>
          <span class="text-export-kind">${escapeHtml(
            kindLabel(file.kind)
          )}</span>
          <span class="text-export-date">${escapeHtml(
            file.date || "未标日期"
          )}</span>
        </label>`
    )
    .join("");
  elements.textExportMaterialList
    .querySelectorAll("[data-text-export-id]")
    .forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          appState.textExportSelectedIds.add(checkbox.dataset.textExportId);
        } else {
          appState.textExportSelectedIds.delete(checkbox.dataset.textExportId);
        }
        updateTextExportControls();
      });
    });
  updateTextExportControls();
}

function defaultTextExportFilename() {
  const timestamp = new Date()
    .toISOString()
    .slice(0, 16)
    .replace(/[-:T]/g, "");
  return `史料文本导出-${timestamp}`;
}

function openTextExport() {
  elements.historyModal.classList.add("hidden");
  elements.favoriteWebsitesModal.classList.add("hidden");
  closeTimeline();
  closeAiSuggestion();
  elements.folderImportModal.classList.add("hidden");
  textExportProjectOptions();
  elements.textExportSearchInput.value = "";
  elements.textExportFilename.value = defaultTextExportFilename();
  appState.textExportSelectedIds = new Set(
    appState.selectedId &&
      appState.allFiles.some((file) => file.id === appState.selectedId)
      ? [appState.selectedId]
      : filteredTextExportFiles().map((file) => file.id)
  );
  renderTextExportMaterials();
  renderTextExportLocation();
  elements.textExportModal.classList.remove("hidden");
  setActiveRailButton(elements.exportNavButton);
}

function closeTextExport() {
  elements.textExportModal.classList.add("hidden");
  setActiveRailButton(elements.workspaceNavButton);
}

function textExportOcrEntries(file) {
  const regions = Array.isArray(file.ocrRegions) ? file.ocrRegions : [];
  if (regions.length) return regions;
  return (Array.isArray(file.ocrPages) ? file.ocrPages : []).map((page) => ({
    ...page,
    mode: "full-page",
    annotationId: "",
  }));
}

function textExportAnnotationContent(file, annotation) {
  const matches = (file.ocrRegions || []).filter(
    (entry) => entry.annotationId === annotation.id
  );
  const latest = [...matches].sort((a, b) =>
    String(b.updatedAt || b.recognizedAt || "").localeCompare(
      String(a.updatedAt || a.recognizedAt || "")
    )
  )[0];
  const text = String(latest?.correctedText || latest?.rawText || "").trim();
  const sourceText = String(latest?.translationSourceText || "").trim();
  const translatedRichText = normalizedRichTextSegments(
    latest?.correctedRichText,
    text
  );
  if (sourceText && text) {
    return {
      text: `【翻译前文本】\n${sourceText}\n\n【翻译后文本】\n${text}`,
      richText: translatedRichText,
      blocks: [
        {
          label: "翻译前文本",
          text: sourceText,
          richText: normalizedRichTextSegments(
            latest?.translationSourceRichText,
            sourceText
          ),
        },
        {
          label: "翻译后文本",
          text,
          richText: translatedRichText,
        },
      ],
    };
  }
  return {
    text,
    richText: translatedRichText,
  };
}

const TEXT_EXPORT_SCOPE_STYLES = {
  metadata: {
    accent: "#0f6f70",
    border: "#6fb8b5",
    background: "#f2fbfa",
    headingBackground: "#d9efed",
  },
  ocrRaw: {
    accent: "#245f8f",
    border: "#7dafd0",
    background: "#f3f8fc",
    headingBackground: "#ddebf6",
  },
  ai: {
    accent: "#5b4b8a",
    border: "#a79bc6",
    background: "#f6f4fa",
    headingBackground: "#e9e4f3",
  },
  annotations: {
    accent: "#2e765b",
    border: "#83b89f",
    background: "#f3faf6",
    headingBackground: "#ddefe5",
  },
  translations: {
    accent: "#0f7880",
    border: "#76b9bd",
    background: "#f2fafa",
    headingBackground: "#dceff0",
  },
  notes: {
    accent: "#8a5a1f",
    border: "#c9a774",
    background: "#fcf8f1",
    headingBackground: "#f3e7d5",
  },
};

function textExportScopeStyle(key) {
  return TEXT_EXPORT_SCOPE_STYLES[key] || TEXT_EXPORT_SCOPE_STYLES.metadata;
}

function textExportRichSegmentHtml(segment, wordCompatible = false) {
  const colorName = richColorName(segment.color);
  const color = RICH_TEXT_COLOR_HEX[colorName] || RICH_TEXT_COLOR_HEX.black;
  const size = normalizedTextFontSize(segment.size);
  const text = escapeHtml(segment.text).replaceAll("\n", "<br>");
  const visibleText = segment.bold ? `<strong>${text}</strong>` : text;
  const fontUnit = wordCompatible ? "pt" : "px";
  const wordStyle = wordCompatible
    ? `;font-family:'Microsoft YaHei';mso-ascii-font-family:'Microsoft YaHei';mso-fareast-font-family:'Microsoft YaHei';mso-hansi-font-family:'Microsoft YaHei';mso-ansi-font-size:${size}pt;mso-bidi-font-size:${size}pt`
    : "";
  return `<span data-rich-color="${colorName}" data-rich-size="${size}" data-rich-bold="${
    segment.bold ? "true" : "false"
  }" style="color:${color}!important;font-size:${size}${fontUnit}!important;font-weight:${
    segment.bold ? "700" : "400"
  }!important${wordStyle}"><font${
    wordCompatible ? ' face="Microsoft YaHei"' : ""
  } color="${color}" style="color:${color};font-size:${size}${fontUnit};font-weight:${
    segment.bold ? "700" : "400"
  };${
    wordCompatible
      ? "font-family:'Microsoft YaHei';mso-fareast-font-family:'Microsoft YaHei'"
      : ""
  }">${visibleText}</font></span>`;
}

function textExportRichHtml(
  value,
  fallbackText = "",
  { wordCompatible = false } = {}
) {
  return normalizedRichTextSegments(value, fallbackText)
    .map((segment) => textExportRichSegmentHtml(segment, wordCompatible))
    .join("");
}

function textExportEntryHtml(entry, options = {}) {
  const blockTextAlignment = options.leftAligned
    ? "text-align:left !important;text-justify:auto"
    : "text-align:justify;text-justify:inter-ideograph";
  if (Array.isArray(entry.blocks) && entry.blocks.length) {
    return entry.blocks
      .filter((block) => String(block?.text || "").trim())
      .map(
        (block) =>
          `<div class="translation-export-block" style="margin:10px 0 14px;font-family:'Microsoft YaHei';mso-fareast-font-family:'Microsoft YaHei'">` +
          `<div class="translation-export-label" style="margin:0 0 4px;font-family:'Microsoft YaHei';mso-ascii-font-family:'Microsoft YaHei';mso-fareast-font-family:'Microsoft YaHei';mso-hansi-font-family:'Microsoft YaHei';font-size:12pt;font-weight:700;text-align:left !important;text-justify:auto;color:#172B4D !important"><font face="Microsoft YaHei" color="#172B4D" style="font-family:'Microsoft YaHei';font-size:12pt;font-weight:700;color:#172B4D">【${escapeHtml(
            block.label
          )}】</font></div>` +
          `<div class="translation-export-text" style="font-family:'Microsoft YaHei';mso-fareast-font-family:'Microsoft YaHei';${blockTextAlignment};color:#172B4D">${textExportRichHtml(
            block.richText,
            block.text,
            options
          )}</div></div>`
      )
      .join("");
  }
  if (Array.isArray(entry.richText) && entry.richText.length) {
    return textExportRichHtml(entry.richText, entry.text, options);
  }
  const text = escapeHtml(entry.text).replace(/\n/g, "<br>");
  return options.wordCompatible
    ? `<span class="plain-export-text" style="font-family:'Microsoft YaHei';mso-ascii-font-family:'Microsoft YaHei';mso-fareast-font-family:'Microsoft YaHei';mso-hansi-font-family:'Microsoft YaHei';font-size:${TEXT_FONT_DEFAULT}pt;font-weight:400;color:#172B4D !important;mso-style-textfill-fill-color:#172B4D;mso-style-textfill-fill-alpha:100000"><font face="Microsoft YaHei" color="#172B4D" style="font-family:'Microsoft YaHei';font-size:${TEXT_FONT_DEFAULT}pt;font-weight:400;color:#172B4D">${text}</font></span>`
    : text;
}

function textExportAiMaterialNames(materials) {
  return (materials || [])
    .map((material) => currentAiMaterialName(material))
    .filter(Boolean);
}

function textExportAiEntries(file) {
  const entries = [];
  (appState.aiSuggestionRecords || [])
    .filter((record) =>
      (record.materials || []).some(
        (material) => material.recordId === file.id
      )
    )
    .forEach((record) => {
      const materialNames = textExportAiMaterialNames(record.materials);
      const suggestions = (record.suggestions || [])
        .map((suggestion, index) => {
          const basis = (suggestion.basis || [])
            .map((item) => {
              const materialName = currentAiMaterialName({
                recordId: item.recordId,
                name: item.materialLabel,
              });
              const location = [
                materialName,
                item.page ? `第 ${item.page} 页` : "",
                item.annotationId ? `框选 ${item.annotationId}` : "",
              ]
                .filter(Boolean)
                .join(" · ");
              return item.excerpt
                ? `${location}\n${item.excerpt}`
                : location;
            })
            .filter(Boolean)
            .join("\n");
          return [
            `${index + 1}. ${suggestion.typeLabel || "研究建议"}｜${
              suggestion.title || "未命名建议"
            }`,
            suggestion.content || "",
            basis ? `依据：\n${basis}` : "",
          ]
            .filter(Boolean)
            .join("\n");
        })
        .filter(Boolean)
        .join("\n\n");
      entries.push({
        title: `AI建议 · ${formatTime(record.createdAt)} · ${
          record.providerName || record.provider || "AI"
        }`,
        text: [
          `所用材料：${materialNames.join("；") || "未记录"}`,
          suggestions || record.rawText || "未记录建议正文",
        ].join("\n\n"),
      });
    });

  const messages = appState.aiChatMessages || [];
  messages.forEach((message, index) => {
    if (message.role !== "user") return;
    const materials = message.contextMaterials || [];
    if (!materials.some((material) => material.recordId === file.id)) return;
    const answer = messages
      .slice(index + 1)
      .find((candidate) => candidate.role === "assistant");
    entries.push({
      title: `自由问答 · ${formatTime(message.createdAt)}`,
      text: [
        `所用材料：${
          textExportAiMaterialNames(materials).join("；") || "未记录"
        }`,
        `问题：\n${message.text || ""}`,
        `回答：\n${answer?.text || "未记录回答"}`,
      ].join("\n\n"),
    });
  });
  return entries;
}

function textExportCleanTitle(file) {
  const stripPrefix = (value) => {
    let next = String(value || "").trim();
    let previous = "";
    while (next && next !== previous) {
      previous = next;
      next = next
        .replace(/^【[^】]*《[^》]+》[^】]*】\s*/u, "")
        .replace(/^【(?:\d{4}|未知|不详)-(?:\d{1,2}|未知|不详)-(?:\d{1,2}|未知|不详)[^】]*】\s*/u, "")
        .trim();
    }
    return next;
  };
  const savedTitle = stripPrefix(file.title);
  if (savedTitle) return savedTitle;
  const filenameTitle = stripPrefix(
    String(file.name || "").replace(/\.(pdf|png|jpe?g|tiff?|bmp|webp)$/iu, "")
  );
  return filenameTitle || file.name || "未命名材料";
}

function textExportMetadata(file) {
  const common = [
    ["资料类型", kindLabel(file.kind)],
    ["所属项目", file.project],
  ];
  const tags = ["标签", (file.tags || []).join("、")];
  if (file.kind === "paper") {
    const paperSpecific =
      file.paperType === "thesis"
        ? [
            ["学位类型", file.degree],
            ["机构", file.institution],
          ]
        : [
            ["期刊", file.journal || file.paper],
            ["期号", file.issueNumber],
          ];
    return [
      ...common,
      ["论文类型", paperTypeLabel(file.paperType)],
      ["作者", file.author],
      ["日期", file.date],
      ...paperSpecific,
      ["引文信息", file.citation],
      tags,
    ].filter((entry) => entry[1]);
  }
  if (file.kind === "book") {
    return [
      ...common,
      ["作者", file.author],
      ["著作名", file.title],
      ["出版地名", file.bookPlace],
      ["出版社名", file.bookPublisher],
      ["日期", file.date],
      tags,
    ].filter((entry) => entry[1]);
  }
  return [
    ...common,
    ["日期", file.date],
    ["来源／报刊", file.paper],
    ["版次", file.edition],
    ["作者", file.author],
    tags,
  ].filter((entry) => entry[1]);
}

function textExportMaterialModel(file, scopes) {
  const sections = [];
  const displayTitle = textExportCleanTitle(file);
  if (scopes.has("metadata")) {
    const metadata = textExportMetadata(file);
    if (metadata.length) {
      sections.push({
        key: "metadata",
        title: "书目信息",
        metadata,
        entries: [],
      });
    }
  }
  const ocrEntries = textExportOcrEntries(file);
  const ocrLabel = (entry, index) => {
    const scope =
      entry.mode === "full-page" || entry.legacyFullPage
        ? "整页"
        : `框选 ${index + 1}`;
    return `第 ${entry.page || 1} 页 · ${scope}${
      entry.annotationId ? ` · 批注 ${entry.annotationId}` : ""
    }`;
  };
  if (scopes.has("ocrRaw")) {
    const entries = ocrEntries
      .map((entry, index) => ({
        title: ocrLabel(entry, index),
        text: String(entry.rawText || "").trim(),
      }))
      .filter((entry) => entry.text);
    if (entries.length) {
      sections.push({ key: "ocrRaw", title: "对照文本", entries });
    }
  }
  if (scopes.has("ai")) {
    const entries = textExportAiEntries(file);
    if (entries.length) sections.push({ key: "ai", title: "AI应答", entries });
  }
  if (scopes.has("annotations")) {
    const entries = (file.annotations || []).map((annotation, index) => {
      const content = textExportAnnotationContent(file, annotation);
      const contentBlocks = content.blocks?.length
        ? content.blocks.map((block) => ({
            ...block,
            label: `框选内容 · ${block.label}`,
          }))
        : [
            {
              label: "框选内容",
              text: content.text || "尚无已保存的框选内容",
              richText: content.text ? content.richText : [],
            },
          ];
      const recordText =
        String(annotation.text || "").trim() || "尚未填写框选记录";
      const blocks = [
        ...contentBlocks,
        {
          label: "框选记录",
          text: recordText,
          richText: normalizedRichTextSegments(
            annotation.recordRichText,
            recordText
          ),
        },
      ];
      return {
        title: `框选 ${index + 1} · 第 ${annotation.page || 1} 页`,
        text: blocks
          .map((block) => `【${block.label}】\n${block.text}`)
          .join("\n\n"),
        richText: [],
        blocks,
      };
    });
    if (entries.length) {
      sections.push({ key: "annotations", title: "框选批注", entries });
    }
  }
  if (scopes.has("translations")) {
    const entries = (file.translations || [])
      .map((translation, index) => {
        const sourceText = String(translation.sourceText || "").trim();
        const translatedText = String(
          translation.translatedText || ""
        ).trim();
        return {
          title:
            `第 ${translation.page || 1} 页 · 译文 ${index + 1}` +
            `${translation.engineLabel || translation.engine ? ` · ${
              translationEngineLabel(translation.engine) || translation.engineLabel
            }` : ""}`,
          text: [
            sourceText ? `【翻译前文本】\n${sourceText}` : "",
            translatedText ? `【翻译后文本】\n${translatedText}` : "",
          ]
            .filter(Boolean)
            .join("\n\n"),
          blocks: [
            {
              label: "翻译前文本",
              text: sourceText,
              richText: normalizedRichTextSegments(
                translation.sourceRichText,
                sourceText
              ),
            },
            {
              label: "翻译后文本",
              text: translatedText,
              richText: normalizedRichTextSegments(
                translation.translatedRichText,
                translatedText
              ),
            },
          ].filter((block) => block.text),
        };
      })
      .filter((entry) => entry.text);
    if (entries.length) {
      sections.push({ key: "translations", title: "原文翻译", entries });
    }
  }
  if (scopes.has("notes")) {
    const entries = (file.researchNotes || [])
      .map((note, index) => {
        const noteText = String(note.text || "").trim();
        const references = (note.references || [])
          .map((reference) =>
            reference.excerpt
              ? `引用位置：第 ${reference.page || 1} 页\n${reference.excerpt}`
              : ""
          )
          .filter(Boolean)
          .join("\n\n");
        const richText =
          Array.isArray(note.richText) && note.richText.length
            ? [
                ...note.richText,
                ...(references
                  ? [
                      {
                        text: `\n\n${references}`,
                        color: "black",
                        size: 14,
                        bold: false,
                      },
                    ]
                  : []),
              ]
            : [];
        return {
          title: `研究笔记 ${index + 1}${
            note.createdAt ? ` · ${formatTime(note.createdAt)}` : ""
          }`,
          text: [noteText, references].filter(Boolean).join("\n\n"),
          richText,
        };
      })
      .filter((entry) => entry.text);
    if (entries.length) {
      sections.push({ key: "notes", title: "记录笔记", entries });
    }
  }
  return {
    title: displayTitle,
    sections,
  };
}

function buildMarkdownTextExport(materials) {
  const headingColor = "#243B53";
  const textColor = "#172B4D";
  const secondaryColor = "#334E68";
  const lines = [
    `<h1 style="color:${headingColor}">纸上寻踪文本导出</h1>`,
    "",
    `<ul style="color:${textColor}">`,
    `<li><strong style="color:${headingColor}">导出时间</strong>：<span style="color:${textColor}">${escapeHtml(
      new Date().toLocaleString("zh-CN")
    )}</span></li>`,
    `<li><strong style="color:${headingColor}">材料数量</strong>：<span style="color:${textColor}">${materials.length}</span></li>`,
    "</ul>",
    "",
  ];
  materials.forEach((material, materialIndex) => {
    lines.push(
      "---",
      "",
      `<h2 style="color:${headingColor}">${materialIndex + 1}. ${escapeHtml(
        material.title
      )}</h2>`,
      ""
    );
    if (!material.sections.length) {
      lines.push(
        `<p style="color:${secondaryColor}">当前材料没有符合所选范围的已保存文字。</p>`,
        ""
      );
      return;
    }
    material.sections.forEach((section) => {
      const style = textExportScopeStyle(section.key);
      lines.push(
        `<h3 style="color:${style.accent}"><span style="display:inline-block;color:${style.accent};background-color:${style.headingBackground};border-left:4px solid ${style.accent};padding:4px 10px;">${escapeHtml(
          section.title
        )}</span></h3>`,
        ""
      );
      if (section.metadata?.length) {
        lines.push(
          `<ul style="color:${textColor};text-align:left !important">`
        );
        (section.metadata || []).forEach(([label, value]) => {
          lines.push(
            `<li style="text-align:left !important"><strong style="color:${headingColor}">${escapeHtml(
              label
            )}</strong>：<span style="color:${textColor}">${escapeHtml(
              value
            )}</span></li>`
          );
        });
        lines.push("</ul>", "");
      }
      (section.entries || []).forEach((entry) => {
        lines.push(
          `<div class="text-export-entry-title" style="margin:18px 0 6px;font-family:'Microsoft YaHei';font-size:14px;font-weight:700;color:${
            style.accent
          } !important;text-align:left !important"><font face="Microsoft YaHei" color="${
            style.accent
          }" style="font-family:'Microsoft YaHei';font-size:14px;font-weight:700;color:${
            style.accent
          }">${escapeHtml(entry.title)}</font></div>`,
          "",
          (Array.isArray(entry.blocks) && entry.blocks.length) ||
            (Array.isArray(entry.richText) && entry.richText.length)
            ? `<div class="historical-workbench-rich-text" style="color:${textColor};text-align:left !important">${textExportEntryHtml(
                entry,
                { leftAligned: true }
              )}</div>`
            : `<div style="color:${textColor};white-space:pre-wrap;text-align:left !important">${escapeHtml(
                entry.text
              )}</div>`,
          ""
        );
      });
    });
  });
  return lines.join("\n").trim();
}

function buildPlainTextExport(materials) {
  const lines = [
    "纸上寻踪文本导出",
    `导出时间：${new Date().toLocaleString("zh-CN")}`,
    `材料数量：${materials.length}`,
    "",
  ];
  materials.forEach((material, materialIndex) => {
    lines.push(
      "=".repeat(60),
      `${materialIndex + 1}. ${material.title}`,
      ""
    );
    if (!material.sections.length) {
      lines.push("当前材料没有符合所选范围的已保存文字。", "");
      return;
    }
    material.sections.forEach((section) => {
      lines.push(`【${section.title}】`);
      (section.metadata || []).forEach(([label, value]) => {
        lines.push(`${label}：${value}`);
      });
      (section.entries || []).forEach((entry) => {
        lines.push("", `〔${entry.title}〕`, entry.text);
      });
      lines.push("");
    });
  });
  return lines.join("\n").trim();
}

function buildWordTextExport(materials) {
  const body = materials
    .map((material, materialIndex) => {
      const sections = material.sections.length
        ? material.sections
            .map((section) => {
              const style = textExportScopeStyle(section.key);
              return `
                <div class="scope-card scope-${escapeHtml(
                  section.key
                )}" style="margin:22px 0;padding:0 16px 14px;border:1px solid ${
                  style.border
                };border-left:5px solid ${style.accent};background-color:${
                  style.background
                }">
                  <table class="scope-heading" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${
                    style.headingBackground
                  }" style="width:100%;border-collapse:collapse;background-color:${
                    style.headingBackground
                  };border-bottom:1px solid ${style.border}"><tr><td bgcolor="${
                    style.headingBackground
                  }" style="padding:8px 10px;background-color:${
                    style.headingBackground
                  };border-left:5px solid ${style.accent}">
                    <h2 class="scope-title" style="margin:0;font-family:'SimSun';mso-ascii-font-family:'SimSun';mso-fareast-font-family:'SimSun';mso-hansi-font-family:'SimSun';font-size:12pt;mso-ansi-font-size:12pt;mso-bidi-font-size:12pt;font-weight:700;text-align:justify;text-justify:inter-ideograph;color:${
                      style.accent
                    } !important"><font face="SimSun" color="${
                      style.accent
                    }" style="font-family:'SimSun';font-size:12pt;font-weight:700;color:${
                      style.accent
                    }">${escapeHtml(section.title)}</font></h2>
                  </td></tr></table>
                  ${
                    section.metadata?.length
                      ? `<table class="metadata-table" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;margin:10px 0;border:1px solid ${
                          style.border
                        }">${section.metadata
                          .map(
                            ([label, value]) =>
                              `<tr><th width="28%" bgcolor="${
                                style.headingBackground
                              }" style="width:28%;padding:6px 9px;border-bottom:1px solid ${
                                style.border
                              };background-color:${
                                style.headingBackground
                              };font-family:'Microsoft YaHei';mso-fareast-font-family:'Microsoft YaHei';font-size:12pt;font-weight:700;text-align:justify;text-justify:inter-ideograph;color:${
                                style.accent
                              }"><font face="Microsoft YaHei" color="${
                                style.accent
                              }" style="font-family:'Microsoft YaHei';font-size:12pt;font-weight:700;color:${
                                style.accent
                              }">${escapeHtml(
                                label
                              )}</font></th><td style="padding:6px 9px;border-bottom:1px solid ${
                                style.border
                              };font-family:'Microsoft YaHei';mso-fareast-font-family:'Microsoft YaHei';font-size:12pt;font-weight:400;text-align:justify;text-justify:inter-ideograph;color:#172B4D"><font face="Microsoft YaHei" color="#172B4D" style="font-family:'Microsoft YaHei';font-size:12pt;font-weight:400;color:#172B4D">${escapeHtml(
                                value
                              )}</font></td></tr>`
                          )
                          .join("")}</table>`
                      : ""
                  }
                  ${(section.entries || [])
                    .map(
                      (entry) =>
                        `<h3 class="entry-title" style="margin:18px 0 6px;font-family:'Microsoft YaHei';mso-ascii-font-family:'Microsoft YaHei';mso-fareast-font-family:'Microsoft YaHei';mso-hansi-font-family:'Microsoft YaHei';font-size:12pt;mso-ansi-font-size:12pt;mso-bidi-font-size:12pt;font-weight:700;text-align:justify;text-justify:inter-ideograph;color:${
                          style.accent
                        } !important"><font face="Microsoft YaHei" color="${
                          style.accent
                        }" style="font-family:'Microsoft YaHei';font-size:12pt;font-weight:700;color:${
                          style.accent
                        }">${escapeHtml(
                          entry.title
                        )}</font></h3><div class="rich-export-text" style="font-family:'Microsoft YaHei';mso-fareast-font-family:'Microsoft YaHei';text-align:justify;text-justify:inter-ideograph;color:#172B4D">${textExportEntryHtml(
                          entry,
                          { wordCompatible: true }
                        )}</div>`
                    )
                    .join("")}
                </div>`;
            })
            .join("")
        : '<p class="rich-export-text" style="font-family:\'Microsoft YaHei\';font-size:12pt;text-align:justify;text-justify:inter-ideograph"><font face="Microsoft YaHei" color="#172B4D">当前材料没有符合所选范围的已保存文字。</font></p>';
      return `
        <article>
          <h1 class="material-title" style="font-family:'SimSun';mso-ascii-font-family:'SimSun';mso-fareast-font-family:'SimSun';mso-hansi-font-family:'SimSun';font-size:12pt;mso-ansi-font-size:12pt;mso-bidi-font-size:12pt;font-weight:700;text-align:justify;text-justify:inter-ideograph;color:#172B4D !important"><font face="SimSun" color="#172B4D" style="font-family:'SimSun';font-size:12pt;font-weight:700;color:#172B4D">${
            materialIndex + 1
          }. ${escapeHtml(material.title)}</font></h1>
          ${sections}
        </article>`;
    })
    .join("");
  return `<!doctype html>
<html><head><meta charset="UTF-8"><title>史料文本导出</title>
<style>
body{font-family:"Microsoft YaHei","SimSun",sans-serif;font-size:12pt;color:#172B4D !important;
  line-height:1.75;margin:32px} article{page-break-after:always}
body,article,p,li,td,th{color:#172B4D}
.document-title{font-family:"SimSun";font-size:16pt;font-weight:700;color:#172B4D !important;
  border-bottom:2px solid #146b70;padding-bottom:8px}
.material-title{font-family:"SimSun";font-size:12pt;font-weight:700;text-align:justify;
  text-justify:inter-ideograph;color:#172B4D !important;border-bottom:2px solid #146b70;padding-bottom:8px}
.scope-title{font-family:"SimSun";font-size:12pt;font-weight:700;text-align:justify;
  text-justify:inter-ideograph}
.entry-title{font-family:"Microsoft YaHei";font-size:12pt;font-weight:700;text-align:justify;
  text-justify:inter-ideograph}
p,td,th{font-family:"Microsoft YaHei";text-align:justify;text-justify:inter-ideograph}
p{white-space:normal}
.rich-export-text span,.rich-export-text font{text-decoration:none}
.rich-export-text{font-family:"Microsoft YaHei";text-align:justify;text-justify:inter-ideograph}
.translation-export-label{font-family:"Microsoft YaHei";font-size:12pt;font-weight:700;
  text-align:left !important;text-justify:auto;color:#172B4D !important}
.translation-export-text{font-family:"Microsoft YaHei";text-align:justify;
  text-justify:inter-ideograph;color:#172B4D}
.plain-export-text,.plain-export-text font{color:#172B4D !important;
  mso-style-textfill-fill-color:#172B4D;mso-style-textfill-fill-alpha:100000}
.scope-card{margin:22px 0;padding:0 16px 14px;border:1px solid;
  border-left-width:5px}
.scope-metadata{border-color:#6fb8b5;background:#f2fbfa}.scope-metadata .scope-title{color:#0f6f70}
.scope-ocrRaw{border-color:#7dafd0;background:#f3f8fc}.scope-ocrRaw .scope-title{color:#245f8f}
.scope-ai{border-color:#a79bc6;background:#f6f4fa}.scope-ai .scope-title{color:#5b4b8a}
.scope-annotations{border-color:#83b89f;background:#f3faf6}.scope-annotations .scope-title{color:#2e765b}
.scope-translations{border-color:#76b9bd;background:#f2fafa}.scope-translations .scope-title{color:#0f7880}
.scope-notes{border-color:#c9a774;background:#fcf8f1}.scope-notes .scope-title{color:#8a5a1f}
</style></head><body>
<header><h1 class="document-title" style="font-family:'SimSun';mso-fareast-font-family:'SimSun';font-size:16pt;font-weight:700;color:#172B4D !important"><font face="SimSun" color="#172B4D" style="font-family:'SimSun';font-size:16pt;font-weight:700;color:#172B4D">纸上寻踪文本导出</font></h1>
<p><font color="#334E68">导出时间：${escapeHtml(
    new Date().toLocaleString("zh-CN")
  )}</font></p>
<p><font color="#334E68">材料数量：${materials.length}</font></p></header>${body}</body></html>`;
}

function safeTextExportFilename(value, extension) {
  const base = String(value || "")
    .trim()
    .replace(/\.(md|doc|txt)$/iu, "")
    .replace(/[<>:"/\\|?*\u0000-\u001F]/gu, "_")
    .replace(/[. ]+$/u, "")
    .slice(0, 120);
  return `${base || "史料文本导出"}.${extension}`;
}

async function downloadTextExport() {
  if (appState.busy) return;
  const scopes = selectedTextExportScopes();
  const files = appState.allFiles.filter((file) =>
    appState.textExportSelectedIds.has(file.id)
  );
  if (!files.length || !scopes.size) {
    showToast("请至少选择一份材料和一种文本信息", "error");
    return;
  }
  const materials = files.map((file) =>
    textExportMaterialModel(file, scopes)
  );
  const format = ["md", "doc", "txt"].includes(elements.textExportFormat.value)
    ? elements.textExportFormat.value
    : "md";
  const content =
    format === "doc"
      ? buildWordTextExport(materials)
      : format === "txt"
        ? buildPlainTextExport(materials)
        : buildMarkdownTextExport(materials);
  const mime =
    format === "doc"
      ? "application/msword;charset=utf-8"
      : format === "md"
        ? "text/markdown;charset=utf-8"
        : "text/plain;charset=utf-8";
  const blob = new Blob(["\uFEFF", content], { type: mime });
  const exportFilename = safeTextExportFilename(
    elements.textExportFilename.value,
    format
  );
  const directoryHandle = appState.textExportDirectoryHandle;
  if (directoryHandle) {
    try {
      if (typeof directoryHandle.requestPermission === "function") {
        const permission = await directoryHandle.requestPermission({
          mode: "readwrite",
        });
        if (permission !== "granted") {
          throw new Error("所选文件夹的写入权限已经失效");
        }
      }
      const fileHandle = await directoryHandle.getFileHandle(exportFilename, {
        create: true,
      });
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
    } catch (error) {
      showToast(`导出文件未能写入所选文件夹：${error.message}`, "error");
      setStatus("文本导出未完成；可以重新选择文件夹或使用默认下载位置");
      return;
    }
  } else {
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = exportFilename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
  }
  showToast(`已生成 ${format.toUpperCase()} 文本导出文件`);
  setStatus(
    `已导出 ${materials.length} 份材料的已保存文字至${
      directoryHandle
        ? `文件夹“${directoryHandle.name}”`
        : "浏览器默认下载位置"
    }；原件和资料库未被修改`
  );
}

function reviewStatusText(status) {
  if (status === "ready") return "自动识别成功";
  if (status === "needs-review") return "需要检查";
  if (status === "confirmed") return "已经确认";
  return "无法识别";
}

function renderImportReviewSummary() {
  const summary = appState.importReview;
  elements.importReadyCount.textContent = summary.ready || 0;
  elements.importNeedsCount.textContent = summary.needsReview || 0;
  elements.importUnparsedCount.textContent = summary.unparsed || 0;
  elements.importConfirmedCount.textContent = summary.confirmed || 0;
  elements.importReviewBadge.textContent = summary.pending || 0;
  elements.importReviewBadge.classList.toggle("hidden", !summary.pending);
  elements.confirmReadyButton.disabled = !summary.ready || appState.busy;
}

function renderImportReviewList() {
  const pending = appState.allFiles.filter(
    (file) =>
      file.kind === "source" && file.importReview?.status !== "confirmed"
  );
  if (!pending.length) {
    elements.importReviewList.innerHTML =
      '<div class="import-review-empty">全部史料的文件名解析结果都已经确认。</div>';
    return;
  }
  elements.importReviewList.innerHTML = pending
    .map((file) => {
      const review = file.importReview || {};
      const suggestion = review.suggested || {};
      const reviewValue = (field) =>
        Object.prototype.hasOwnProperty.call(suggestion, field)
          ? suggestion[field]
          : file[field] || "";
      return `
        <div class="import-row" data-record-id="${escapeHtml(file.id)}"
          data-review-status="${escapeHtml(review.status || "unparsed")}">
          <div class="import-source">
            <strong title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</strong>
            <small>${escapeHtml(file.project)} · ${escapeHtml(
              review.rule || "未匹配规则"
            )}</small>
            <span class="parse-badge ${escapeHtml(
              review.status || "unparsed"
            )}">${reviewStatusText(review.status)}</span>
          </div>
          <label class="import-field">
            <span>日期</span>
            <input data-import-field="date" value="${escapeHtml(
              reviewValue("date")
            )}" placeholder="年-月-日" />
          </label>
          <label class="import-field">
            <span>报刊名</span>
            <input data-import-field="paper" value="${escapeHtml(
              reviewValue("paper")
            )}" placeholder="报刊名" />
          </label>
          <label class="import-field">
            <span>版次</span>
            <input data-import-field="edition" value="${escapeHtml(
              reviewValue("edition")
            )}" placeholder="版次" />
          </label>
          <label class="import-field">
            <span>篇名</span>
            <input data-import-field="title" value="${escapeHtml(
              reviewValue("title")
            )}" placeholder="篇名" />
          </label>
          <label class="import-field">
            <span>作者</span>
            <input data-import-field="author" value="${escapeHtml(
              reviewValue("author")
            )}" placeholder="可留空" />
          </label>
          <button class="button secondary confirm-import-row" type="button">
            保存并确认
          </button>
        </div>`;
    })
    .join("");

  elements.importReviewList
    .querySelectorAll(".confirm-import-row")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const row = button.closest(".import-row");
        confirmImportItems([importItemFromRow(row)]);
      });
    });
}

function importItemFromRow(row) {
  const value = (field) =>
    row.querySelector(`[data-import-field="${field}"]`).value;
  return {
    id: row.dataset.recordId,
    date: value("date"),
    paper: value("paper"),
    edition: value("edition"),
    title: value("title"),
    author: value("author"),
  };
}

function openImportReview() {
  renderImportReviewSummary();
  renderImportReviewList();
  elements.importReviewModal.classList.remove("hidden");
}

function closeImportReview() {
  elements.importReviewModal.classList.add("hidden");
}

async function confirmImportItems(items) {
  if (appState.busy || !items.length) return;
  setBusy(true);
  setStatus("正在确认文件名解析结果…");
  try {
    const data = await request("/api/import-review", {
      method: "POST",
      body: JSON.stringify({ items }),
    });
    applyServerState(data, appState.selectedId, appState.selectedIndex);
    renderImportReviewList();
    showToast(
      `已确认 ${data.confirmedCount} 份史料，并改名 ${data.renamedCount || 0} 份原文件`
    );
    setStatus("书目信息与原文件名已同步保存");
  } catch (error) {
    showToast(error.message, "error");
    setStatus("解析结果尚未保存");
  } finally {
    setBusy(false);
    renderImportReviewSummary();
  }
}

async function reparseFilenames() {
  if (appState.busy) return;
  setBusy(true);
  setStatus("正在重新读取尚未确认的文件名…");
  try {
    const data = await request("/api/reparse-filenames", {
      method: "POST",
      body: "{}",
    });
    applyServerState(data, appState.selectedId, appState.selectedIndex);
    showToast(`已重新读取 ${data.reparsedCount} 份史料`);
    setStatus("重新读取完成；已经确认的记录没有被改动");
  } catch (error) {
    showToast(error.message, "error");
    setStatus("重新读取未完成");
  } finally {
    setBusy(false);
    renderImportReviewSummary();
    renderImportReviewList();
  }
}

function applyServerState(data, preferredId, preferredIndex = null) {
  const previousId =
    preferredId === undefined ? appState.selectedId : preferredId;
  const previousLibraryId = appState.libraryId;
  appState.allFiles = data.files || [];
  appState.projects = data.projects || [];
  appState.hasLibrary = Boolean(data.hasLibrary);
  appState.library = data.library || "";
  appState.libraryId = data.libraryId || "";
  appState.isTestLibrary = Boolean(data.isTestLibrary);
  appState.isFormalLibrary = Boolean(data.isFormalLibrary);
  appState.isWritableLibrary = Boolean(data.isWritableLibrary);
  elements.chooseFolderButton.classList.remove("hidden");
  appState.screenshotFolder =
    data.screenshotFolder || ".historical-workbench\\screenshots";
  appState.recentDates = data.recentDates || [];
  appState.recentPapers = data.recentPapers || [];
  appState.favoriteWebsiteCategories = data.favoriteWebsiteCategories || [];
  appState.favoriteWebsites = data.favoriteWebsites || [];
  appState.operations = data.operations || [];
  appState.importReview = data.importReview || appState.importReview;
  appState.aiSuggestionRecords =
    data.aiSuggestions || appState.aiSuggestionRecords;
  appState.aiChatMessages =
    data.aiChatMessages || appState.aiChatMessages;
  appState.aiSuggestionSelectedIds = new Set(
    [...appState.aiSuggestionSelectedIds].filter((id) =>
      appState.allFiles.some((file) => file.id === id)
    )
  );
  appState.textExportSelectedIds = new Set(
    [...appState.textExportSelectedIds].filter((id) =>
      appState.allFiles.some((file) => file.id === id)
    )
  );
  appState.batchSelectedFileIds = new Set(
    [...appState.batchSelectedFileIds].filter((id) =>
      appState.allFiles.some((file) => file.id === id)
    )
  );

  elements.screenshotFolderPath.value = appState.screenshotFolder;
  elements.screenshotFolderPath.title = data.screenshotFolderAbsolute
    ? `实际位置：${data.screenshotFolderAbsolute}`
    : "截图目录始终限制在当前资料库内部";
  elements.folderWarning.classList.toggle(
    "hidden",
    !appState.hasLibrary || appState.isWritableLibrary
  );
  elements.newProjectButton.disabled = !appState.isWritableLibrary;
  elements.folderImportButton.disabled = false;
  elements.exportNavButton.disabled = !appState.allFiles.length;
  elements.undoButton.disabled = !data.canUndo;
  if (previousLibraryId !== appState.libraryId) {
    loadSortMode();
    resetFolderImportScan();
    closeFolderImport();
  }

  renderProjectList();
  renderPaperMenu();
  renderRecentChips();
  renderOperations();
  if (!elements.historyModal.classList.contains("hidden")) {
    renderHistoryRecords();
  }
  if (!elements.favoriteWebsitesModal.classList.contains("hidden")) {
    renderFavoriteWebsites();
  }
  renderImportReviewSummary();
  renderKindNavigation();
  renderRecordedOptions();
  if (!elements.importReviewModal.classList.contains("hidden")) {
    renderImportReviewList();
  }
  if (!elements.folderImportModal.classList.contains("hidden")) {
    renderFolderImportProjectOptions();
    renderFolderImportList();
  }
  if (!elements.textExportModal.classList.contains("hidden")) {
    textExportProjectOptions();
    renderTextExportMaterials();
  }
  if (!elements.timelineModal.classList.contains("hidden")) {
    renderTimelineProjectOptions();
    renderTimeline();
  }
  if (!elements.aiSuggestionModal.classList.contains("hidden")) {
    renderAiSuggestionWorkspace();
  }
  refreshFilteredFiles(previousId, preferredIndex);
  renderTranslationRecords();
}

function searchableText(file) {
  return [
    file.name,
    file.originalName,
    file.title,
    file.paper,
    file.edition,
    file.author,
    file.journal,
    file.degree,
    file.institution,
    file.bookPlace,
    file.bookPublisher,
    file.citation,
    kindLabel(file.kind),
    file.kind === "source"
      ? file.sourceLanguage === "foreign"
        ? "外文史料"
        : "中文史料"
      : "",
    file.kind === "paper" ? paperTypeLabel(file.paperType) : "",
    file.project,
    file.status === "organized" ? "已整理" : "未阅读",
    ...(file.tags || []),
    ...(file.annotations || []).map((item) => item.text || ""),
    ...(file.ocrPages || []).flatMap((item) => [
      item.rawText || "",
      item.correctedText || "",
    ]),
    ...(file.ocrRegions || []).flatMap((item) => [
      item.rawText || "",
      item.correctedText || "",
    ]),
    ...(file.researchNotes || []).map((item) => item.text || ""),
    ...(file.researchNotes || []).flatMap((item) =>
      (item.references || []).map((reference) => reference.excerpt || "")
    ),
  ]
    .join(" ")
    .toLocaleLowerCase();
}

function normalizedLibrarySearchKinds() {
  return ["source", "paper", "book"].filter((kind) =>
    appState.searchKinds.includes(kind)
  );
}

function renderLibrarySearchScope() {
  const selectedKinds = normalizedLibrarySearchKinds();
  elements.searchKindInputs.forEach((input) => {
    input.checked = selectedKinds.includes(input.dataset.searchKind);
  });
  elements.searchScopeButton.classList.toggle(
    "custom-scope",
    selectedKinds.length !== 3
  );
  elements.searchScopeButton.title = selectedKinds.length
    ? `当前搜索：${selectedKinds.map((kind) => kindLabel(kind)).join("、")}`
    : "当前未选择搜索列表";
}

function refreshFilteredFiles(preferredId = "", preferredIndex = null) {
  const query = appState.searchQuery.trim().toLocaleLowerCase();
  const selectedKinds = normalizedLibrarySearchKinds();
  appState.files = appState.allFiles.filter((file) => {
    const inProject =
      appState.activeProject === "all" ||
      file.project === appState.activeProject;
    const inKind = query
      ? selectedKinds.includes(file.kind)
      : file.kind === appState.activeKind;
    const matchesQuery = !query || searchableText(file).includes(query);
    return inProject && inKind && matchesQuery;
  });
  appState.files = sortFiles(appState.files);
  const visibleFileIds = new Set(appState.files.map((file) => file.id));
  appState.batchSelectedFileIds = new Set(
    [...appState.batchSelectedFileIds].filter((id) => visibleFileIds.has(id))
  );
  if (
    appState.batchSelectionAnchorIndex < 0 ||
    appState.batchSelectionAnchorIndex >= appState.files.length
  ) {
    appState.batchSelectionAnchorIndex = -1;
  }

  const scopeTotal = query
    ? appState.allFiles.filter((file) => selectedKinds.includes(file.kind)).length
    : appState.allFiles.filter((file) => file.kind === appState.activeKind).length;
  elements.fileCount.textContent = WorkbenchUiRules.optionalCount(
    appState.files.length,
    (count) =>
      count === scopeTotal ? `${count} 份` : `${count} / ${scopeTotal} 份`
  );
  elements.fileCount.classList.toggle("hidden", appState.files.length === 0);

  const scopeName =
    appState.activeProject === "all"
      ? `${kindLabel(appState.activeKind)}列表`
      : `项目：${appState.activeProject} · ${kindLabel(appState.activeKind)}列表`;
  const acrossText = query
    ? ` · 搜索${
        selectedKinds.length
          ? selectedKinds.map((kind) => kindLabel(kind)).join("、")
          : "范围为空"
      }`
    : "";
  elements.scopeSummary.textContent = query
    ? `${scopeName}${acrossText} · 找到 ${appState.files.length} 份匹配资料`
    : appState.files.length
      ? scopeName
      : `${scopeName} · 当前没有资料`;

  renderKindNavigation();
  renderProjectList();
  renderLibrarySearchScope();
  let nextIndex = appState.files.findIndex((file) => file.id === preferredId);
  if (nextIndex < 0 && Number.isInteger(preferredIndex)) {
    nextIndex = Math.min(preferredIndex, appState.files.length - 1);
  }
  if (nextIndex < 0 && appState.files.length) nextIndex = 0;
  selectFile(nextIndex, { preserveSticky: true });
}

function clearBatchFileSelection(render = true) {
  appState.batchSelectedFileIds.clear();
  appState.batchSelectionAnchorIndex = -1;
  if (render) renderFileList();
}

function finishBatchFileSelection(index) {
  renderFileList();
  const count = appState.batchSelectedFileIds.size;
  setStatus(
    count
      ? `已选择 ${count} 份材料；继续按 Ctrl 或 Shift 选择，按 Delete 永久删除`
      : "已取消材料多选"
  );
  window.requestAnimationFrame(() => {
    elements.fileList
      .querySelector(`.file-item[data-index="${index}"]`)
      ?.focus({ preventScroll: true });
  });
}

function toggleBatchFileSelection(index) {
  const file = appState.files[index];
  if (!file) return;
  if (appState.batchSelectedFileIds.has(file.id)) {
    appState.batchSelectedFileIds.delete(file.id);
  } else {
    appState.batchSelectedFileIds.add(file.id);
  }
  appState.batchSelectionAnchorIndex = index;
  finishBatchFileSelection(index);
}

function selectBatchFileRange(index, additive = false) {
  if (!appState.files[index]) return;
  const anchor =
    appState.batchSelectionAnchorIndex >= 0
      ? appState.batchSelectionAnchorIndex
      : appState.selectedIndex >= 0
        ? appState.selectedIndex
        : index;
  const start = Math.min(anchor, index);
  const end = Math.max(anchor, index);
  if (!additive) appState.batchSelectedFileIds.clear();
  appState.files
    .slice(start, end + 1)
    .forEach((file) => appState.batchSelectedFileIds.add(file.id));
  appState.batchSelectionAnchorIndex = anchor;
  finishBatchFileSelection(index);
}

function renderFileList() {
  if (!appState.files.length) {
    elements.fileList.innerHTML = `
      <div class="empty-preview" style="padding: 36px 10px;">
        <strong>当前列表没有匹配资料</strong>
        <span>可以切换列表、项目，或清空搜索关键词</span>
      </div>`;
    return;
  }

  elements.fileList.innerHTML = appState.files
    .map((file, index) => {
      const tags = (file.tags || []).slice(0, 2).join(" · ");
      const sourceDetail =
        file.kind === "paper"
          ? [
              paperTypeLabel(file.paperType),
              file.paperType === "thesis" ? file.institution : file.journal,
              file.date,
            ]
          : file.kind === "book"
          ? [file.date || "专著书目"]
          : [file.date || "等待整理", file.edition];
      const secondary = [
        ...sourceDetail,
        tags,
      ]
        .filter(Boolean)
        .join(" · ");
      return `
        <button class="file-item${index === appState.selectedIndex ? " active" : ""}${
          appState.batchSelectedFileIds.has(file.id) ? " batch-selected" : ""
        }"
          data-index="${index}" role="option"
          aria-selected="${
            appState.batchSelectedFileIds.size
              ? appState.batchSelectedFileIds.has(file.id)
              : index === appState.selectedIndex
          }">
          <span class="file-copy">
            <span class="file-name" title="${escapeHtml(file.name)}">${escapeHtml(
              file.name
            )}</span>
            <span class="file-meta">
              <span class="project-pill">${escapeHtml(file.project)}</span>
              ${escapeHtml(secondary)}
            </span>
          </span>
          <span class="file-side">
            <span class="reading-badge ${
              file.status === "organized" ? "organized" : "unread"
            }">${file.status === "organized" ? "已整理" : "未阅读"}</span>
            <span class="mini-type">${escapeHtml(file.type)}</span>
          </span>
        </button>`;
    })
    .join("");

  elements.fileList.querySelectorAll(".file-item").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = Number(button.dataset.index);
      if (event.shiftKey) {
        selectBatchFileRange(index, event.ctrlKey || event.metaKey);
        return;
      }
      if (event.ctrlKey || event.metaKey) {
        toggleBatchFileSelection(index);
        return;
      }
      clearBatchFileSelection(false);
      appState.batchSelectionAnchorIndex = index;
      selectFile(index, { preserveSticky: true });
    });
    button.addEventListener("contextmenu", (event) => {
      const index = Number(button.dataset.index);
      const file = appState.files[index];
      const useBatchSelection =
        Boolean(file) &&
        appState.batchSelectedFileIds.size > 1 &&
        appState.batchSelectedFileIds.has(file.id);
      if (!useBatchSelection) {
        clearBatchFileSelection(false);
        appState.batchSelectionAnchorIndex = index;
        selectFile(index, { preserveSticky: true });
      }
      openWorkspaceContextMenu(event, {
        type: useBatchSelection ? "files" : "file",
        project: "",
      });
    });
  });
}

async function deleteProjectPermanently(projectName) {
  if (!projectName || projectName === "all" || appState.busy) return;
  if (!appState.isWritableLibrary) {
    showToast("当前资料库没有测试标记，禁止删除研究项目", "error");
    return;
  }
  if (appState.pendingOcr) {
    switchDetailsView("ocr-text");
    showToast("请先处理当前待确认的 OCR 结果", "error");
    return;
  }
  const fileCount = appState.allFiles.filter(
    (file) => file.project === projectName
  ).length;
  const confirmed = await confirmAction(
    `确定永久删除研究项目吗？\n\n${projectName}\n\n项目文件夹、其中 ${fileCount} 份材料及对应工作台记录都会被直接抹除，无法恢复。`
  );
  if (!confirmed) return;
  setBusy(true);
  setStatus(`正在永久删除项目“${projectName}”…`);
  try {
    const data = await request("/api/delete-project", {
      method: "POST",
      body: JSON.stringify({
        projectName,
        confirmName: projectName,
      }),
    });
    closeAnnotationFloatingEditorWindow();
    appState.activeProject = "all";
    applyServerState(data, "", 0);
    showToast(`已永久删除项目“${projectName}”`);
    setStatus(`已永久删除项目及其中 ${data.deletedFileCount || 0} 份材料`);
  } catch (error) {
    showToast(error.message, "error");
    setStatus("永久删除项目未完成");
  } finally {
    setBusy(false);
  }
}

async function deleteSelectedFilePermanently() {
  const file = selectedFile();
  if (!file || appState.busy) return;
  if (!appState.isWritableLibrary) {
    showToast("当前资料库没有测试标记，禁止删除原始文件", "error");
    return;
  }
  if (appState.pendingOcr) {
    switchDetailsView("ocr-text");
    showToast("请先处理当前待确认的 OCR 结果", "error");
    return;
  }
  const confirmed = await confirmAction(
    `确定永久删除这份史料吗？\n\n${file.name}\n\n原始文件及其工作台记录会被直接抹除，无法恢复。`
  );
  if (!confirmed) return;
  const previousIndex = appState.selectedIndex;
  setBusy(true);
  setStatus(`正在永久删除“${file.name}”…`);
  try {
    const data = await request("/api/delete-record", {
      method: "POST",
      body: JSON.stringify({
        recordId: file.id,
        relativePath: file.relativePath,
        confirmName: file.name,
      }),
    });
    closeAnnotationFloatingEditorWindow();
    applyServerState(data, "", previousIndex);
    showToast(`已永久删除“${file.name}”`);
    setStatus(`已永久删除原始文件及工作台记录：${file.name}`);
  } catch (error) {
    showToast(error.message, "error");
    setStatus("永久删除未完成");
  } finally {
    setBusy(false);
  }
}

async function deleteBatchSelectedFilesPermanently() {
  if (!appState.batchSelectedFileIds.size || appState.busy) return;
  if (!appState.isWritableLibrary) {
    showToast("当前资料库没有测试标记，禁止删除原始文件", "error");
    return;
  }
  if (appState.pendingOcr) {
    switchDetailsView("ocr-text");
    showToast("请先处理当前待确认的 OCR 结果", "error");
    return;
  }
  const files = appState.allFiles.filter((file) =>
    appState.batchSelectedFileIds.has(file.id)
  );
  if (!files.length) {
    clearBatchFileSelection();
    return;
  }
  const previewNames = files
    .slice(0, 8)
    .map((file) => `• ${file.name}`)
    .join("\n");
  const remaining =
    files.length > 8 ? `\n以及另外 ${files.length - 8} 份材料` : "";
  const confirmed = await confirmAction(
    `确定永久删除所选 ${files.length} 份材料吗？\n\n${previewNames}${remaining}\n\n这些原始文件及其工作台记录都会被直接抹除，无法恢复。`
  );
  if (!confirmed) return;
  const previousIndex = appState.selectedIndex;
  setBusy(true);
  setStatus(`正在永久删除所选 ${files.length} 份材料…`);
  try {
    const data = await request("/api/delete-records", {
      method: "POST",
      body: JSON.stringify({
        records: files.map((file) => ({
          recordId: file.id,
          relativePath: file.relativePath,
          confirmName: file.name,
        })),
      }),
    });
    closeAnnotationFloatingEditorWindow();
    clearBatchFileSelection(false);
    applyServerState(data, "", previousIndex);
    showToast(`已永久删除 ${data.deletedFileCount || files.length} 份材料`);
    setStatus("所选原始文件及工作台记录已永久删除");
  } catch (error) {
    showToast(error.message, "error");
    setStatus("批量永久删除未完成");
  } finally {
    setBusy(false);
  }
}

function clearSelection() {
  if (appState.pendingOcr && selectedFile()) {
    switchDetailsView("ocr-text");
    showToast("请先保留或不保留当前 OCR 结果", "error");
    setStatus("当前 OCR 结果尚未确认，资料仍保持选中");
    renderOcrWorkspace();
    return;
  }
  appState.selectedIndex = -1;
  appState.selectedId = "";
  appState.selectedRelativePath = "";
  elements.progressText.textContent = WorkbenchUiRules.progressText(
    -1,
    appState.files.length
  );
  elements.progressText.classList.add("hidden");
  elements.previousMaterialButton.disabled = true;
  elements.nextMaterialButton.disabled = true;
  elements.fileType.textContent = "—";
  elements.currentFileName.textContent = "尚未选择史料";
  elements.recordId.textContent = "—";
  elements.originalFileName.textContent = "—";
  elements.editionNumberInput.value = "";
  appState.editingEditionUnit = "版";
  elements.paperAuthorInput.value = "";
  elements.paperTitleInput.value = "";
  elements.journalInput.value = "";
  elements.issueNumberInput.value = "";
  appState.editingIssueUnit = "期";
  renderIssueUnit();
  elements.degreeSelect.value = "硕士学位论文";
  elements.institutionInput.value = "";
  elements.paperYearInput.value = "";
  elements.paperMonthInput.value = "";
  elements.paperDayInput.value = "";
  elements.bookAuthorInput.value = "";
  elements.bookTitleInput.value = "";
  elements.bookPlaceInput.value = "";
  elements.bookPublisherInput.value = "";
  elements.bookYearInput.value = "";
  elements.bookMonthInput.value = "";
  elements.bookDayInput.value = "";
  elements.emptyPreview.classList.remove("hidden");
  elements.imagePreview.classList.add("hidden");
  elements.pdfPreview.classList.add("hidden");
  elements.pdfContinuousPreview.classList.add("hidden");
  elements.pdfContinuousPreview.innerHTML = "";
  elements.pdfSelectionPreview.classList.add("hidden");
  elements.imageTools.classList.add("hidden");
  elements.zoomHint.classList.add("hidden");
  elements.pdfModeButton.classList.add("hidden");
  elements.annotationToolbar.classList.add("hidden");
  elements.annotationPageField.classList.add("hidden");
  elements.annotationPageInput.value = "1";
  elements.annotationLayer.innerHTML = "";
  elements.researchNoteCount.textContent = "";
  elements.researchNoteCount.classList.add("hidden");
  elements.notesViewCount.textContent = "";
  elements.notesViewCount.classList.add("hidden");
  elements.notesViewCount.classList.remove("three-digit");
  elements.annotationList.innerHTML =
    '<div class="notes-empty">选择一份资料后可查看框选批注。</div>';
  elements.researchNoteList.innerHTML =
    '<div class="notes-empty">选择一份资料后可查看研究笔记。</div>';
  elements.researchNoteInput.innerHTML = "";
  appState.ocrPage = 1;
  appState.selectedOcrRegionId = "";
  appState.screenshotAnnotationId = "";
  appState.pendingOcr = null;
  appState.noteReferenceDrafts = [];
  appState.ocrCorrectedDirty = false;
  appState.manualCorrectedDraft = false;
  appState.previewUrl = "";
  pdfContinuousRenderToken += 1;
  pdfContinuousObserver?.disconnect();
  pdfContinuousObserver = null;
  pdfContinuousReady = false;
  pdfContinuousPage = 1;
  pdfContinuousPageCount = 0;
  elements.previewStage.classList.remove("pdf-continuous-active");
  annotationState.highlightId = "";
  annotationState.editId = "";
  annotationState.editOriginal = null;
  annotationState.editRect = null;
  annotationState.editAction = "";
  elements.annotationEditBar.classList.add("hidden");
  setAnnotationMode(false);
  cancelAnnotationDraft();
  appState.editingStatus = "unread";
  appState.editingKind = appState.activeKind;
  appState.editingSourceLanguage = "chinese";
  appState.editingPaperType = "journal";
  renderEditionUnit();
  appState.editingTags = [];
  appState.previewKind = "";
  renderReadingStatus();
  renderKindEditor();
  renderTagChips();
  resetImageView(true);
  updateFilenamePreview();
  renderFileList();
  renderOcrWorkspace();
}

function selectFile(index, options = {}) {
  if (!Number.isInteger(index) || index < 0 || index >= appState.files.length) {
    clearSelection();
    return;
  }

  const file = appState.files[index];
  if (file.id !== appState.selectedId) {
    closeAnnotationFloatingEditorWindow();
  }
  if (
    appState.pendingOcr &&
    appState.selectedId &&
    file.id !== appState.selectedId
  ) {
    switchDetailsView("ocr-text");
    showToast("请先保留或不保留当前 OCR 结果", "error");
    setStatus("当前 OCR 结果尚未确认，暂不能切换资料");
    renderFileList();
    return;
  }
  const preservePreviewView =
    options.preserveSticky && file.id === appState.selectedId;
  const preservePdfSelectionPreview =
    preservePreviewView &&
    appState.previewKind === "pdf" &&
    !elements.pdfSelectionPreview.classList.contains("hidden");
  const preservedPreviewUrl =
    preservePreviewView &&
    file.relativePath === appState.selectedRelativePath &&
    appState.previewUrl
      ? appState.previewUrl
      : "";
  const reuseLoadedPdfPreview = Boolean(
    preservePreviewView &&
      file.ext === ".pdf" &&
      preservedPreviewUrl &&
      pdfContinuousReady &&
      elements.pdfContinuousPreview.querySelector(".pdf-continuous-page")
  );
  const preserveAnnotationPage =
    preservePreviewView
      ? annotationPage()
      : 1;
  const preserveOcrPage = preservePreviewView ? appState.ocrPage : 1;
  const preservedView = preservePreviewView
    ? {
        scale: imageView.scale,
        x: imageView.x,
        y: imageView.y,
        active: imageView.active,
      }
    : null;
  appState.selectedIndex = index;
  appState.selectedId = file.id;
  appState.selectedRelativePath = file.relativePath;
  appState.editingKind = file.kind || "source";
  appState.editingSourceLanguage =
    file.sourceLanguage === "foreign" ? "foreign" : "chinese";
  appState.editingPaperType =
    file.paperType === "thesis" ? "thesis" : "journal";

  elements.progressText.textContent = WorkbenchUiRules.progressText(
    index,
    appState.files.length
  );
  elements.progressText.classList.toggle(
    "hidden",
    !elements.progressText.textContent
  );
  const canCycleMaterials = canCycleSelectedMaterials();
  elements.previousMaterialButton.disabled = !canCycleMaterials;
  elements.nextMaterialButton.disabled = !canCycleMaterials;
  elements.fileType.textContent = file.type;
  elements.currentFileName.textContent = file.name;
  elements.currentFileName.title = file.relativePath;
  elements.recordId.textContent = file.id;
  elements.recordId.title = file.id;
  elements.originalFileName.textContent = file.originalName || file.name;
  elements.originalFileName.title = file.originalName || file.name;
  appState.editingStatus =
    file.status === "organized" ? "organized" : "unread";
  renderReadingStatus();

  if (file.kind === "source" && file.date) useDate(file.date);
  if (file.paper) elements.paperInput.value = file.paper;
  elements.editionNumberInput.value = file.editionNumber || "";
  appState.editingEditionUnit = file.editionUnit === "期" ? "期" : "版";
  renderEditionUnit();
  elements.titleInput.value = file.title;
  elements.authorInput.value = file.author || "";
  elements.paperAuthorInput.value = file.author || "";
  elements.paperTitleInput.value = file.title || "";
  elements.journalInput.value = file.journal || file.paper || "";
  elements.issueNumberInput.value = file.issueNumber || "";
  appState.editingIssueUnit = file.issueUnit === "卷" ? "卷" : "期";
  renderIssueUnit();
  elements.degreeSelect.value =
    file.degree === "博士学位论文" ? "博士学位论文" : "硕士学位论文";
  elements.institutionInput.value = file.institution || "";
  const paperDateParts = String(file.date || "").split("-");
  elements.paperYearInput.value =
    file.kind === "paper" ? paperDateParts[0] || "" : "";
  elements.paperMonthInput.value =
    file.kind === "paper" && paperDateParts[1]
      ? String(Number(paperDateParts[1]))
      : "";
  elements.paperDayInput.value =
    file.kind === "paper" && paperDateParts[2]
      ? String(Number(paperDateParts[2]))
      : "";
  const bookMetadata = bookMetadataFromFile(file);
  elements.bookAuthorInput.value = file.kind === "book" ? bookMetadata.author : "";
  elements.bookTitleInput.value = file.kind === "book" ? bookMetadata.title : "";
  elements.bookPlaceInput.value = file.kind === "book" ? bookMetadata.place : "";
  elements.bookPublisherInput.value =
    file.kind === "book" ? bookMetadata.publisher : "";
  const bookDateParts = String(
    file.kind === "book" ? file.date || "" : ""
  ).split("-");
  elements.bookYearInput.value = bookDateParts[0] || "";
  elements.bookMonthInput.value = bookDateParts[1]
    ? String(Number(bookDateParts[1]))
    : "";
  elements.bookDayInput.value = bookDateParts[2]
    ? String(Number(bookDateParts[2]))
    : "";
  appState.editingTags = Array.from(file.tags || []);
  elements.tagInput.value = "";
  renderTagChips();
  appState.previewKind = file.ext === ".pdf" ? "pdf" : "image";
  appState.ocrPage = file.ext === ".pdf" ? preserveOcrPage : 1;
  if (!preservePreviewView) {
    appState.selectedOcrRegionId = "";
    appState.screenshotAnnotationId = "";
    appState.noteReferenceDrafts = [];
    appState.ocrCorrectedDirty = false;
    appState.manualCorrectedDraft = false;
  }
  resetImageView(true);

  const previewUrl =
    preservedPreviewUrl ||
    `/api/preview?path=${encodeURIComponent(file.relativePath)}&t=${Date.now()}`;
  appState.previewUrl = previewUrl;
  annotationState.highlightId = "";
  annotationState.draft = null;
  annotationState.editId = "";
  annotationState.editOriginal = null;
  annotationState.editRect = null;
  annotationState.editAction = "";
  elements.annotationEditBar.classList.add("hidden");
  elements.annotationDraftText.value = "";
  elements.annotationDraftEditor.classList.add("hidden");
  elements.annotationPageInput.value = String(preserveAnnotationPage);
  setAnnotationMode(false);
  elements.emptyPreview.classList.add("hidden");
  elements.annotationToolbar.classList.remove("hidden");
  if (file.ext === ".pdf") {
    elements.imagePreview.classList.add("hidden");
    elements.imagePreview.removeAttribute("src");
    elements.annotationPageField.classList.remove("hidden");
    if (reuseLoadedPdfPreview) {
      if (preservePdfSelectionPreview) {
        showPdfSelectionPage(preserveAnnotationPage).catch((error) => {
          showToast(`无法保持 PDF 第 ${preserveAnnotationPage} 页：${error.message}`, "error");
        });
      } else {
        showPdfContinuousReading(preserveAnnotationPage);
      }
    } else {
      elements.pdfPreview.src = `${previewUrl}#page=${preserveAnnotationPage}`;
      elements.pdfPreview.classList.remove("hidden");
      elements.pdfContinuousPreview.classList.add("hidden");
      elements.pdfSelectionPreview.classList.add("hidden");
      elements.previewStage.classList.remove("pdf-continuous-active");
      elements.imageTools.classList.add("hidden");
      elements.zoomHint.textContent =
        "正在准备连续页阅读；框选会使用当前可见页";
      elements.zoomHint.classList.remove("hidden");
      elements.pdfModeButton.classList.add("hidden");
      renderPdfContinuousPreview(preserveAnnotationPage)
        .then(async () => {
          if (
            preservePdfSelectionPreview &&
            appState.previewUrl === previewUrl
          ) {
            await showPdfSelectionPage(preserveAnnotationPage);
            imageView.active = true;
            applyImageView();
          }
        })
        .catch((error) => {
          if (appState.previewUrl !== previewUrl) return;
          pdfContinuousReady = false;
          elements.pdfContinuousPreview.classList.add("hidden");
          elements.pdfPreview.classList.remove("hidden");
          elements.previewStage.classList.remove("pdf-continuous-active");
          elements.zoomHint.textContent =
            "连续阅读组件未能生成，当前使用浏览器兼容预览；请在页码框确认当前页后再框选";
          showToast(`PDF 连续阅读未能载入：${error.message}`, "error");
        });
    }
  } else {
    elements.pdfPreview.classList.add("hidden");
    elements.pdfPreview.removeAttribute("src");
    elements.pdfContinuousPreview.classList.add("hidden");
    elements.pdfContinuousPreview.innerHTML = "";
    elements.previewStage.classList.remove("pdf-continuous-active");
    elements.pdfSelectionPreview.classList.add("hidden");
    elements.imagePreview.src = previewUrl;
    elements.imagePreview.classList.remove("hidden");
    elements.imageTools.classList.remove("hidden");
    elements.zoomHint.textContent =
      "单击图片后滚轮缩放 · 放大后按住鼠标拖动";
    elements.zoomHint.classList.remove("hidden");
    elements.pdfModeButton.classList.add("hidden");
    elements.annotationPageField.classList.add("hidden");
  }

  if (preservedView) {
    imageView.scale = preservedView.scale;
    imageView.x = preservedView.x;
    imageView.y = preservedView.y;
    imageView.active = preservedView.active;
    setAnnotationMode(false);
  }
  syncPdfAnnotationPageControls();
  renderResearchNotes();
  renderOcrWorkspace();
  renderAnnotationLayer();
  renderFileList();
  renderPaperMenu();
  renderKindEditor();
  updateFilenamePreview();
}

function currentYear() {
  return new Date().getFullYear();
}

const UNKNOWN_DATE_PART = "未知";

function isUnknownDatePart(value) {
  return String(value || "").trim() === UNKNOWN_DATE_PART;
}

function normalizedDatePart(value, width) {
  const text = String(value || "").trim();
  return isUnknownDatePart(text) ? UNKNOWN_DATE_PART : text.padStart(width, "0");
}

function readableDatePart(value, suffix) {
  const text = String(value || "").trim();
  return isUnknownDatePart(text)
    ? `${UNKNOWN_DATE_PART}${suffix}`
    : `${Number(text)}${suffix}`;
}

function valuesForDateType(type) {
  if (type === "year") {
    return [
      UNKNOWN_DATE_PART,
      ...Array.from({ length: currentYear() - 1799 }, (_, index) =>
        String(currentYear() - index)
      ),
    ];
  }
  if (type === "month") {
    return [
      UNKNOWN_DATE_PART,
      ...Array.from({ length: 12 }, (_, index) => String(index + 1)),
    ];
  }
  const year = Number(elements.yearInput.value) || currentYear();
  const month = Number(elements.monthInput.value);
  const count = month ? new Date(year, month, 0).getDate() : 31;
  return [
    UNKNOWN_DATE_PART,
    ...Array.from({ length: count }, (_, index) => String(index + 1)),
  ];
}

function dateSuffix(type) {
  return type === "year" ? "年" : type === "month" ? "月" : "日";
}

function renderDateMenu(type, showAll = true) {
  const menu = dateMenus[type];
  const input = dateInputs[type];
  const query = input.value.trim();
  let values = valuesForDateType(type);
  if (!showAll && query) values = values.filter((value) => value.startsWith(query));

  if (!values.length) {
    menu.innerHTML = '<div class="date-menu-empty">没有符合范围的选项</div>';
    return;
  }
  menu.innerHTML = values
    .map(
      (value) => `
        <button type="button" class="date-option" data-value="${value}"
          role="option" aria-selected="${input.value === value}">
          ${value}${dateSuffix(type)}
        </button>`
    )
    .join("");
  menu.querySelectorAll(".date-option").forEach((button) => {
    button.addEventListener("click", () =>
      chooseDateOption(type, Number(button.dataset.optionIndex))
    );
  });
  const buttons = dateOptionButtons(type);
  buttons.forEach((button, index) => {
    button.dataset.optionIndex = String(index);
  });
  const selectedIndex = buttons.findIndex(
    (button) => button.dataset.value === input.value
  );
  dateKeyboardIndex[type] = selectedIndex >= 0 ? selectedIndex : 0;
  highlightDateOption(type, dateKeyboardIndex[type], false);
}

function openDateMenu(type, showAll = true) {
  closeDateMenus(type);
  closePaperMenu();
  closeEditionMenu();
  closeIssueMenu();
  renderDateMenu(type, showAll);
  dateMenus[type].classList.remove("hidden");
  dateInputs[type].setAttribute("aria-expanded", "true");
  highlightDateOption(type, dateKeyboardIndex[type], true);
}

function closeDateMenus(exceptType = "") {
  for (const type of ["year", "month", "day"]) {
    if (type === exceptType) continue;
    dateMenus[type].classList.add("hidden");
    dateInputs[type].setAttribute("aria-expanded", "false");
    dateOptionButtons(type).forEach((button) =>
      button.classList.remove("keyboard-active")
    );
    dateKeyboardIndex[type] = -1;
  }
}

function toggleDateMenu(type) {
  if (dateMenus[type].classList.contains("hidden")) openDateMenu(type, true);
  else closeDateMenus();
}

function ensureValidDay() {
  if (isUnknownDatePart(elements.dayInput.value)) {
    if (!elements.dayMenu.classList.contains("hidden")) {
      renderDateMenu("day", true);
    }
    return;
  }
  const day = Number(elements.dayInput.value);
  const possibleDays = valuesForDateType("day").filter(
    (value) => value !== UNKNOWN_DATE_PART
  ).length;
  if (day > possibleDays) elements.dayInput.value = "";
  if (!elements.dayMenu.classList.contains("hidden")) renderDateMenu("day", true);
}

function handleDateTyping(type) {
  const input = dateInputs[type];
  const rawValue = input.value.trim();
  input.value = UNKNOWN_DATE_PART.startsWith(rawValue)
    ? rawValue
    : rawValue.replace(/\D/g, "");
  if (type === "month" && Number(input.value) > 12) input.value = "12";
  if (type === "day" && Number(input.value) > 31) input.value = "31";
  if (type === "year" || type === "month") ensureValidDay();
  openDateMenu(type, false);
  updateFilenamePreview();
}

function dateOptionButtons(type) {
  return Array.from(dateMenus[type].querySelectorAll(".date-option"));
}

function highlightDateOption(type, requestedIndex, shouldScroll = true) {
  const buttons = dateOptionButtons(type);
  if (!buttons.length) {
    dateKeyboardIndex[type] = -1;
    return;
  }
  const index = ((requestedIndex % buttons.length) + buttons.length) % buttons.length;
  dateKeyboardIndex[type] = index;
  buttons.forEach((button, buttonIndex) => {
    const active = buttonIndex === index;
    button.classList.toggle("keyboard-active", active);
    button.setAttribute("data-keyboard-active", String(active));
  });
  if (shouldScroll) buttons[index].scrollIntoView({ block: "nearest" });
}

function chooseDateOption(type, requestedIndex) {
  const buttons = dateOptionButtons(type);
  const button = buttons[requestedIndex];
  if (!button) return;
  dateInputs[type].value = button.dataset.value;
  closeDateMenus();
  if (type === "year" || type === "month") ensureValidDay();
  updateFilenamePreview();
}

function moveDateFocus(type, direction) {
  const currentIndex = dateFieldOrder.indexOf(type);
  const targetIndex = currentIndex + direction;
  if (targetIndex < 0 || targetIndex >= dateFieldOrder.length) return;
  const targetType = dateFieldOrder[targetIndex];
  closeDateMenus();
  dateInputs[targetType].focus({ preventScroll: true });
  openDateMenu(targetType, true);
}

function handleDateKeyboard(type, event) {
  const menuOpen = !dateMenus[type].classList.contains("hidden");
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    if (!menuOpen) openDateMenu(type, true);
    const direction = event.key === "ArrowDown" ? 1 : -1;
    highlightDateOption(type, dateKeyboardIndex[type] + direction, true);
    return;
  }
  if (event.key === " " || event.key === "Enter") {
    if (!menuOpen) {
      if (event.key === " ") event.preventDefault();
      openDateMenu(type, true);
      return;
    }
    event.preventDefault();
    chooseDateOption(type, dateKeyboardIndex[type]);
    return;
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    moveDateFocus(type, 1);
    return;
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveDateFocus(type, -1);
    return;
  }
  if (event.key === "Escape") {
    event.preventDefault();
    closeDateMenus();
  }
}

function normalizeDate() {
  const year = elements.yearInput.value.trim();
  const month = elements.monthInput.value.trim();
  const day = elements.dayInput.value.trim();
  if (!isUnknownDatePart(year) && !/^\d{4}$/.test(year)) {
    return { error: "年份应为4位数字或“未知”" };
  }
  if (
    !isUnknownDatePart(year) &&
    (Number(year) < 1800 || Number(year) > currentYear())
  ) {
    return { error: `年份应在1800至${currentYear()}之间` };
  }
  if (
    !isUnknownDatePart(month) &&
    (!/^\d{1,2}$/.test(month) ||
      Number(month) < 1 ||
      Number(month) > 12)
  ) {
    return { error: "月份应为1至12或“未知”" };
  }
  if (
    !isUnknownDatePart(day) &&
    (!/^\d{1,2}$/.test(day) || Number(day) < 1 || Number(day) > 31)
  ) {
    return { error: "日期应为1至31或“未知”" };
  }
  if (
    !isUnknownDatePart(year) &&
    !isUnknownDatePart(month) &&
    !isUnknownDatePart(day)
  ) {
    const test = new Date(Number(year), Number(month) - 1, Number(day));
    if (
      test.getFullYear() !== Number(year) ||
      test.getMonth() !== Number(month) - 1 ||
      test.getDate() !== Number(day)
    ) {
      return { error: "日期无效，请检查年月日" };
    }
  }
  return {
    value: `${normalizedDatePart(year, 4)}-${normalizedDatePart(
      month,
      2
    )}-${normalizedDatePart(day, 2)}`,
  };
}

function sanitize(value) {
  return String(value)
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, "＿")
    .replace(/\s+/g, " ")
    .replace(/[. ]+$/g, "");
}

function stripTitleMarks(value) {
  return sanitize(value).replace(/^《|》$/gu, "");
}

function bookMetadataFromFile(file = {}) {
  const citation = String(file.citation || "").trim();
  const legacyMatch = citation.match(
    /^(.*?)：《(.*?)》，(.*?)：(.*?)，(.+?)(?:。)?$/u
  );
  const savedTitle = String(file.title || "").trim();
  return {
    author: String(file.author || legacyMatch?.[1] || "").trim(),
    title: String(
      savedTitle && savedTitle !== citation
        ? savedTitle
        : legacyMatch?.[2] || savedTitle || ""
    ).trim(),
    place: String(file.bookPlace || legacyMatch?.[3] || "").trim(),
    publisher: String(file.bookPublisher || legacyMatch?.[4] || "").trim(),
  };
}

function flexibleDateFromInputs(yearInput, monthInput, dayInput, subject) {
  const year = yearInput.value.trim();
  const month = monthInput.value.trim();
  const day = dayInput.value.trim();
  const current = currentYear();
  if (
    !isUnknownDatePart(year) &&
    (!/^\d{4}$/.test(year) || Number(year) < 1800 || Number(year) > current)
  ) {
    return { error: `${subject}年份应为“未知”或1800至${current}之间的4位数字` };
  }
  if (!month && day) return { error: "填写日期时需要先填写月份" };
  if (!month) {
    return {
      value: normalizedDatePart(year, 4),
      label: readableDatePart(year, "年"),
    };
  }
  if (
    !isUnknownDatePart(month) &&
    (!/^\d{1,2}$/.test(month) ||
      Number(month) < 1 ||
      Number(month) > 12)
  ) {
    return { error: "月份应为1至12、“未知”或留空" };
  }
  if (!day) {
    return {
      value: `${normalizedDatePart(year, 4)}-${normalizedDatePart(month, 2)}`,
      label: `${readableDatePart(year, "年")}${readableDatePart(month, "月")}`,
    };
  }
  if (
    !isUnknownDatePart(day) &&
    (!/^\d{1,2}$/.test(day) || Number(day) < 1 || Number(day) > 31)
  ) {
    return { error: "日期应为1至31、“未知”或留空" };
  }
  if (
    !isUnknownDatePart(year) &&
    !isUnknownDatePart(month) &&
    !isUnknownDatePart(day)
  ) {
    const test = new Date(Number(year), Number(month) - 1, Number(day));
    if (
      test.getFullYear() !== Number(year) ||
      test.getMonth() !== Number(month) - 1 ||
      test.getDate() !== Number(day)
    ) {
      return { error: "日期无效，请检查年月日" };
    }
  }
  return {
    value: `${normalizedDatePart(year, 4)}-${normalizedDatePart(
      month,
      2
    )}-${normalizedDatePart(day, 2)}`,
    label: `${readableDatePart(year, "年")}${readableDatePart(
      month,
      "月"
    )}${readableDatePart(day, "日")}`,
  };
}

function flexiblePaperDate() {
  return flexibleDateFromInputs(
    elements.paperYearInput,
    elements.paperMonthInput,
    elements.paperDayInput,
    "论文"
  );
}

function flexibleBookDate() {
  return flexibleDateFromInputs(
    elements.bookYearInput,
    elements.bookMonthInput,
    elements.bookDayInput,
    "专著"
  );
}

function targetPreview() {
  if (appState.selectedIndex < 0) return { error: "请先选择一份资料" };
  const file = appState.files[appState.selectedIndex];
  const ext = file.ext;

  if (appState.editingKind === "book") {
    const author = sanitize(elements.bookAuthorInput.value);
    const title = stripTitleMarks(elements.bookTitleInput.value);
    const place = sanitize(elements.bookPlaceInput.value);
    const publisher = sanitize(elements.bookPublisherInput.value);
    const date = flexibleBookDate();
    if (!author) return { error: "请填写专著作者" };
    if (!title) return { error: "请填写著作名" };
    if (!place) return { error: "请填写出版地名" };
    if (!publisher) return { error: "请填写出版社名" };
    if (date.error) return date;
    return {
      value: `${author}：《${title}》，${place}：${publisher}，${date.label}${ext}`,
    };
  }

  if (appState.editingKind === "paper") {
    const author = sanitize(elements.paperAuthorInput.value);
    const title = stripTitleMarks(elements.paperTitleInput.value);
    const date = flexiblePaperDate();
    if (!author) return { error: "请填写论文作者" };
    if (!title) return { error: "请填写论文标题" };
    if (date.error) return date;

    if (appState.editingPaperType === "thesis") {
      const degree = elements.degreeSelect.value;
      const institution = sanitize(elements.institutionInput.value);
      if (!institution) return { error: "请填写学位授予单位" };
      return {
        value: `${author}：《${title}》，${degree}，${institution}，${date.label}。${ext}`,
      };
    }

    const journal = stripTitleMarks(elements.journalInput.value);
    const issueNumber = sanitize(elements.issueNumberInput.value).replace(
      /(期|卷)$/u,
      ""
    );
    const issueUnit = appState.editingIssueUnit === "卷" ? "卷" : "期";
    if (!journal) return { error: "请填写期刊名" };
    const issue = issueNumber ? `第${issueNumber}${issueUnit}` : "";
    return {
      value: `${author}：《${title}》，《${journal}》，${date.label}${issue}。${ext}`,
    };
  }

  const date = normalizeDate();
  if (date.error) return date;
  const paper = sanitize(elements.paperInput.value);
  const editionNumber = sanitize(elements.editionNumberInput.value).replace(
    /(版|期)$/u,
    ""
  );
  const editionUnit = appState.editingEditionUnit === "期" ? "期" : "版";
  const edition = editionNumber ? `${editionNumber}${editionUnit}` : "";
  const title = sanitize(elements.titleInput.value);
  const author = sanitize(elements.authorInput.value);
  if (!paper) return { error: "请填写报刊名" };
  if (!title) return { error: "篇名不能为空" };
  const keepCompoundStyle = file.importReview?.style === "compound";
  let name =
    edition || keepCompoundStyle
      ? `【${date.value}-《${paper}》${edition}】${title}`
      : `【${date.value}】【${paper}】${title}`;
  if (author) name += `【作者-${author}】`;
  return { value: `${name}${ext}` };
}

function updateFilenamePreview() {
  const preview = targetPreview();
  const card = elements.filenamePreview.parentElement;
  if (preview.error) {
    elements.filenamePreview.textContent = `待完善：${preview.error}`;
    card.classList.add("invalid");
    return;
  }
  elements.filenamePreview.textContent = preview.value;
  card.classList.remove("invalid");
}

function useDate(date) {
  const [year, month, day] = date.split("-");
  elements.yearInput.value = year || "";
  elements.monthInput.value = month
    ? isUnknownDatePart(month)
      ? UNKNOWN_DATE_PART
      : String(Number(month))
    : "";
  ensureValidDay();
  elements.dayInput.value = day
    ? isUnknownDatePart(day)
      ? UNKNOWN_DATE_PART
      : String(Number(day))
    : "";
  updateFilenamePreview();
}

function renderPaperMenu() {
  if (!appState.recentPapers.length) {
    elements.paperMenu.innerHTML =
      '<div class="paper-menu-empty">保存一次后，报刊会自动记录在这里</div>';
    return;
  }
  elements.paperMenu.innerHTML = `
    <div class="paper-menu-heading">已记录 ${appState.recentPapers.length} 个报刊</div>
    ${appState.recentPapers
      .map(
        (paper, index) => `
          <button type="button" class="paper-option"
            data-paper="${escapeHtml(paper)}"
            role="option"
            aria-selected="${elements.paperInput.value === paper}">
            <span>${escapeHtml(paper)}</span>
            <small>${index === 0 ? "最近使用" : "已记录"}</small>
          </button>`
      )
      .join("")}`;
  elements.paperMenu.querySelectorAll(".paper-option").forEach((button) => {
    button.addEventListener("click", () =>
      choosePaperOption(Number(button.dataset.optionIndex))
    );
  });
  const buttons = paperOptionButtons();
  buttons.forEach((button, index) => {
    button.dataset.optionIndex = String(index);
  });
  const selectedIndex = buttons.findIndex(
    (button) => button.dataset.paper === elements.paperInput.value
  );
  paperKeyboardIndex = selectedIndex >= 0 ? selectedIndex : 0;
  highlightPaperOption(paperKeyboardIndex, false);
}

function openPaperMenu() {
  closeDateMenus();
  closeEditionMenu();
  closeIssueMenu();
  renderPaperMenu();
  elements.paperMenu.classList.remove("hidden");
  elements.paperInput.setAttribute("aria-expanded", "true");
  highlightPaperOption(paperKeyboardIndex, true);
}

function closePaperMenu() {
  elements.paperMenu.classList.add("hidden");
  elements.paperInput.setAttribute("aria-expanded", "false");
  paperOptionButtons().forEach((button) =>
    button.classList.remove("keyboard-active")
  );
  paperKeyboardIndex = -1;
}

function togglePaperMenu() {
  if (elements.paperMenu.classList.contains("hidden")) openPaperMenu();
  else closePaperMenu();
}

function paperOptionButtons() {
  return Array.from(elements.paperMenu.querySelectorAll(".paper-option"));
}

function highlightPaperOption(requestedIndex, shouldScroll = true) {
  const buttons = paperOptionButtons();
  if (!buttons.length) {
    paperKeyboardIndex = -1;
    return;
  }
  const index = ((requestedIndex % buttons.length) + buttons.length) % buttons.length;
  paperKeyboardIndex = index;
  buttons.forEach((button, buttonIndex) => {
    const active = buttonIndex === index;
    button.classList.toggle("keyboard-active", active);
    button.setAttribute("data-keyboard-active", String(active));
  });
  if (shouldScroll) buttons[index].scrollIntoView({ block: "nearest" });
}

function choosePaperOption(requestedIndex) {
  const button = paperOptionButtons()[requestedIndex];
  if (!button) return;
  elements.paperInput.value = button.dataset.paper;
  closePaperMenu();
  renderPaperMenu();
  updateFilenamePreview();
}

function handlePaperKeyboard(event) {
  const menuOpen = !elements.paperMenu.classList.contains("hidden");
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    if (!menuOpen) openPaperMenu();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    highlightPaperOption(paperKeyboardIndex + direction, true);
    return;
  }
  if (event.key === " " || event.key === "Enter") {
    if (!menuOpen) {
      if (event.key === " ") event.preventDefault();
      openPaperMenu();
      return;
    }
    event.preventDefault();
    choosePaperOption(paperKeyboardIndex);
    return;
  }
  if (event.key === "Escape") {
    event.preventDefault();
    closePaperMenu();
  }
}

function renderRecentChips() {
  let chips = [
    ...appState.recentDates.slice(0, 4).map((value) => ({ kind: "日期", value })),
    ...appState.recentPapers.slice(0, 8).map((value) => ({ kind: "报刊", value })),
  ];
  if (appState.editingKind === "book") {
    const seen = new Set();
    chips = appState.allFiles
      .filter((file) => file.kind === "book")
      .flatMap((file) => {
        const metadata = bookMetadataFromFile(file);
        return [
          { kind: "作者", value: metadata.author },
          { kind: "著作名", value: metadata.title },
          { kind: "出版地", value: metadata.place },
          { kind: "出版社", value: metadata.publisher },
          { kind: "日期", value: file.date || "" },
        ];
      })
      .filter((chip) => {
        const key = `${chip.kind}:${chip.value}`;
        if (!chip.value || seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 10);
  }
  if (!chips.length) {
    elements.recentChips.innerHTML =
      '<span class="empty-chip-text">完成一次保存后会出现在这里</span>';
    return;
  }
  elements.recentChips.innerHTML = chips
    .slice(0, 8)
    .map(
      (chip) =>
        `<button type="button" class="chip" data-kind="${chip.kind}" data-value="${escapeHtml(
          chip.value
        )}">${chip.kind} · ${escapeHtml(chip.value)}</button>`
    )
    .join("");
  elements.recentChips.querySelectorAll(".chip").forEach((button) => {
    button.addEventListener("click", () => {
      if (appState.editingKind === "book") {
        if (button.dataset.kind === "作者") {
          elements.bookAuthorInput.value = button.dataset.value;
        } else if (button.dataset.kind === "著作名") {
          elements.bookTitleInput.value = button.dataset.value;
        } else if (button.dataset.kind === "出版地") {
          elements.bookPlaceInput.value = button.dataset.value;
        } else if (button.dataset.kind === "出版社") {
          elements.bookPublisherInput.value = button.dataset.value;
        } else if (button.dataset.kind === "日期") {
          const parts = String(button.dataset.value || "").split("-");
          elements.bookYearInput.value = parts[0] || "";
          elements.bookMonthInput.value = parts[1]
            ? String(Number(parts[1]))
            : "";
          elements.bookDayInput.value = parts[2]
            ? String(Number(parts[2]))
            : "";
        }
      } else if (button.dataset.kind === "日期") {
        useDate(button.dataset.value);
      } else {
        elements.paperInput.value = button.dataset.value;
      }
      updateFilenamePreview();
    });
  });
}

function setBusy(value) {
  appState.busy = value;
  elements.previousMaterialButton.disabled =
    value || !canCycleSelectedMaterials();
  elements.nextMaterialButton.disabled =
    value || !canCycleSelectedMaterials();
  elements.chooseFolderButton.disabled = value;
  elements.newProjectButton.disabled = value || !appState.isWritableLibrary;
  elements.folderImportButton.disabled = false;
  elements.exportNavButton.disabled = value || !appState.allFiles.length;
  elements.paperMenuButton.disabled = value;
  elements.editionMenuButton.disabled = value;
  elements.issueMenuButton.disabled = value;
  elements.tagInput.disabled = value;
  elements.tagAddButton.disabled = value;
  elements.annotationModeButton.disabled = value;
  elements.annotationPanButton.disabled = value;
  syncPdfAnnotationPageControls();
  syncOcrReferencePageControls();
  elements.saveAnnotationDraftButton.disabled = value;
  elements.recognizeAnnotationDraftButton.disabled = value;
  elements.saveAnnotationEditButton.disabled = value;
  elements.addResearchNoteButton.disabled = value;
  elements.researchNoteInput.contentEditable = value ? "false" : "true";
  elements.researchNoteInput.setAttribute("aria-disabled", String(value));
  elements.saveCloudOcrSettingsButton.disabled = value;
  elements.clearCloudOcrButtons.forEach((button) => {
    button.disabled = value;
  });
  elements.saveAiSentenceSettingsButton.disabled = value;
  elements.clearAiSentenceSettingsButton.disabled = value;
  elements.aiSentenceModelInput.disabled = value;
  elements.aiSentenceApiKeyInput.disabled = value;
  elements.runPageAiSentenceButton.disabled = value;
  elements.loadPageAiSentenceInputButton.disabled = value;
  elements.copyPageAiSentenceOutputButton.disabled = value;
  elements.usePageAiSentenceOutputButton.disabled = value;
  elements.translationSourceLanguage.disabled = value;
  elements.translationTargetLanguage.disabled = value;
  elements.translationPageInput.disabled = value || !appState.selectedId;
  elements.checkEdgeTranslationButton.disabled = value;
  elements.checkArgosTranslationButton.disabled = value;
  elements.installArgosTranslationButton.disabled = value;
  elements.downloadArgosModelButton.disabled = value;
  elements.clearCloudTranslationSettingsButton.disabled = value;
  elements.saveCloudTranslationSettingsButton.disabled = value;
  elements.cloudTranslationApiKey.disabled = value;
  elements.cloudTranslationModel.disabled = value;
  elements.translationInput.disabled = value;
  elements.translationOutput.disabled = value;
  elements.translationCloudConsent.disabled = value;
  elements.loadTranslationInputButton.disabled = value;
  elements.runTranslationButton.disabled = value;
  elements.copyTranslationOutputButton.disabled = value;
  elements.saveTranslationRecordButton.disabled = value;
  elements.screenshotPageInput.disabled = value || !appState.selectedId;
  elements.chooseScreenshotFolderButton.disabled =
    value || !appState.isWritableLibrary;
  elements.resetScreenshotFolderButton.disabled =
    value || !appState.isWritableLibrary;
  elements.exportScreenshotPageButton.disabled = value;
  elements.exportScreenshotRegionButton.disabled = value;
  elements.copyScreenshotExportPathButton.disabled = value;
  elements.screenshotImportedText.disabled = value;
  elements.saveScreenshotPageTextButton.disabled = value;
  elements.saveScreenshotRegionTextButton.disabled = value;
  elements.refreshOcrServiceButtons.forEach((button) => {
    button.disabled = value || appState.ocrService.checking;
  });
  elements.manageOcrServiceButtons.forEach((button) => {
    button.disabled =
      value || appState.ocrService.checking || appState.ocrService.running;
  });
  elements.discardOcrPendingButton.disabled = value;
  elements.keepOcrPendingButton.disabled = value;
  elements.deleteOcrRegionButton.disabled = value;
  elements.copyOcrRawButton.disabled = value;
  setMainTextDisabled(value);
  elements.resetOcrCorrectedButton.disabled = value;
  elements.saveOcrCorrectedButton.disabled = value;
  elements.mainTextOcrButton.disabled = value;
  elements.mainTextAiButton.disabled = value;
  elements.mainTextTranslationButton.disabled = value;
  elements.mainTextClearButton.disabled = value;
  elements.createManualCorrectedButton.disabled = value;
  elements.useOcrAsCorrectionButton.disabled = value;
  elements.quoteOcrSelectionButton.disabled = value;
  elements.ocrPageInputs.forEach((input) => {
    input.disabled = value;
  });
  elements.ocrRegionSelects.forEach((select) => {
    select.disabled = value;
  });
  elements.saveNextButton.disabled = value;
  elements.saveButton.disabled = value;
  elements.importReviewButton.disabled = value;
  elements.folderImportProject.disabled = value;
  elements.folderImportRecursive.disabled = value;
  elements.folderImportPreserveStructure.disabled = value;
  elements.folderImportConflictPolicy.disabled = value;
  elements.chooseImportSourceFolderButton.disabled = value;
  elements.chooseImportSourceFilesButton.disabled = value;
  elements.folderImportList
    .querySelectorAll("input")
    .forEach((input) => {
      input.disabled = value;
    });
  updateFolderImportControls();
  elements.textExportProjectFilter.disabled = value;
  elements.textExportSearchInput.disabled = value;
  elements.textExportFormat.disabled = value;
  elements.textExportFilename.disabled = value;
  elements.chooseTextExportFolderButton.disabled = value;
  elements.resetTextExportFolderButton.disabled =
    value || !appState.textExportDirectoryHandle;
  elements.textExportScopeInputs.forEach((input) => {
    input.disabled = value;
  });
  elements.textExportMaterialList
    .querySelectorAll("input")
    .forEach((input) => {
      input.disabled = value;
    });
  updateTextExportControls();
  elements.timelineButton.disabled = value;
  elements.aiSuggestionProviderSelect.disabled = value;
  elements.aiSuggestionTextLimit.disabled = value;
  elements.aiSuggestionConsent.disabled = value;
  elements.aiSuggestionSearchInput.disabled = value;
  elements.selectVisibleAiMaterialsButton.disabled = value;
  elements.clearAiMaterialsButton.disabled = value;
  elements.aiSuggestionKindFilters.forEach((input) => {
    input.disabled = value;
  });
  elements.aiSuggestionTypeInputs.forEach((input) => {
    input.disabled = value;
  });
  [
    elements.aiSuggestionIncludeMetadata,
    elements.aiSuggestionIncludeOcr,
    elements.aiSuggestionIncludeAnnotations,
    elements.aiSuggestionIncludeNotes,
    elements.aiSuggestionIncludeTranslations,
  ].forEach((input) => {
    input.disabled = value;
  });
  elements.aiSuggestionMaterialList
    .querySelectorAll("input")
    .forEach((input) => {
      input.disabled = value;
    });
  elements.aiChatProviderSelect.disabled = value;
  elements.aiChatQuestionInput.disabled = value;
  elements.aiChatConsent.disabled = value;
  elements.sendAiChatButton.disabled = value;
  elements.clearAiChatButton.disabled = value;
  elements.reparseButton.disabled = value;
  elements.confirmReadyButton.disabled =
    value || !(appState.importReview?.ready || 0);
  [
    ...elements.recordKindButtons,
    ...elements.sourceLanguageButtons,
    ...elements.paperTypeButtons,
    ...elements.issueUnitButtons,
  ].forEach(
    (button) => {
      button.disabled = value;
    }
  );
  elements.sourceLanguageButtons.forEach((button) => {
    button.disabled = value || !selectedFile() || !appState.isWritableLibrary;
  });
  elements.importReviewList
    .querySelectorAll("button, input")
    .forEach((control) => {
      control.disabled = value;
    });
  elements.readingStatusButtons.forEach((button) => {
    button.disabled = value;
  });
  elements.detailsViewButtons.forEach((button) => {
    button.disabled = value;
  });
  elements.foreignTextModeButtons.forEach((button) => {
    button.disabled = value;
  });
  if (value) elements.undoButton.disabled = true;
  if (!value) renderOcrWorkspace();
  renderAiSuggestionPreview();
  renderAiChat();
}

async function renameCurrent(goNext) {
  if (appState.busy || appState.selectedIndex < 0) return;
  if (elements.tagInput.value.trim()) addTagsFromInput();
  const preview = targetPreview();
  if (preview.error) {
    showToast(preview.error, "error");
    return;
  }
  if (!appState.isWritableLibrary) {
    showToast("资料库保护已阻止操作：这个文件夹只能预览和搜索", "error");
    return;
  }

  const currentIndex = appState.selectedIndex;
  const currentId = appState.selectedId;
  const currentRelativePath = appState.selectedRelativePath;
  setBusy(true);
  setStatus("正在保存文件名、标签与整理状态…");
  try {
    const data = await request("/api/rename", {
      method: "POST",
      body: JSON.stringify({
        id: currentId,
        relativePath: currentRelativePath,
        year: elements.yearInput.value,
        month: elements.monthInput.value,
        day: elements.dayInput.value,
        paper: elements.paperInput.value,
        editionNumber: elements.editionNumberInput.value,
        editionUnit: appState.editingEditionUnit,
        title: elements.titleInput.value,
        author: elements.authorInput.value,
        kind: appState.editingKind,
        sourceLanguage: appState.editingSourceLanguage,
        paperType: appState.editingPaperType,
        paperAuthor: elements.paperAuthorInput.value,
        paperTitle: elements.paperTitleInput.value,
        journal: elements.journalInput.value,
        issueNumber: elements.issueNumberInput.value,
        issueUnit: appState.editingIssueUnit,
        degree: elements.degreeSelect.value,
        institution: elements.institutionInput.value,
        paperYear: elements.paperYearInput.value,
        paperMonth: elements.paperMonthInput.value,
        paperDay: elements.paperDayInput.value,
        bookAuthor: elements.bookAuthorInput.value,
        bookTitle: elements.bookTitleInput.value,
        bookPlace: elements.bookPlaceInput.value,
        bookPublisher: elements.bookPublisherInput.value,
        bookYear: elements.bookYearInput.value,
        bookMonth: elements.bookMonthInput.value,
        bookDay: elements.bookDayInput.value,
        tags: appState.editingTags,
        status: appState.editingStatus,
      }),
    });
    const nextIndex = goNext ? currentIndex + 1 : currentIndex;
    applyServerState(
      data,
      goNext ? "" : data.recordId,
      Math.min(nextIndex, Math.max(data.files.length - 1, 0))
    );
    showToast(
      data.unchanged
        ? "文件名未改变，标签和整理状态已保存"
        : `已重命名：${data.renamedTo}`
    );
    setStatus(
      data.unchanged
        ? "资料信息已保存"
        : `已保存，第 ${currentIndex + 1} 份资料处理完成`
    );
  } catch (error) {
    showToast(error.message, "error");
    setStatus("保存未完成，原文件没有被修改");
  } finally {
    setBusy(false);
  }
}

async function chooseLibrary() {
  if (appState.busy) return;
  const reopenImportWindow =
    !elements.folderImportModal.classList.contains("hidden");
  setBusy(true);
  setStatus("请在弹出的窗口中选择资料库根文件夹…");
  try {
    const desktopBridge = window.historicalWorkbenchDesktop;
    let selectedFolder = "";
    if (typeof desktopBridge?.chooseFolder === "function") {
      const selection = await desktopBridge.chooseFolder({
        title: "选择纸上寻踪资料库根文件夹",
        defaultPath: appState.library || "",
        createDirectory: true,
      });
      if (selection?.cancelled || !selection?.folderPath) {
        setStatus("已取消选择资料库");
        return;
      }
      selectedFolder = selection.folderPath;
    }
    const data = await request("/api/choose-library", {
      method: "POST",
      body: JSON.stringify({ folderPath: selectedFolder }),
    });
    if (data.cancelled) {
      setStatus("已取消选择资料库");
      return;
    }
    let nextData = data;
    if (!data.isWritableLibrary && data.hasLibrary) {
      const initialize = await confirmAction(
        "这个文件夹尚未初始化为史料研究资料库。\n\n" +
          "选择“确定”会在文件夹中建立资料库标记和实时信息目录，并允许整理与导入；" +
          "选择“取消”则只进行预览和搜索。"
      );
      if (initialize) {
        nextData = await request("/api/initialize-library", {
          method: "POST",
          body: "{}",
        });
      }
    }
    appState.activeProject = "all";
    appState.searchQuery = "";
    elements.searchInput.value = "";
    applyServerState(nextData, "", 0);
    setStatus(
      nextData.isWritableLibrary
        ? `已载入资料库，共 ${nextData.files.length} 份资料`
        : "已载入未初始化文件夹；当前仅可预览和搜索"
    );
  } catch (error) {
    showToast(error.message, "error");
    setStatus("没有切换资料库");
  } finally {
    setBusy(false);
    if (reopenImportWindow) openFolderImport();
  }
}

async function createProject() {
  if (appState.busy || !appState.isWritableLibrary) return;
  const name = await promptAction("请输入新项目名称", {
    title: "新建研究项目",
    placeholder: "例如：抗战时期报刊研究",
    confirmLabel: "建立项目",
  });
  if (name === null) return;
  const trimmed = name.trim();
  if (!trimmed) {
    showToast("项目名称不能为空", "error");
    return;
  }
  setBusy(true);
  try {
    const data = await request("/api/create-project", {
      method: "POST",
      body: JSON.stringify({ name: trimmed }),
    });
    appState.activeProject = data.createdProject;
    appState.searchQuery = "";
    elements.searchInput.value = "";
    applyServerState(data, "", 0);
    showToast(`已建立项目：${data.createdProject}`);
    setStatus("新项目已建立，可把现有史料加入这个项目");
  } catch (error) {
    showToast(error.message, "error");
  } finally {
    setBusy(false);
  }
}

async function undoLast() {
  if (appState.busy) return;
  setBusy(true);
  setStatus("正在撤销上一次重命名…");
  try {
    const data = await request("/api/undo", {
      method: "POST",
      body: "{}",
    });
    const restoredFile = data.files.find(
      (file) => file.relativePath === data.restoredRelativePath
    );
    applyServerState(data, restoredFile?.id || "", appState.selectedIndex);
    showToast(`已恢复：${data.restoredName || "原文件名"}`);
    setStatus("已撤销上一次重命名");
  } catch (error) {
    showToast(error.message, "error");
    setStatus("撤销未完成");
  } finally {
    setBusy(false);
  }
}

async function copyRecordId() {
  if (!appState.selectedId) {
    showToast("请先选择一份史料", "error");
    return;
  }
  try {
    await navigator.clipboard.writeText(appState.selectedId);
    showToast("稳定史料编号已复制");
  } catch {
    showToast(`史料编号：${appState.selectedId}`);
  }
}

elements.chooseFolderButton.addEventListener("click", chooseLibrary);
elements.newProjectButton.addEventListener("click", createProject);
elements.copyIdButton.addEventListener("click", copyRecordId);

elements.searchInput.addEventListener("input", () => {
  appState.searchQuery = elements.searchInput.value;
  refreshFilteredFiles("", 0);
});
elements.searchScopeButton.addEventListener("click", (event) => {
  event.stopPropagation();
  const willOpen = elements.searchScopePopover.classList.contains("hidden");
  elements.searchScopePopover.classList.toggle("hidden", !willOpen);
  elements.searchScopeButton.setAttribute("aria-expanded", String(willOpen));
});
elements.searchScopePopover.addEventListener("click", (event) => {
  event.stopPropagation();
});
elements.searchKindInputs.forEach((input) => {
  input.addEventListener("change", () => {
    appState.searchKinds = elements.searchKindInputs
      .filter((candidate) => candidate.checked)
      .map((candidate) => candidate.dataset.searchKind);
    renderLibrarySearchScope();
    if (appState.searchQuery.trim()) refreshFilteredFiles("", 0);
  });
});
elements.searchScopeActions.forEach((button) => {
  button.addEventListener("click", () => {
    const selectAll = button.dataset.searchScopeAction === "all";
    appState.searchKinds = selectAll ? ["source", "paper", "book"] : [];
    renderLibrarySearchScope();
    if (appState.searchQuery.trim()) refreshFilteredFiles("", 0);
  });
});
document.addEventListener("click", (event) => {
  if (
    !event.target.closest(".search-box") &&
    !elements.searchScopePopover.classList.contains("hidden")
  ) {
    elements.searchScopePopover.classList.add("hidden");
    elements.searchScopeButton.setAttribute("aria-expanded", "false");
  }
});
elements.kindTabs.forEach((button) => {
  button.addEventListener("click", () => {
    appState.activeKind = button.dataset.kindTab || "source";
    refreshFilteredFiles("", 0);
    setStatus(`已打开${kindLabel(appState.activeKind)}列表`);
  });
});
elements.detailsViewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.dataset.detailsView;
    if (view === "notes") appState.notesSurface = "annotations";
    if (view === "ocr-text") appState.ocrSurface = "corrected";
    switchDetailsView(view);
  });
});
elements.engineSettingsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appState.engineSettingsPanel =
      button.dataset.engineSettingsTab || "ocr";
    renderEngineSettingsPanels();
  });
});
elements.foreignTextModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.foreignTextMode;
    appState.foreignTextMode = ["ocr", "ai-sentence", "translation"].includes(
      mode
    )
      ? mode
      : "ocr";
    renderDetailsView();
  });
});
elements.ocrPageInputs.forEach((input) => {
  input.addEventListener("change", async () => {
    if (!(await confirmDiscardUnsavedCorrection())) {
      renderOcrWorkspace();
      return;
    }
    setOcrPage(input.value, true);
  });
  input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!(await confirmDiscardUnsavedCorrection())) {
        renderOcrWorkspace();
        return;
      }
      setOcrPage(input.value, true);
    }
  });
});
elements.ocrReferencePreviousPageButton.addEventListener("click", () => {
  stepOcrReferencePage(-1);
});
elements.ocrReferenceNextPageButton.addEventListener("click", () => {
  stepOcrReferencePage(1);
});
async function handleAuxiliaryPageChange(input) {
  if (!(await confirmDiscardUnsavedCorrection())) {
    renderOcrWorkspace();
    return;
  }
  setOcrPage(input.value, true);
}
[
  elements.translationPageInput,
  elements.screenshotPageInput,
].forEach((input) => {
  input.addEventListener("change", () => handleAuxiliaryPageChange(input));
  input.addEventListener("keydown", async (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    await handleAuxiliaryPageChange(input);
  });
});
elements.pageOcrEngineSelect.addEventListener("change", () => {
  appState.ocrEngine = ["kandian", "baidu"].includes(
    elements.pageOcrEngineSelect.value
  )
    ? elements.pageOcrEngineSelect.value
    : "umi";
  window.localStorage.setItem(
    "historical-workbench-ocr-engine-v87",
    appState.ocrEngine
  );
  elements.cloudOcrConsent.checked = false;
  renderOcrWorkspace();
  refreshOcrServiceStatus();
});
elements.aiSentenceProviderSelect.addEventListener("change", () => {
  applyAiSentenceProviderPreset();
});
elements.saveAiSentenceSettingsButton.addEventListener(
  "click",
  saveAiSentenceSettings
);
elements.clearAiSentenceSettingsButton.addEventListener(
  "click",
  clearAiSentenceSettings
);
elements.loadPageAiSentenceInputButton.addEventListener("click", () => {
  const text = currentPageTextForAiSentence();
  if (!text) {
    showToast("当前页尚无可载入文本", "error");
    return;
  }
  elements.pageAiSentenceInput.value = text;
  showToast("已载入当前 OCR / 校订文本");
});
elements.runPageAiSentenceButton.addEventListener(
  "click",
  runPageAiSentence
);
elements.copyPageAiSentenceOutputButton.addEventListener(
  "click",
  async () => {
    const text = elements.pageAiSentenceOutput.value.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      showToast("AI 断句结果已复制");
    } catch {
      elements.pageAiSentenceOutput.select();
      document.execCommand("copy");
      showToast("AI 断句结果已复制");
    }
  }
);
elements.usePageAiSentenceOutputButton.addEventListener("click", () => {
  const text = elements.pageAiSentenceOutput.value.trim();
  if (!text) {
    showToast("尚无可采用的 AI 断句结果", "error");
    return;
  }
  setMainText(text);
  appState.ocrCorrectedDirty = true;
  elements.ocrCorrectedText.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
  elements.ocrCorrectedText.focus();
  showToast("已采用为校订草稿；请人工复核后保存");
});
elements.translationEngineSelect.addEventListener("change", () => {
  appState.lastTranslationEngine = selectedTranslationEngine();
  appState.lastTranslationModel = "";
  renderTranslationSettings();
});
elements.translationSourceLanguage.addEventListener("change", () => {
  appState.lastTranslationModel = "";
  renderTranslationSettings();
});
elements.translationTargetLanguage.addEventListener("change", () => {
  appState.lastTranslationModel = "";
  renderTranslationSettings();
});
elements.checkEdgeTranslationButton.addEventListener(
  "click",
  checkEdgeTranslation
);
elements.checkArgosTranslationButton.addEventListener("click", () => {
  refreshArgosTranslationStatus(true);
});
elements.installArgosTranslationButton.addEventListener("click", () => {
  runArgosAction("install");
});
elements.downloadArgosModelButton.addEventListener("click", () => {
  runArgosAction("download-model");
});
elements.saveCloudTranslationSettingsButton.addEventListener(
  "click",
  saveCloudTranslationSettings
);
elements.clearCloudTranslationSettingsButton.addEventListener(
  "click",
  clearCloudTranslationSettings
);
elements.loadTranslationInputButton.addEventListener("click", () => {
  const text = currentPageTextForTranslation();
  if (!text) {
    showToast("当前页尚无可载入文本", "error");
    return;
  }
  elements.translationInput.value = text;
  showToast("已载入当前 OCR / 校订文本");
});
elements.runTranslationButton.addEventListener("click", runTranslation);
elements.copyTranslationOutputButton.addEventListener("click", async () => {
  const text = elements.translationOutput.value.trim();
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    showToast("译文已复制");
  } catch {
    elements.translationOutput.select();
    document.execCommand("copy");
    showToast("译文已复制");
  }
});
elements.saveTranslationRecordButton.addEventListener(
  "click",
  saveTranslationRecord
);
elements.translationRecordList.addEventListener("click", async (event) => {
  const loadButton = event.target.closest("[data-load-translation]");
  const copyButton = event.target.closest("[data-copy-translation]");
  const deleteButton = event.target.closest("[data-delete-translation]");
  if (loadButton) {
    loadTranslationRecord(loadButton.dataset.loadTranslation);
    return;
  }
  if (copyButton) {
    const file = selectedFile();
    const item = (file?.translations || []).find(
      (entry) => entry.id === copyButton.dataset.copyTranslation
    );
    if (!item) return;
    try {
      await navigator.clipboard.writeText(item.translatedText || "");
      showToast("译文已复制");
    } catch {
      showToast("浏览器未允许复制，请载入后手动复制", "error");
    }
    return;
  }
  if (deleteButton) {
    deleteTranslationRecord(deleteButton.dataset.deleteTranslation);
  }
});
elements.exportScreenshotPageButton.addEventListener("click", () => {
  exportScreenshot("page");
});
elements.exportScreenshotRegionButton.addEventListener("click", () => {
  exportScreenshot("region");
});
elements.chooseScreenshotFolderButton.addEventListener("click", () => {
  updateScreenshotFolder("choose");
});
elements.resetScreenshotFolderButton.addEventListener("click", () => {
  updateScreenshotFolder("reset");
});
elements.copyScreenshotExportPathButton.addEventListener("click", async () => {
  const exportPath = elements.screenshotExportPath.value.trim();
  if (!exportPath) {
    showToast("尚无可复制的导出路径", "error");
    return;
  }
  try {
    await navigator.clipboard.writeText(exportPath);
    showToast("导出路径已复制");
  } catch {
    elements.screenshotExportPath.select();
    document.execCommand("copy");
    showToast("导出路径已复制");
  }
});
elements.saveScreenshotPageTextButton.addEventListener("click", () => {
  saveScreenshotImportedText("page");
});
elements.saveScreenshotRegionTextButton.addEventListener("click", () => {
  saveScreenshotImportedText("region");
});
elements.saveCloudOcrSettingsButton.addEventListener(
  "click",
  saveCloudOcrSettings
);
elements.clearCloudOcrButtons.forEach((button) => {
  button.addEventListener("click", () => {
    clearCloudOcrSettings(button.dataset.clearCloudOcr);
  });
});
elements.refreshOcrServiceButtons.forEach((button) => {
  button.addEventListener("click", refreshOcrServiceStatus);
});
elements.manageOcrServiceButtons.forEach((button) => {
  button.addEventListener("click", manageOcrService);
});
elements.discardOcrPendingButton.addEventListener("click", discardPendingOcr);
elements.keepOcrPendingButton.addEventListener("click", keepPendingOcr);
elements.deleteOcrRegionButton.addEventListener(
  "click",
  deleteCurrentOcrRegion
);
elements.ocrRegionSelects.forEach((select) => {
  select.addEventListener("change", async () => {
    if (!(await confirmDiscardUnsavedCorrection())) {
      renderOcrWorkspace();
      return;
    }
    appState.manualCorrectedDraft = false;
    appState.selectedOcrRegionId = select.value || "";
    appState.ocrCorrectedDirty = false;
    renderOcrWorkspace();
  });
});
elements.copyOcrRawButton.addEventListener("click", async () => {
  const text = elements.ocrRawText.value;
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    showToast("OCR 原文已复制");
  } catch {
    elements.ocrRawText.select();
    document.execCommand("copy");
    showToast("OCR 原文已复制");
  }
});
elements.floatOcrRawButton.addEventListener("click", () => {
  openFloatingReader(
    "OCR 原文",
    elements.ocrRawStatus.textContent,
    elements.ocrRawText.value
  );
});
elements.floatOcrCorrectedButton.addEventListener("click", () => {
  const file = selectedFile();
  const entry = currentOcrRegion(
    file,
    normalizedOcrPage(appState.ocrPage)
  );
  const page = appState.ocrPage;
  openFloatingReader(
    "本页全文",
    `第 ${appState.ocrPage} 页`,
    entry?.correctedText || "",
    {
      editable: true,
      saveText: async (text) => {
        if (
          selectedFile()?.id !== file?.id ||
          appState.ocrPage !== page ||
          entry?.id !== currentOcrRegion()?.id
        ) {
          return false;
        }
        setMainText(text);
        appState.ocrCorrectedDirty = true;
        return saveOcrCorrected({ silent: true });
      },
    }
  );
});
elements.saveOcrCorrectedButton.addEventListener("click", saveOcrCorrected);
elements.useOcrAsCorrectionButton.addEventListener(
  "click",
  useOcrAsCorrection
);
elements.createManualCorrectedButton.addEventListener(
  "click",
  beginManualCorrectedDraft
);
elements.resetOcrCorrectedButton.addEventListener("click", resetOcrCorrected);
elements.ocrCorrectedText.addEventListener("input", () => {
  appState.ocrCorrectedDirty = true;
  const hasText = Boolean(mainTextPlain());
  elements.mainTextFloatButton.disabled = !hasText || appState.busy;
  elements.mainTextAiButton.disabled = !hasText || appState.busy;
  elements.mainTextTranslationButton.disabled = !hasText || appState.busy;
  elements.mainTextClearButton.disabled = !hasText || appState.busy;
});
elements.ocrReferenceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appState.ocrReferenceType =
      button.dataset.ocrReference === "raw" ? "raw" : "corrected";
    renderOcrWorkspace();
  });
});
elements.quoteOcrSelectionButton.addEventListener(
  "click",
  quoteSelectedOcrText
);
elements.ocrReferenceFontDownButton.addEventListener("click", () => {
  changeOcrReferenceFontSize(-1);
});
elements.ocrReferenceFontUpButton.addEventListener("click", () => {
  changeOcrReferenceFontSize(1);
});
elements.floatOcrReferenceButton.addEventListener("click", () => {
  openFloatingReader(
    "对照文本",
    elements.ocrReferenceStatus.textContent,
    elements.ocrReferenceText.textContent
  );
});
elements.floatingReaderFontDown.addEventListener("click", () => {
  changeFloatingReaderFontSize(-1);
});
elements.floatingReaderFontUp.addEventListener("click", () => {
  changeFloatingReaderFontSize(1);
});
elements.pinFloatingReaderButton.addEventListener(
  "click",
  pinFloatingReaderToScreen
);
elements.closeFloatingReaderButton.addEventListener("click", () => {
  flushFloatingReaderEdit();
  elements.floatingReader.classList.add("hidden");
});
elements.floatingReaderText.addEventListener("input", () => {
  updateFloatingReaderText(elements.floatingReaderText.innerText);
});
elements.floatingReaderText.addEventListener("keydown", (event) => {
  handleFloatingReaderUndo(event, elements.floatingReaderText);
});
window.historicalWorkbenchDesktop?.onFloatingReaderEdit?.((payload = {}) => {
  if (String(payload.readerId || "") !== floatingReaderState.readerId) return;
  if (updateFloatingReaderText(payload.text)) renderFloatingReader();
});
elements.floatingReaderHeader.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button")) return;
  const bounds = elements.floatingReader.getBoundingClientRect();
  floatingReaderState.dragging = true;
  floatingReaderState.pointerId = event.pointerId;
  floatingReaderState.startX = event.clientX;
  floatingReaderState.startY = event.clientY;
  floatingReaderState.originLeft = bounds.left;
  floatingReaderState.originTop = bounds.top;
  elements.floatingReader.style.right = "auto";
  elements.floatingReader.style.left = `${bounds.left}px`;
  elements.floatingReader.style.top = `${bounds.top}px`;
  elements.floatingReaderHeader.setPointerCapture?.(event.pointerId);
});
document.addEventListener("pointermove", (event) => {
  if (
    !floatingReaderState.dragging ||
    event.pointerId !== floatingReaderState.pointerId
  ) {
    return;
  }
  const width = elements.floatingReader.offsetWidth;
  const height = elements.floatingReader.offsetHeight;
  const left = Math.min(
    Math.max(
      0,
      floatingReaderState.originLeft +
        event.clientX -
        floatingReaderState.startX
    ),
    Math.max(0, window.innerWidth - width)
  );
  const top = Math.min(
    Math.max(
      0,
      floatingReaderState.originTop +
        event.clientY -
        floatingReaderState.startY
    ),
    Math.max(0, window.innerHeight - height)
  );
  elements.floatingReader.style.left = `${left}px`;
  elements.floatingReader.style.top = `${top}px`;
});
function stopFloatingReaderDrag(event) {
  if (
    !floatingReaderState.dragging ||
    event.pointerId !== floatingReaderState.pointerId
  ) {
    return;
  }
  floatingReaderState.dragging = false;
  floatingReaderState.pointerId = null;
}
document.addEventListener("pointerup", stopFloatingReaderDrag);
document.addEventListener("pointercancel", stopFloatingReaderDrag);

elements.closeAnnotationFloatingEditor.addEventListener(
  "click",
  closeAnnotationFloatingEditorWindow
);
elements.annotationFloatingEditorText.addEventListener(
  "input",
  queueAnnotationFloatingEditorSync
);
elements.annotationFloatingEditorRecord.addEventListener("click", () => {
  if (annotationFloatingEditorState.annotationId) {
    openAnnotationRecordEditor(annotationFloatingEditorState.annotationId);
  }
});
elements.annotationSearchInput.addEventListener("input", () => {
  annotationListState.query = elements.annotationSearchInput.value;
  annotationListState.page = 1;
  renderResearchNotes();
});
elements.closeAnnotationRecordModal.addEventListener("click", () => {
  closeAnnotationRecordEditor();
});
elements.cancelAnnotationRecordEdit.addEventListener("click", () => {
  closeAnnotationRecordEditor();
});
elements.saveAnnotationRecordEdit.addEventListener(
  "click",
  saveAnnotationRecordEditor
);
elements.annotationRecordEditor.addEventListener("input", () => {
  elements.annotationRecordEditorStatus.textContent = annotationRecordEditorDirty()
    ? "有尚未保存的修改"
    : "记录将完整显示，并可参与搜索";
});
elements.annotationRecordEditor.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.ctrlKey && !event.isComposing) {
    event.preventDefault();
    saveAnnotationRecordEditor();
  }
});
elements.annotationRecordModal.addEventListener("click", (event) => {
  if (event.target === elements.annotationRecordModal) {
    closeAnnotationRecordEditor();
  }
});
document
  .querySelectorAll(
    ".annotation-floating-format-toolbar button"
  )
  .forEach((button) => {
    button.addEventListener("pointerdown", (event) => {
      rememberRichTextSelection(elements.annotationFloatingEditorText);
      event.preventDefault();
    });
  });
elements.annotationFloatingFontDown.addEventListener("click", () => {
  annotationFloatingFormatSize = normalizedTextFontSize(
    selectedRichTextFontSize(
      elements.annotationFloatingEditorText,
      annotationFloatingFormatSize
    ) - 1
  );
  applyRichTextSize(
    elements.annotationFloatingEditorText,
    annotationFloatingFormatSize
  );
  renderAnnotationFloatingFormatSize();
  queueAnnotationFloatingEditorSync();
});
elements.annotationFloatingFontUp.addEventListener("click", () => {
  annotationFloatingFormatSize = normalizedTextFontSize(
    selectedRichTextFontSize(
      elements.annotationFloatingEditorText,
      annotationFloatingFormatSize
    ) + 1
  );
  applyRichTextSize(
    elements.annotationFloatingEditorText,
    annotationFloatingFormatSize
  );
  renderAnnotationFloatingFormatSize();
  queueAnnotationFloatingEditorSync();
});
elements.annotationFloatingBold.addEventListener("click", () => {
  applyRichTextSelectionFormat(elements.annotationFloatingEditorText, {
    bold: "toggle",
  });
  queueAnnotationFloatingEditorSync();
});
elements.annotationFloatingTranslation.addEventListener(
  "click",
  runAnnotationFloatingTranslation
);
document
  .querySelectorAll("[data-annotation-floating-color]")
  .forEach((button) => {
    button.addEventListener("click", () => {
      applyRichTextColor(
        elements.annotationFloatingEditorText,
        button.dataset.annotationFloatingColor
      );
      queueAnnotationFloatingEditorSync();
    });
  });
elements.deleteAnnotationFloatingEditor.addEventListener(
  "click",
  deleteAnnotationFromFloatingEditor
);
elements.annotationFloatingEditorHeader.addEventListener(
  "pointerdown",
  (event) => {
    if (event.target.closest("button, input")) return;
    const bounds = elements.annotationFloatingEditor.getBoundingClientRect();
    annotationFloatingEditorState.dragging = true;
    annotationFloatingEditorState.pointerId = event.pointerId;
    annotationFloatingEditorState.startX = event.clientX;
    annotationFloatingEditorState.startY = event.clientY;
    annotationFloatingEditorState.originLeft = bounds.left;
    annotationFloatingEditorState.originTop = bounds.top;
    elements.annotationFloatingEditor.style.right = "auto";
    elements.annotationFloatingEditor.style.left = `${bounds.left}px`;
    elements.annotationFloatingEditor.style.top = `${bounds.top}px`;
    elements.annotationFloatingEditorHeader.setPointerCapture?.(event.pointerId);
  }
);
document.addEventListener("pointermove", (event) => {
  if (
    !annotationFloatingEditorState.dragging ||
    event.pointerId !== annotationFloatingEditorState.pointerId
  ) {
    return;
  }
  const width = elements.annotationFloatingEditor.offsetWidth;
  const height = elements.annotationFloatingEditor.offsetHeight;
  const left = Math.min(
    Math.max(
      0,
      annotationFloatingEditorState.originLeft +
        event.clientX -
        annotationFloatingEditorState.startX
    ),
    Math.max(0, window.innerWidth - width)
  );
  const top = Math.min(
    Math.max(
      0,
      annotationFloatingEditorState.originTop +
        event.clientY -
        annotationFloatingEditorState.startY
    ),
    Math.max(0, window.innerHeight - height)
  );
  elements.annotationFloatingEditor.style.left = `${left}px`;
  elements.annotationFloatingEditor.style.top = `${top}px`;
});
function stopAnnotationFloatingEditorDrag(event) {
  if (
    !annotationFloatingEditorState.dragging ||
    event.pointerId !== annotationFloatingEditorState.pointerId
  ) {
    return;
  }
  annotationFloatingEditorState.dragging = false;
  annotationFloatingEditorState.pointerId = null;
}
document.addEventListener("pointerup", stopAnnotationFloatingEditorDrag);
document.addEventListener("pointercancel", stopAnnotationFloatingEditorDrag);

elements.sortSelect.addEventListener("change", () => {
  appState.sortMode = elements.sortSelect.value || "default";
  rememberSortMode();
  refreshFilteredFiles(appState.selectedId, appState.selectedIndex);
  const label =
    elements.sortSelect.options[elements.sortSelect.selectedIndex]?.textContent ||
    "默认顺序";
  setStatus(`史料列表已切换为：${label}`);
});

elements.importReviewButton.addEventListener("click", openImportReview);
elements.closeImportReviewButton.addEventListener("click", closeImportReview);
elements.closeImportReviewFooterButton.addEventListener("click", closeImportReview);
elements.importReviewModal.addEventListener("click", (event) => {
  if (event.target === elements.importReviewModal) closeImportReview();
});
elements.confirmReadyButton.addEventListener("click", () => {
  const items = [...elements.importReviewList.querySelectorAll(".import-row")]
    .filter((row) => row.dataset.reviewStatus === "ready")
    .map(importItemFromRow);
  confirmImportItems(items);
});
elements.reparseButton.addEventListener("click", reparseFilenames);

elements.folderImportButton.addEventListener("click", openFolderImport);
elements.closeFolderImportButton.addEventListener(
  "click",
  closeFolderImport
);
elements.closeFolderImportFooterButton.addEventListener(
  "click",
  closeFolderImport
);
elements.folderImportModal.addEventListener("click", (event) => {
  if (event.target === elements.folderImportModal) closeFolderImport();
});
elements.chooseImportSourceFolderButton.addEventListener(
  "click",
  chooseFolderImportSource
);
elements.chooseImportSourceFilesButton.addEventListener(
  "click",
  chooseFolderImportFiles
);
elements.folderImportBrowserPicker.addEventListener("change", async (event) => {
  const files = event.target.files;
  if (!files?.length) {
    setStatus("已取消选择导入文件夹");
    return;
  }
  await ensureFolderImportProject();
  prepareBrowserFolderImport(files);
});
elements.folderImportBrowserFilePicker.addEventListener(
  "change",
  async (event) => {
    const files = event.target.files;
    if (!files?.length) {
      setStatus("已取消选择导入文件");
      return;
    }
    await ensureFolderImportProject();
    prepareBrowserFolderImport(files);
  }
);
elements.selectAllFolderImportItems.addEventListener("click", () => {
  appState.folderImport.selectedIds = new Set(
    appState.folderImport.items.map((item) => item.id)
  );
  renderFolderImportList();
});
elements.deselectAllFolderImportItems.addEventListener("click", () => {
  appState.folderImport.selectedIds.clear();
  renderFolderImportList();
  setStatus("已取消全部导入勾选；候选材料仍保留在清单中");
});
elements.clearFolderImportItems.addEventListener("click", () => {
  resetFolderImportScan();
  renderFolderImportList();
  setStatus("已清空全部导入候选；来源文件未被删除");
});
elements.folderImportProject.addEventListener("change", () => {
  renderFolderImportList();
});
elements.folderImportRecursive.addEventListener("change", () => {
  updateFolderImportControls();
});
elements.folderImportPreserveStructure.addEventListener("change", () => {
  renderFolderImportList();
});
elements.folderImportConflictPolicy.addEventListener("change", () => {
  updateFolderImportControls();
});
elements.commitFolderImportButton.addEventListener(
  "click",
  commitFolderImport
);

let importDragDepth = 0;
function hasDraggedFiles(event) {
  return Array.from(event.dataTransfer?.types || []).includes("Files");
}
document.addEventListener("dragenter", (event) => {
  if (!hasDraggedFiles(event)) return;
  event.preventDefault();
  importDragDepth += 1;
  elements.globalImportDropOverlay.classList.remove("hidden");
});
document.addEventListener("dragover", (event) => {
  if (!hasDraggedFiles(event)) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
});
document.addEventListener("dragleave", (event) => {
  if (!hasDraggedFiles(event)) return;
  importDragDepth = Math.max(0, importDragDepth - 1);
  if (!importDragDepth) {
    elements.globalImportDropOverlay.classList.add("hidden");
  }
});
document.addEventListener("drop", async (event) => {
  if (!hasDraggedFiles(event)) return;
  event.preventDefault();
  importDragDepth = 0;
  elements.globalImportDropOverlay.classList.add("hidden");
  const files = Array.from(event.dataTransfer?.files || []);
  if (!files.length) return;
  openFolderImport();
  const resolver = window.historicalWorkbenchDesktop?.pathForFile;
  const paths =
    typeof resolver === "function"
      ? WorkbenchUiRules.collectDropPaths(files, resolver)
      : [];
  if (paths.length) {
    await scanFolderImportPaths(paths);
  } else {
    await ensureFolderImportProject();
    prepareBrowserFolderImport(files);
  }
});

elements.exportNavButton.addEventListener("click", openTextExport);
elements.closeTextExportButton.addEventListener("click", closeTextExport);
elements.closeTextExportFooterButton.addEventListener(
  "click",
  closeTextExport
);
elements.textExportModal.addEventListener("click", (event) => {
  if (event.target === elements.textExportModal) closeTextExport();
});
elements.textExportProjectFilter.addEventListener(
  "change",
  renderTextExportMaterials
);
elements.textExportSearchInput.addEventListener(
  "input",
  renderTextExportMaterials
);
elements.selectVisibleTextExportItems.addEventListener("click", () => {
  filteredTextExportFiles().forEach((file) =>
    appState.textExportSelectedIds.add(file.id)
  );
  renderTextExportMaterials();
});
elements.clearTextExportItems.addEventListener("click", () => {
  appState.textExportSelectedIds.clear();
  renderTextExportMaterials();
});
elements.textExportScopeInputs.forEach((input) => {
  input.addEventListener("change", updateTextExportControls);
});
elements.textExportFormat.addEventListener(
  "change",
  updateTextExportControls
);
elements.textExportFilename.addEventListener(
  "input",
  updateTextExportControls
);
elements.chooseTextExportFolderButton.addEventListener(
  "click",
  chooseTextExportFolder
);
elements.resetTextExportFolderButton.addEventListener(
  "click",
  resetTextExportFolder
);
elements.downloadTextExportButton.addEventListener(
  "click",
  downloadTextExport
);

elements.timelineButton.addEventListener("click", () => {
  setLibraryDrawer(false);
  setFocusReading(false);
  openTimeline();
});
elements.closeTimelineButton.addEventListener("click", closeTimeline);
elements.timelineModal.addEventListener("click", (event) => {
  if (event.target === elements.timelineModal) closeTimeline();
});
elements.workspaceNavButton.addEventListener("click", () => {
  closeTimeline();
  closeAiSuggestion();
  closeHistory();
  closeFolderImport();
  closeTextExport();
  setFocusReading(false);
  setLibraryDrawer(!appState.libraryDrawerOpen);
  setActiveRailButton(elements.workspaceNavButton);
});
elements.workspaceContextDeleteButton.addEventListener("click", () => {
  const target = { ...workspaceContextTarget };
  closeWorkspaceContextMenu();
  if (target.type === "project") {
    deleteProjectPermanently(target.project);
  } else if (target.type === "files") {
    deleteBatchSelectedFilesPermanently();
  } else if (target.type === "file") {
    deleteSelectedFilePermanently();
  }
});
document.addEventListener("pointerdown", (event) => {
  if (
    !elements.workspaceContextMenu.classList.contains("hidden") &&
    !elements.workspaceContextMenu.contains(event.target)
  ) {
    closeWorkspaceContextMenu();
  }
});
window.addEventListener("blur", closeWorkspaceContextMenu);
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    !elements.searchScopePopover.classList.contains("hidden")
  ) {
    elements.searchScopePopover.classList.add("hidden");
    elements.searchScopeButton.setAttribute("aria-expanded", "false");
    elements.searchScopeButton.focus();
    return;
  }
  if (
    event.key === "Escape" &&
    !elements.annotationRecordModal.classList.contains("hidden")
  ) {
    event.preventDefault();
    closeAnnotationRecordEditor();
    return;
  }
  if (
    event.key === "Escape" &&
    !elements.workspaceContextMenu.classList.contains("hidden")
  ) {
    closeWorkspaceContextMenu();
  }
});
document.addEventListener("keydown", (event) => {
  if (
    event.key !== "Delete" ||
    event.repeat ||
    !appState.batchSelectedFileIds.size ||
    !elements.fileList.contains(document.activeElement)
  ) {
    return;
  }
  event.preventDefault();
  deleteBatchSelectedFilesPermanently();
});
elements.libraryDrawerBackdrop.addEventListener("click", () =>
  setLibraryDrawer(false)
);
elements.focusReadingButton.addEventListener("click", () =>
  setFocusReading(!appState.focusReading)
);
elements.previousMaterialButton.addEventListener("click", () => {
  const targetIndex = adjacentMaterialIndex(-1);
  if (targetIndex < 0 || targetIndex === appState.selectedIndex) return;
  selectFile(targetIndex);
});
elements.nextMaterialButton.addEventListener("click", () => {
  const targetIndex = adjacentMaterialIndex(1);
  if (targetIndex < 0 || targetIndex === appState.selectedIndex) return;
  selectFile(targetIndex);
});
elements.mainTextFloatButton.addEventListener("click", floatCurrentMainText);
elements.mainTextOcrButton.addEventListener("click", recognizeCurrentOcr);
elements.mainTextAiButton.addEventListener("click", runMainTextAiSentence);
elements.mainTextTranslationButton.addEventListener(
  "click",
  runMainTextTranslation
);
elements.mainTextClearButton.addEventListener("click", async () => {
  if (appState.busy || !mainTextPlain()) return;
  if (
    !(await confirmAction(
      "确定清除本页全文编辑框中的文字吗？尚未保存的修改将被移除。"
    ))
  ) {
    return;
  }
  appState.pendingMainTextTranslation = null;
  setMainText("", []);
  appState.ocrCorrectedDirty = true;
  elements.mainTextFloatButton.disabled = true;
  elements.mainTextAiButton.disabled = true;
  elements.mainTextTranslationButton.disabled = true;
  elements.mainTextClearButton.disabled = true;
  elements.ocrCorrectedText.focus();
  setStatus("本页全文编辑框已清空；点击“保存本页全文”后才会写入资料库。");
});
elements.ocrSurfaceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appState.ocrSurface = button.dataset.ocrSurface;
    renderWorkspaceLayout();
  });
});
elements.notesSurfaceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appState.notesSurface = button.dataset.notesSurface;
    renderWorkspaceLayout();
  });
});
elements.aiSuggestionNavButton.addEventListener("click", () => {
  setLibraryDrawer(false);
  setFocusReading(false);
  openAiSuggestion();
});
elements.favoriteWebsitesNavButton.addEventListener(
  "click",
  openFavoriteWebsites
);
elements.historyNavButton.addEventListener("click", openHistory);
elements.colorThemeButton.addEventListener("click", () => {
  const currentTheme = normalizedColorTheme(
    document.documentElement.dataset.colorTheme
  );
  applyColorTheme(currentTheme === "cyan" ? "blue" : "cyan", true);
});
elements.closeHistoryButton.addEventListener("click", closeHistory);
elements.closeFavoriteWebsitesButton.addEventListener(
  "click",
  closeFavoriteWebsites
);
elements.cancelFavoriteWebsiteEditButton.addEventListener(
  "click",
  resetFavoriteWebsiteEditor
);
elements.saveFavoriteWebsiteButton.addEventListener(
  "click",
  saveFavoriteWebsite
);
elements.showFavoriteWebsiteEditorButton.addEventListener("click", () => {
  resetFavoriteWebsiteEditor();
  elements.favoriteWebsiteEditor.classList.remove("hidden");
  elements.favoriteWebsiteUrlInput.focus();
});
elements.favoriteWebsiteSearchInput.addEventListener("input", () => {
  appState.favoriteWebsiteQuery = elements.favoriteWebsiteSearchInput.value;
  renderFavoriteWebsites();
});
elements.showFavoriteCategoryEditorButton.addEventListener("click", () => {
  elements.favoriteCategoryManager.classList.remove("hidden");
  elements.favoriteCategoryNameInput.focus();
});
elements.cancelFavoriteCategoryButton.addEventListener("click", () => {
  elements.favoriteCategoryNameInput.value = "";
  elements.favoriteCategoryManager.classList.add("hidden");
});
elements.addFavoriteCategoryButton.addEventListener(
  "click",
  addFavoriteWebsiteCategory
);
elements.favoriteCategoryNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.isComposing) {
    event.preventDefault();
    addFavoriteWebsiteCategory();
  }
});
[elements.favoriteWebsiteNameInput, elements.favoriteWebsiteUrlInput].forEach(
  (input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.isComposing) {
        event.preventDefault();
        saveFavoriteWebsite();
      }
    });
  }
);
elements.favoriteWebsitesModal.addEventListener("click", (event) => {
  if (event.target === elements.favoriteWebsitesModal) closeFavoriteWebsites();
});
elements.historyModal.addEventListener("click", (event) => {
  if (event.target === elements.historyModal) closeHistory();
});
elements.historySearchInput.addEventListener("input", () => {
  appState.historyQuery = elements.historySearchInput.value;
  renderHistoryRecords();
});
elements.closeAiSuggestionButton.addEventListener("click", closeAiSuggestion);
elements.toggleAiBuilderButton.addEventListener("click", () => {
  appState.aiBuilderOpen = !appState.aiBuilderOpen;
  renderWorkspaceLayout();
});
elements.aiSuggestionModal.addEventListener("click", (event) => {
  if (event.target === elements.aiSuggestionModal) closeAiSuggestion();
});
elements.aiSuggestionRightTabs.forEach((button) => {
  button.addEventListener("click", () => {
    switchAiSuggestionRightPanel(button.dataset.aiRightPanel);
  });
});
elements.aiChatProviderSelect.addEventListener("change", () => {
  elements.aiChatConsent.checked = false;
  renderAiChat();
});
elements.aiChatFontDown.addEventListener("click", () =>
  setAiChatFontSize(aiChatFontSize - 1)
);
elements.aiChatFontUp.addEventListener("click", () =>
  setAiChatFontSize(aiChatFontSize + 1)
);
elements.aiChatFontSize.addEventListener("change", () =>
  setAiChatFontSize(elements.aiChatFontSize.value)
);
elements.aiChatQuestionInput.addEventListener("input", () => {
  elements.aiChatConsent.checked = false;
  renderAiChat();
});
elements.aiChatConsent.addEventListener("change", renderAiChat);
elements.sendAiChatButton.addEventListener("click", sendAiChatQuestion);
elements.clearAiChatButton.addEventListener("click", clearAiChat);
elements.aiSuggestionSearchInput.addEventListener(
  "input",
  renderAiSuggestionMaterials
);
elements.aiSuggestionKindFilters.forEach((input) => {
  input.addEventListener("change", renderAiSuggestionMaterials);
});
elements.selectVisibleAiMaterialsButton.addEventListener("click", () => {
  const visible = visibleAiSuggestionFiles();
  for (const file of visible) {
    if (appState.aiSuggestionSelectedIds.size >= 20) break;
    appState.aiSuggestionSelectedIds.add(file.id);
  }
  elements.aiSuggestionConsent.checked = false;
  elements.aiChatConsent.checked = false;
  renderAiSuggestionMaterials();
  renderAiSuggestionPreview();
  renderAiChat();
  if (visible.length > 20) {
    showToast("已按列表顺序勾选前 20 份材料");
  }
});
elements.clearAiMaterialsButton.addEventListener("click", () => {
  appState.aiSuggestionSelectedIds.clear();
  elements.aiSuggestionConsent.checked = false;
  elements.aiChatConsent.checked = false;
  renderAiSuggestionWorkspace();
});
[
  elements.aiSuggestionIncludeMetadata,
  elements.aiSuggestionIncludeOcr,
  elements.aiSuggestionIncludeAnnotations,
  elements.aiSuggestionIncludeNotes,
  elements.aiSuggestionIncludeTranslations,
  elements.aiSuggestionTextLimit,
  elements.aiSuggestionProviderSelect,
  ...elements.aiSuggestionTypeInputs,
].forEach((control) => {
  control.addEventListener("change", () => {
    elements.aiSuggestionConsent.checked = false;
    elements.aiChatConsent.checked = false;
    renderAiSuggestionPreview();
    renderAiChat();
  });
});
elements.aiSuggestionConsent.addEventListener(
  "change",
  renderAiSuggestionPreview
);
elements.generateAiSuggestionButton.addEventListener(
  "click",
  generateAiSuggestion
);
elements.selectAllTimelineProjects.addEventListener("click", () => {
  appState.timelineProjects = timelineProjectNames();
  renderTimelineProjectOptions();
  renderTimeline();
});
elements.clearTimelineProjects.addEventListener("click", () => {
  appState.timelineProjects = [];
  renderTimelineProjectOptions();
  renderTimeline();
});
elements.timelineKindOptions.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    appState.timelineKinds = elements.timelineKindOptions
      .filter((input) => input.checked)
      .map((input) => input.value);
    renderTimeline();
  });
});
elements.timelineSearchInput.addEventListener("input", () => {
  appState.timelineQuery = elements.timelineSearchInput.value;
  renderTimeline();
});
elements.timelineOrderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appState.timelineOrder =
      button.dataset.timelineOrder === "desc" ? "desc" : "asc";
    elements.timelineOrderButtons.forEach((item) => {
      item.classList.toggle(
        "active",
        item.dataset.timelineOrder === appState.timelineOrder
      );
    });
    renderTimeline();
  });
});

elements.paperMenuButton.addEventListener("click", togglePaperMenu);
elements.paperInput.addEventListener("focus", openPaperMenu);
elements.paperInput.addEventListener("input", () => {
  openPaperMenu();
  updateFilenamePreview();
});
elements.paperInput.addEventListener("keydown", handlePaperKeyboard);
elements.editionMenuButton.addEventListener("click", toggleEditionMenu);
elements.editionNumberInput.addEventListener("focus", openEditionMenu);
elements.editionNumberInput.addEventListener("input", () => {
  openEditionMenu();
  updateFilenamePreview();
});
elements.editionNumberInput.addEventListener("keydown", handleEditionKeyboard);
elements.editionUnitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appState.editingEditionUnit =
      button.dataset.editionUnit === "期" ? "期" : "版";
    renderEditionUnit();
    updateFilenamePreview();
  });
});
elements.issueMenuButton.addEventListener("click", toggleIssueMenu);
elements.issueNumberInput.addEventListener("focus", openIssueMenu);
elements.issueNumberInput.addEventListener("input", () => {
  openIssueMenu();
  updateFilenamePreview();
});
elements.issueNumberInput.addEventListener("keydown", handleIssueKeyboard);
elements.issueUnitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appState.editingIssueUnit =
      button.dataset.issueUnit === "卷" ? "卷" : "期";
    renderIssueUnit();
    updateFilenamePreview();
  });
});

document.querySelectorAll(".date-menu-button").forEach((button) => {
  button.addEventListener("click", () => toggleDateMenu(button.dataset.dateType));
});
for (const type of ["year", "month", "day"]) {
  dateInputs[type].addEventListener("focus", () => openDateMenu(type, true));
  dateInputs[type].addEventListener("input", (event) => {
    if (!event.isComposing) handleDateTyping(type);
  });
  dateInputs[type].addEventListener("compositionend", () =>
    handleDateTyping(type)
  );
  dateInputs[type].addEventListener("keydown", (event) =>
    handleDateKeyboard(type, event)
  );
}

document.addEventListener("click", (event) => {
  if (!elements.paperCombobox.contains(event.target)) closePaperMenu();
  if (!elements.editionCombobox.contains(event.target)) closeEditionMenu();
  if (!elements.issueCombobox.contains(event.target)) closeIssueMenu();
  const insideDate = Object.values(dateComboboxes).some((box) =>
    box.contains(event.target)
  );
  if (!insideDate) closeDateMenus();
});

elements.renameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renameCurrent(true);
});
elements.saveButton.addEventListener("click", () => renameCurrent(false));
elements.undoButton.addEventListener("click", undoLast);
elements.readingStatusButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appState.editingStatus =
      button.dataset.readingStatus === "organized" ? "organized" : "unread";
    renderReadingStatus();
  });
});

elements.sourceLanguageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    saveSourceLanguageImmediately(button.dataset.sourceLanguage);
  });
});

elements.recordKindButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextKind = button.dataset.recordKind || "source";
    if (nextKind === "paper" && appState.editingKind !== "paper") {
      if (!elements.paperAuthorInput.value) {
        elements.paperAuthorInput.value = elements.authorInput.value;
      }
      if (!elements.paperTitleInput.value) {
        elements.paperTitleInput.value = elements.titleInput.value;
      }
      if (!elements.paperYearInput.value && elements.yearInput.value) {
        elements.paperYearInput.value = elements.yearInput.value;
        elements.paperMonthInput.value = elements.monthInput.value;
        elements.paperDayInput.value = elements.dayInput.value;
      }
    }
    if (nextKind === "book") {
      if (!elements.bookAuthorInput.value) {
        elements.bookAuthorInput.value =
          elements.authorInput.value || elements.paperAuthorInput.value || "";
      }
      if (!elements.bookTitleInput.value) {
        elements.bookTitleInput.value =
          elements.titleInput.value || elements.paperTitleInput.value || "";
      }
      if (!elements.bookYearInput.value) {
        elements.bookYearInput.value =
          elements.yearInput.value || elements.paperYearInput.value || "";
        elements.bookMonthInput.value =
          elements.monthInput.value || elements.paperMonthInput.value || "";
        elements.bookDayInput.value =
          elements.dayInput.value || elements.paperDayInput.value || "";
      }
    }
    appState.editingKind = nextKind;
    renderKindEditor();
    renderDetailsView();
    renderResearchNotes();
  });
});

elements.paperTypeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appState.editingPaperType =
      button.dataset.paperType === "thesis" ? "thesis" : "journal";
    renderKindEditor();
  });
});

[
  elements.titleInput,
  elements.authorInput,
  elements.paperInput,
  elements.paperAuthorInput,
  elements.paperTitleInput,
  elements.journalInput,
  elements.issueNumberInput,
  elements.degreeSelect,
  elements.institutionInput,
  elements.paperYearInput,
  elements.paperMonthInput,
  elements.paperDayInput,
  elements.bookAuthorInput,
  elements.bookTitleInput,
  elements.bookPlaceInput,
  elements.bookPublisherInput,
  elements.bookYearInput,
  elements.bookMonthInput,
  elements.bookDayInput,
].forEach((input) => input.addEventListener("input", updateFilenamePreview));

elements.tagAddButton.addEventListener("click", () => {
  addTagsFromInput();
  elements.tagInput.focus({ preventScroll: true });
});
elements.tagInput.addEventListener("input", () => {
  if (/[,，]/.test(elements.tagInput.value)) addTagsFromInput();
});
elements.tagInput.addEventListener("keydown", (event) => {
  if (event.isComposing) return;
  if (event.key === "Enter" || event.key === " " || event.key === ",") {
    event.preventDefault();
    addTagsFromInput();
    return;
  }
  if (
    event.key === "Backspace" &&
    !elements.tagInput.value &&
    appState.editingTags.length
  ) {
    appState.editingTags.pop();
    renderTagChips();
  }
});

elements.annotationModeButton.addEventListener("click", async (event) => {
  event.stopPropagation();
  if (annotationState.editId) cancelAnnotationEdit(false);
  if (annotationState.draft) {
    showToast("请先保存或取消当前框选", "error");
    return;
  }
  if (!annotationState.active && appState.previewKind === "pdf") {
    try {
      setStatus(`正在把 PDF 第 ${annotationPage()} 页转换为可截图框选图像…`);
      await showPdfSelectionPage(annotationPage());
    } catch (error) {
      showToast(`无法生成 PDF 截图式框选页：${error.message}`, "error");
      setStatus(error.message);
      return;
    }
  }
  annotationState.purpose =
    appState.detailsView === "screenshot-storage"
      ? "screenshot"
      : "annotation";
  setAnnotationMode(!annotationState.active);
});

elements.annotationPanButton.addEventListener("click", async (event) => {
  event.stopPropagation();
  const leavingMoveMode =
    Boolean(appState.previewKind && imageView.active) &&
    !annotationState.active;
  setAnnotationMode(false);
  if (appState.previewKind === "pdf") {
    if (leavingMoveMode) {
      hidePdfSelectionPage();
      resetImageView(true);
      elements.zoomHint.textContent =
        "连续阅读：滚轮上下浏览全部页面；当前页会自动记录，框选时不会返回第一页";
      elements.previewStage.focus({ preventScroll: true });
      return;
    }
    try {
      setStatus(`正在准备 PDF 第 ${annotationPage()} 页移动视图…`);
      await showPdfSelectionPage(annotationPage());
    } catch (error) {
      showToast(`无法生成当前 PDF 页面：${error.message}`, "error");
      setStatus(error.message);
      return;
    }
    imageView.active = true;
    applyImageView();
    elements.zoomHint.textContent =
      "移动模式：滚轮缩放 · 按住鼠标左键拖动；点击“框选区域”继续画框";
    elements.previewStage.focus({ preventScroll: true });
    return;
  }
  if (leavingMoveMode) {
    imageView.active = false;
    imageView.dragging = false;
    imageView.pointerId = null;
    applyImageView();
    elements.zoomHint.textContent =
      appState.previewKind === "pdf"
        ? "普通模式：滚轮翻阅 PDF · 点击“框选区域”生成当前页截图并框选"
        : "单击图片后滚轮缩放 · 放大后按住鼠标拖动";
    elements.previewStage.focus({ preventScroll: true });
    return;
  }
  imageView.active = true;
  applyImageView();
  elements.zoomHint.textContent =
    "移动模式：滚轮缩放 · 按住鼠标左键拖动；点击“框选区域”继续画框";
  elements.previewStage.focus({ preventScroll: true });
});

elements.annotationColorButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    annotationState.color = button.dataset.annotationColor || "red";
    elements.annotationColorButtons.forEach((item) =>
      item.classList.toggle(
        "active",
        item.dataset.annotationColor === annotationState.color
      )
    );
  });
});

elements.previousAnnotationPageButton.addEventListener("click", (event) => {
  event.stopPropagation();
  stepPdfAnnotationPage(-1);
});
elements.nextAnnotationPageButton.addEventListener("click", (event) => {
  event.stopPropagation();
  stepPdfAnnotationPage(1);
});
elements.annotationPageInput.addEventListener("change", () => {
  setAnnotationMode(false);
  goToPdfAnnotationPage();
});
elements.annotationPageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    setAnnotationMode(false);
    goToPdfAnnotationPage();
  }
});

elements.cancelAnnotationDraftButton.addEventListener("click", () => {
  cancelAnnotationDraft();
  setAnnotationMode(false);
});
elements.saveAnnotationDraftButton.addEventListener("click", () =>
  saveAnnotationDraft(false)
);
elements.recognizeAnnotationDraftButton.addEventListener("click", () => {
  if (annotationState.draft) {
    saveAnnotationDraft(true);
  }
});
elements.cancelAnnotationEditButton.addEventListener("click", () =>
  cancelAnnotationEdit(true)
);
elements.saveAnnotationEditButton.addEventListener("click", saveAnnotationEdit);
elements.addResearchNoteButton.addEventListener("click", addResearchNote);
elements.researchNoteInput.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    event.preventDefault();
    addResearchNote();
  }
});
elements.annotationLayer.addEventListener("click", (event) => {
  if (annotationState.editId || annotationState.drawing) return;
  const savedRect = event.target.closest(".annotation-rect[data-annotation-id]");
  if (!savedRect) return;
  event.preventDefault();
  event.stopPropagation();
  showAnnotationCardFromPreview(savedRect.dataset.annotationId);
});

elements.annotationLayer.addEventListener("pointerdown", (event) => {
  const editingRect = event.target.closest("[data-editing-annotation]");
  if (
    annotationState.editId &&
    editingRect?.dataset.annotationId === annotationState.editId &&
    event.button === 0
  ) {
    event.preventDefault();
    event.stopPropagation();
    const handle = event.target.closest("[data-resize-handle]");
    annotationState.editAction = handle
      ? `resize-${handle.dataset.resizeHandle}`
      : "move";
    annotationState.pointerId = event.pointerId;
    annotationState.editStartX = event.clientX;
    annotationState.editStartY = event.clientY;
    annotationState.editPointerRect = { ...annotationState.editRect };
    const editBounds = currentMediaViewport();
    const displayedScale = Math.max(0.01, Number(imageView.scale) || 1);
    annotationState.editBounds = {
      width: editBounds.width * displayedScale,
      height: editBounds.height * displayedScale,
    };
    if (elements.annotationLayer.setPointerCapture) {
      elements.annotationLayer.setPointerCapture(event.pointerId);
    }
    return;
  }
  const savedRect = event.target.closest(".annotation-rect[data-annotation-id]");
  if (savedRect && !annotationState.editId) {
    event.stopPropagation();
    return;
  }
  if (!annotationState.active || event.button !== 0) return;
  event.preventDefault();
  const bounds = elements.annotationLayer.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  annotationState.drawing = true;
  annotationState.pointerId = event.pointerId;
  annotationState.drawBounds = {
    left: bounds.left,
    top: bounds.top,
    width: bounds.width,
    height: bounds.height,
  };
  annotationState.startX = Math.min(
    1,
    Math.max(0, (event.clientX - bounds.left) / bounds.width)
  );
  annotationState.startY = Math.min(
    1,
    Math.max(0, (event.clientY - bounds.top) / bounds.height)
  );
  annotationState.draft = {
    page: annotationPage(),
    x: annotationState.startX,
    y: annotationState.startY,
    width: 0,
    height: 0,
    color: annotationState.color,
    text: "",
  };
  if (elements.annotationLayer.setPointerCapture) {
    elements.annotationLayer.setPointerCapture(event.pointerId);
  }
  renderAnnotationLayer();
});

elements.annotationLayer.addEventListener("pointermove", (event) => {
  if (
    annotationState.editAction &&
    event.pointerId === annotationState.pointerId &&
    annotationState.editPointerRect
  ) {
    event.preventDefault();
    const bounds = annotationState.editBounds;
    if (!bounds.width || !bounds.height) return;
    const dx = (event.clientX - annotationState.editStartX) / bounds.width;
    const dy = (event.clientY - annotationState.editStartY) / bounds.height;
    const original = annotationState.editPointerRect;
    const minimum = 0.01;
    if (annotationState.editAction === "move") {
      annotationState.editRect = {
        ...original,
        x: Math.min(1 - original.width, Math.max(0, original.x + dx)),
        y: Math.min(1 - original.height, Math.max(0, original.y + dy)),
      };
    } else {
      const handle = annotationState.editAction.replace("resize-", "");
      let left = original.x;
      let right = original.x + original.width;
      let top = original.y;
      let bottom = original.y + original.height;
      if (handle.includes("w")) {
        left = Math.min(right - minimum, Math.max(0, original.x + dx));
      }
      if (handle.includes("e")) {
        right = Math.max(left + minimum, Math.min(1, right + dx));
      }
      if (handle.includes("n")) {
        top = Math.min(bottom - minimum, Math.max(0, original.y + dy));
      }
      if (handle.includes("s")) {
        bottom = Math.max(top + minimum, Math.min(1, bottom + dy));
      }
      annotationState.editRect = {
        ...original,
        x: left,
        y: top,
        width: right - left,
        height: bottom - top,
      };
    }
    renderAnnotationLayer();
    return;
  }
  if (
    !annotationState.drawing ||
    event.pointerId !== annotationState.pointerId ||
    !annotationState.draft
  ) {
    return;
  }
  event.preventDefault();
  const bounds = annotationState.drawBounds;
  if (!bounds?.width || !bounds?.height) return;
  const currentX = Math.min(
    1,
    Math.max(0, (event.clientX - bounds.left) / bounds.width)
  );
  const currentY = Math.min(
    1,
    Math.max(0, (event.clientY - bounds.top) / bounds.height)
  );
  annotationState.draft.x = Math.min(annotationState.startX, currentX);
  annotationState.draft.y = Math.min(annotationState.startY, currentY);
  annotationState.draft.width = Math.abs(currentX - annotationState.startX);
  annotationState.draft.height = Math.abs(currentY - annotationState.startY);
  renderAnnotationLayer();
});

function finishAnnotationDraw(event) {
  if (
    !annotationState.drawing ||
    event.pointerId !== annotationState.pointerId ||
    !annotationState.draft
  ) {
    return;
  }
  annotationState.drawing = false;
  annotationState.pointerId = null;
  annotationState.drawBounds = null;
  if (
    elements.annotationLayer.hasPointerCapture &&
    elements.annotationLayer.hasPointerCapture(event.pointerId)
  ) {
    elements.annotationLayer.releasePointerCapture(event.pointerId);
  }
  if (
    annotationState.draft.width < 0.01 ||
    annotationState.draft.height < 0.01
  ) {
    cancelAnnotationDraft();
    showToast("框选范围太小，请重新拖动", "error");
    return;
  }
  setAnnotationMode(false);
  if (annotationState.purpose === "ocr") {
    const selection = { ...annotationState.draft };
    annotationState.draft = null;
    annotationState.purpose = "annotation";
    elements.annotationDraftEditor.classList.add("hidden");
    renderAnnotationLayer();
    appState.notesSurface = "annotations";
    switchDetailsView("notes");
    saveAutomaticAnnotation(selection);
    return;
  }
  if (annotationState.purpose === "screenshot") {
    const screenshotDraft = { ...annotationState.draft };
    annotationState.draft = null;
    annotationState.purpose = "annotation";
    elements.annotationDraftEditor.classList.add("hidden");
    renderAnnotationLayer();
    saveAutomaticAnnotation(screenshotDraft, {
      recognize: false,
      preserveScreenshotView: true,
    });
    return;
  }
  appState.notesSurface = "annotations";
  switchDetailsView("notes");
  elements.annotationDraftEditor.classList.add("hidden");
  const automaticDraft = { ...annotationState.draft };
  renderAnnotationLayer();
  saveAutomaticAnnotation(automaticDraft);
}

function finishAnnotationEditPointer(event) {
  if (
    !annotationState.editAction ||
    event.pointerId !== annotationState.pointerId
  ) {
    return;
  }
  annotationState.editAction = "";
  annotationState.editPointerRect = null;
  annotationState.editBounds = null;
  annotationState.pointerId = null;
  if (
    elements.annotationLayer.hasPointerCapture &&
    elements.annotationLayer.hasPointerCapture(event.pointerId)
  ) {
    elements.annotationLayer.releasePointerCapture(event.pointerId);
  }
  renderAnnotationLayer();
}

elements.annotationLayer.addEventListener("pointerup", finishAnnotationEditPointer);
elements.annotationLayer.addEventListener(
  "pointercancel",
  finishAnnotationEditPointer
);
elements.annotationLayer.addEventListener("pointerup", finishAnnotationDraw);
elements.annotationLayer.addEventListener("pointercancel", finishAnnotationDraw);

elements.previewStage.addEventListener("click", () => {
  if (annotationState.active) return;
  if (elements.imagePreview.classList.contains("hidden")) return;
  imageView.active = true;
  applyImageView();
  elements.previewStage.focus({ preventScroll: true });
});

elements.previewStage.addEventListener(
  "wheel",
  (event) => {
    if (!imageView.active || !appState.previewKind) return;
    event.preventDefault();
    const factor = event.deltaY < 0 ? 1.12 : 0.89;
    setImageZoom(imageView.scale * factor);
  },
  { passive: false }
);

elements.pdfContinuousPreview.addEventListener(
  "scroll",
  syncPdfContinuousCurrentPage,
  { passive: true }
);
elements.pdfContinuousPreview.addEventListener("click", (event) => {
  const savedRect = event.target.closest(
    ".pdf-continuous-annotation-layer .annotation-rect[data-annotation-id]"
  );
  if (!savedRect) return;
  event.preventDefault();
  event.stopPropagation();
  showAnnotationCardFromPreview(savedRect.dataset.annotationId);
});

elements.zoomOutButton.addEventListener("click", (event) => {
  event.stopPropagation();
  setImageZoom(imageView.scale / 1.2);
});
elements.zoomInButton.addEventListener("click", (event) => {
  event.stopPropagation();
  setImageZoom(imageView.scale * 1.2);
});
elements.zoomResetButton.addEventListener("click", (event) => {
  event.stopPropagation();
  resetImageView(false);
});

elements.pdfModeButton.addEventListener("click", (event) => {
  event.stopPropagation();
  if (appState.previewKind !== "pdf") return;
  if (!elements.pdfSelectionPreview.classList.contains("hidden")) {
    setAnnotationMode(false);
    hidePdfSelectionPage();
    resetImageView(true);
    elements.zoomHint.textContent =
      "连续阅读：滚轮上下浏览全部页面；当前页会自动记录，框选时不会返回第一页";
  }
});

elements.imagePreview.addEventListener("pointerdown", (event) => {
  if (annotationState.active || annotationState.editId) return;
  if (event.button !== 0) return;
  event.preventDefault();
  imageView.active = true;
  imageView.dragging = true;
  imageView.pointerId = event.pointerId;
  imageView.startX = event.clientX;
  imageView.startY = event.clientY;
  imageView.originX = imageView.x;
  imageView.originY = imageView.y;
  if (elements.imagePreview.setPointerCapture) {
    elements.imagePreview.setPointerCapture(event.pointerId);
  }
  applyImageView();
});

elements.previewStage.addEventListener("pointerdown", (event) => {
  if (
    annotationState.active ||
    annotationState.editId ||
    appState.previewKind !== "pdf" ||
    !imageView.active ||
    event.button !== 0 ||
    event.target.closest("button")
  ) {
    return;
  }
  event.preventDefault();
  imageView.dragging = true;
  imageView.pointerId = event.pointerId;
  imageView.startX = event.clientX;
  imageView.startY = event.clientY;
  imageView.originX = imageView.x;
  imageView.originY = imageView.y;
  if (elements.previewStage.setPointerCapture) {
    elements.previewStage.setPointerCapture(event.pointerId);
  }
  applyImageView();
});

document.addEventListener("pointermove", (event) => {
  if (!imageView.dragging || event.pointerId !== imageView.pointerId) return;
  event.preventDefault();
  imageView.x = imageView.originX + event.clientX - imageView.startX;
  imageView.y = imageView.originY + event.clientY - imageView.startY;
  applyImageView();
});

function stopImageDrag(event) {
  if (!imageView.dragging || event.pointerId !== imageView.pointerId) return;
  imageView.dragging = false;
  if (
    elements.imagePreview.hasPointerCapture &&
    elements.imagePreview.hasPointerCapture(event.pointerId)
  ) {
    elements.imagePreview.releasePointerCapture(event.pointerId);
  }
  if (
    elements.previewStage.hasPointerCapture &&
    elements.previewStage.hasPointerCapture(event.pointerId)
  ) {
    elements.previewStage.releasePointerCapture(event.pointerId);
  }
  imageView.pointerId = null;
  applyImageView();
}

document.addEventListener("pointerup", stopImageDrag);
document.addEventListener("pointercancel", stopImageDrag);
elements.imagePreview.addEventListener("dragstart", (event) =>
  event.preventDefault()
);
elements.previewStage.addEventListener("dblclick", () => {
  if (!annotationState.active) resetImageView(false);
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    !elements.annotationFloatingEditor.classList.contains("hidden")
  ) {
    closeAnnotationFloatingEditorWindow();
    return;
  }
  if (event.key === "Escape" && annotationState.draft) {
    cancelAnnotationDraft();
    setAnnotationMode(false);
    return;
  }
  if (event.key === "Escape" && annotationState.active) {
    setAnnotationMode(false);
    return;
  }
  if (event.key === "Escape" && appState.focusReading) {
    setFocusReading(false);
    return;
  }
  if (event.key === "Escape" && appState.libraryDrawerOpen) {
    setLibraryDrawer(false);
    return;
  }
  if (
    event.key === "Escape" &&
    !elements.favoriteWebsitesModal.classList.contains("hidden")
  ) {
    closeFavoriteWebsites();
    return;
  }
  if (
    event.key === "Escape" &&
    !elements.historyModal.classList.contains("hidden")
  ) {
    closeHistory();
    return;
  }
  if (event.key === "Escape" && !elements.timelineModal.classList.contains("hidden")) {
    closeTimeline();
    return;
  }
  if (
    event.key === "Escape" &&
    !elements.aiSuggestionModal.classList.contains("hidden")
  ) {
    closeAiSuggestion();
    return;
  }
  if (
    event.key === "Escape" &&
    !elements.folderImportModal.classList.contains("hidden")
  ) {
    closeFolderImport();
    return;
  }
  if (
    event.key === "Escape" &&
    !elements.textExportModal.classList.contains("hidden")
  ) {
    closeTextExport();
    return;
  }
  if (event.key === "Escape" && !elements.importReviewModal.classList.contains("hidden")) {
    closeImportReview();
    return;
  }
  if (
    (event.ctrlKey || event.metaKey) &&
    event.key.toLocaleLowerCase() === "z"
  ) {
    const editingTarget = event.target.closest?.(
      'input, textarea, [contenteditable="true"]'
    );
    if (editingTarget) return;
    if (event.shiftKey) return;
    event.preventDefault();
    undoLast();
  }
});

elements.imagePreview.addEventListener("error", () => {
  elements.imagePreview.classList.add("hidden");
  elements.emptyPreview.classList.remove("hidden");
  elements.emptyPreview.querySelector("strong").textContent =
    "浏览器暂不支持此图片预览";
  elements.emptyPreview.querySelector("span").textContent =
    "仍然可以安全地整理史料信息";
});
elements.imagePreview.addEventListener("load", () => {
  window.requestAnimationFrame(() => renderAnnotationLayer());
});

window.addEventListener("beforeunload", closeCachedPdfiumDocument);

function removePassiveGuidance() {
  document
    .querySelectorAll(
      [
        ".panel-foot",
        ".zoom-hint",
        ".ocr-service-explanation",
        ".manual-priority-hint",
        ".ocr-service-hint",
        ".timeline-help",
        ".text-export-note",
        ".text-export-location small",
        ".notes-workspace-intro .eyebrow",
        ".notes-workspace-intro p",
        ".ocr-engine-disclosure summary small",
        ".translation-provider-panel > p",
        ".ai-chat-intro",
        "small:not([id])",
      ].join(",")
    )
    .forEach((element) => element.remove());
  document
    .querySelectorAll("input[placeholder], textarea[placeholder], [data-placeholder]")
    .forEach((element) => {
      if (element.dataset.keepPlaceholder === "true") return;
      element.removeAttribute("placeholder");
      element.removeAttribute("data-placeholder");
    });
}

function applyWorkspaceSplit(requestedWidth, save = false) {
  if (!elements.workspace || !elements.workspaceDivider) return;
  const libraryWidth =
    appState.libraryDrawerOpen && !appState.focusReading
      ? (librarySplitState.width || 310) + 20
      : 0;
  const totalWidth = elements.workspace.clientWidth - libraryWidth;
  if (totalWidth <= 0) return;
  const dividerAllowance = 28;
  const minimumPreview = Math.min(480, Math.max(360, totalWidth * 0.28));
  const minimumDetails = Math.min(520, Math.max(360, totalWidth * 0.28));
  const maximumPreview = Math.max(
    minimumPreview,
    totalWidth - minimumDetails - dividerAllowance
  );
  const fallback = Math.min(maximumPreview, Math.max(minimumPreview, totalWidth * 0.61));
  const width = Math.min(
    maximumPreview,
    Math.max(minimumPreview, Number(requestedWidth) || fallback)
  );
  workspaceSplitState.width = width;
  elements.workspace.style.setProperty(
    "--workspace-preview-width",
    `${Math.round(width)}px`
  );
  elements.workspaceDivider.setAttribute(
    "aria-valuenow",
    String(Math.round((width / totalWidth) * 100))
  );
  if (save) {
    window.localStorage.setItem(WORKSPACE_SPLIT_KEY, String(Math.round(width)));
  }
  window.requestAnimationFrame(() => renderAnnotationLayer());
}

function restoreWorkspaceSplit() {
  const stored = Number(
    window.localStorage.getItem(WORKSPACE_SPLIT_KEY) ||
      window.localStorage.getItem(
        "historical_workbench_v86_workspace_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v85_workspace_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v84_workspace_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v83_workspace_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v82_workspace_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v81_workspace_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v80_workspace_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v79_workspace_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v78_workspace_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v77_workspace_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v76_workspace_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v75_workspace_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v74_workspace_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v73_workspace_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v72_workspace_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v71_workspace_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v70_workspace_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v67_workspace_split"
      )
  );
  applyWorkspaceSplit(Number.isFinite(stored) && stored > 0 ? stored : 0);
}

function applyLibrarySplit(requestedWidth, save = false) {
  if (!elements.workspace || !elements.libraryWorkspaceDivider) return;
  const totalWidth = elements.workspace.clientWidth;
  if (!totalWidth) return;
  const minimum = 240;
  const maximum = Math.max(
    minimum,
    Math.min(520, totalWidth - 360 - 360 - 48)
  );
  const fallback = Math.min(maximum, Math.max(minimum, 310));
  const width = Math.min(
    maximum,
    Math.max(minimum, Number(requestedWidth) || fallback)
  );
  librarySplitState.width = width;
  elements.workspace.style.setProperty(
    "--workspace-library-width",
    `${Math.round(width)}px`
  );
  elements.libraryWorkspaceDivider.setAttribute(
    "aria-valuenow",
    String(Math.round((width / totalWidth) * 100))
  );
  if (save) {
    window.localStorage.setItem(LIBRARY_SPLIT_KEY, String(Math.round(width)));
  }
  window.requestAnimationFrame(() => {
    applyWorkspaceSplit(workspaceSplitState.width);
    renderAnnotationLayer();
  });
}

function restoreLibrarySplit() {
  const stored = Number(
    window.localStorage.getItem(LIBRARY_SPLIT_KEY) ||
      window.localStorage.getItem(
        "historical_workbench_v86_library_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v85_library_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v84_library_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v83_library_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v82_library_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v81_library_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v80_library_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v79_library_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v78_library_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v77_library_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v76_library_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v75_library_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v74_library_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v73_library_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v72_library_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v71_library_split"
      ) ||
      window.localStorage.getItem(
        "historical_workbench_v70_library_split"
      )
  );
  applyLibrarySplit(Number.isFinite(stored) && stored > 0 ? stored : 0);
}

const selectionGliderDefinitions = [
  { selector: "#kindTabs", tone: "surface" },
  {
    selector: ".details-view-tabs",
    tone: "accent",
    buttons: ':scope > button[data-details-view]',
  },
  {
    selector: ".source-language-segment",
    tone: "accent",
    buttons: ':scope > button[data-source-language]',
  },
  { selector: ".status-segment", tone: "accent" },
  { selector: ".kind-segment", tone: "soft" },
  { selector: ".edition-unit-segment", tone: "surface" },
  { selector: ".paper-type-segment", tone: "soft" },
  { selector: ".foreign-text-mode-tabs", tone: "surface" },
  { selector: ".engine-settings-tabs", tone: "accent" },
  { selector: ".notes-surface-tabs", tone: "accent" },
  { selector: ".ai-suggestion-right-tabs", tone: "accent" },
];

const selectionGliderRegistry = new WeakMap();

function selectedGliderButton(group, buttonSelector) {
  return Array.from(group.querySelectorAll(buttonSelector)).find(
    (button) =>
      button.classList.contains("active") ||
      button.getAttribute("aria-selected") === "true"
  );
}

function moveSelectionGliderToButton(group, button, immediate = false) {
  const record = selectionGliderRegistry.get(group);
  if (!record) return;
  if (!button || group.classList.contains("hidden")) {
    record.glider.classList.add("hidden");
    return;
  }
  const groupBounds = group.getBoundingClientRect();
  const buttonBounds = button.getBoundingClientRect();
  if (!groupBounds.width || !groupBounds.height || !buttonBounds.width) {
    record.glider.classList.add("hidden");
    return;
  }
  const now = window.performance.now();
  if (!immediate) record.transitionUntil = now + 360;
  const suppressTransition =
    immediate && now >= Number(record.transitionUntil || 0);
  if (suppressTransition) {
    record.glider.classList.add("selection-glider-immediate");
  } else {
    record.glider.classList.remove("selection-glider-immediate");
  }
  record.glider.classList.remove("hidden");
  record.glider.style.width = `${buttonBounds.width}px`;
  record.glider.style.height = `${buttonBounds.height}px`;
  record.glider.style.transform = `translate3d(${buttonBounds.left - groupBounds.left}px, ${
    buttonBounds.top - groupBounds.top
  }px, 0)`;
  if (suppressTransition) {
    window.requestAnimationFrame(() =>
      record.glider.classList.remove("selection-glider-immediate")
    );
  }
}

function positionSelectionGlider(group, immediate = false) {
  const record = selectionGliderRegistry.get(group);
  if (!record) return;
  const button = selectedGliderButton(group, record.buttonSelector);
  if (!button || group.classList.contains("hidden")) {
    record.glider.classList.add("hidden");
    return;
  }
  moveSelectionGliderToButton(group, button, immediate);
}

function enhanceSelectionGlider(group, definition) {
  if (!group || selectionGliderRegistry.has(group)) return;
  const buttonSelector = definition.buttons || ":scope > button";
  const glider = document.createElement("span");
  glider.className = "selection-glider hidden selection-glider-immediate";
  glider.setAttribute("aria-hidden", "true");
  group.dataset.selectionGlider = "true";
  group.dataset.gliderTone = definition.tone;
  group.prepend(glider);

  let frame = 0;
  const schedule = (immediate = false) => {
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(() =>
      positionSelectionGlider(group, immediate)
    );
  };
  const mutationObserver = new MutationObserver(() => {
    if (glider.parentElement !== group) group.prepend(glider);
    group.querySelectorAll(buttonSelector).forEach((button) =>
      resizeObserver.observe(button)
    );
    schedule(false);
  });
  mutationObserver.observe(group, {
    attributes: true,
    attributeFilter: ["class", "aria-selected"],
    childList: true,
    subtree: true,
  });
  const resizeObserver = new ResizeObserver(() => schedule(true));
  resizeObserver.observe(group);
  group.querySelectorAll(buttonSelector).forEach((button) =>
    resizeObserver.observe(button)
  );
  selectionGliderRegistry.set(group, {
    glider,
    buttonSelector,
    mutationObserver,
    resizeObserver,
    transitionUntil: 0,
  });
  group.addEventListener(
    "click",
    (event) => {
      const button = event.target.closest("button");
      if (
        !button ||
        button.disabled ||
        !Array.from(group.querySelectorAll(buttonSelector)).includes(button)
      ) {
        return;
      }
      moveSelectionGliderToButton(group, button, false);
    },
    true
  );
  schedule(true);
}

function installSelectionGliders(root = document) {
  selectionGliderDefinitions.forEach((definition) => {
    if (root.matches?.(definition.selector)) {
      enhanceSelectionGlider(root, definition);
    }
    root.querySelectorAll?.(definition.selector).forEach((group) =>
      enhanceSelectionGlider(group, definition)
    );
  });
}

const selectionGliderDocumentObserver = new MutationObserver((records) => {
  records.forEach((record) =>
    record.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) installSelectionGliders(node);
    })
  );
});

installSelectionGliders();
selectionGliderDocumentObserver.observe(document.body, {
  childList: true,
  subtree: true,
});

elements.workspaceDivider.addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  event.preventDefault();
  workspaceSplitState.dragging = true;
  workspaceSplitState.pointerId = event.pointerId;
  elements.workspaceDivider.classList.add("dragging");
  elements.workspaceDivider.setPointerCapture?.(event.pointerId);
});

elements.workspaceDivider.addEventListener("pointermove", (event) => {
  if (
    !workspaceSplitState.dragging ||
    event.pointerId !== workspaceSplitState.pointerId
  ) {
    return;
  }
  const bounds = elements.workspace.getBoundingClientRect();
  const libraryOffset =
    appState.libraryDrawerOpen && !appState.focusReading
      ? (librarySplitState.width || 310) + 20
      : 0;
  applyWorkspaceSplit(event.clientX - bounds.left - libraryOffset);
});

function finishWorkspaceSplit(event) {
  if (
    !workspaceSplitState.dragging ||
    event.pointerId !== workspaceSplitState.pointerId
  ) {
    return;
  }
  workspaceSplitState.dragging = false;
  workspaceSplitState.pointerId = null;
  elements.workspaceDivider.classList.remove("dragging");
  elements.workspaceDivider.releasePointerCapture?.(event.pointerId);
  applyWorkspaceSplit(workspaceSplitState.width, true);
}

elements.workspaceDivider.addEventListener("pointerup", finishWorkspaceSplit);
elements.workspaceDivider.addEventListener("pointercancel", finishWorkspaceSplit);
elements.workspaceDivider.addEventListener("dblclick", () => {
  window.localStorage.removeItem(WORKSPACE_SPLIT_KEY);
  applyWorkspaceSplit(0);
});
elements.workspaceDivider.addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight", "Home"].includes(event.key)) return;
  event.preventDefault();
  if (event.key === "Home") {
    window.localStorage.removeItem(WORKSPACE_SPLIT_KEY);
    applyWorkspaceSplit(0);
    return;
  }
  applyWorkspaceSplit(
    workspaceSplitState.width + (event.key === "ArrowLeft" ? -24 : 24),
    true
  );
});

elements.libraryWorkspaceDivider.addEventListener("pointerdown", (event) => {
  if (event.button !== 0 || !appState.libraryDrawerOpen) return;
  event.preventDefault();
  librarySplitState.dragging = true;
  librarySplitState.pointerId = event.pointerId;
  elements.libraryWorkspaceDivider.classList.add("dragging");
  elements.libraryWorkspaceDivider.setPointerCapture?.(event.pointerId);
});

elements.libraryWorkspaceDivider.addEventListener("pointermove", (event) => {
  if (
    !librarySplitState.dragging ||
    event.pointerId !== librarySplitState.pointerId
  ) {
    return;
  }
  const bounds = elements.workspace.getBoundingClientRect();
  applyLibrarySplit(event.clientX - bounds.left);
});

function finishLibrarySplit(event) {
  if (
    !librarySplitState.dragging ||
    event.pointerId !== librarySplitState.pointerId
  ) {
    return;
  }
  librarySplitState.dragging = false;
  librarySplitState.pointerId = null;
  elements.libraryWorkspaceDivider.classList.remove("dragging");
  elements.libraryWorkspaceDivider.releasePointerCapture?.(event.pointerId);
  applyLibrarySplit(librarySplitState.width, true);
}

elements.libraryWorkspaceDivider.addEventListener(
  "pointerup",
  finishLibrarySplit
);
elements.libraryWorkspaceDivider.addEventListener(
  "pointercancel",
  finishLibrarySplit
);
elements.libraryWorkspaceDivider.addEventListener("dblclick", () => {
  window.localStorage.removeItem(LIBRARY_SPLIT_KEY);
  applyLibrarySplit(0);
});
elements.libraryWorkspaceDivider.addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight", "Home"].includes(event.key)) return;
  event.preventDefault();
  if (event.key === "Home") {
    window.localStorage.removeItem(LIBRARY_SPLIT_KEY);
    applyLibrarySplit(0);
    return;
  }
  applyLibrarySplit(
    librarySplitState.width + (event.key === "ArrowLeft" ? -20 : 20),
    true
  );
});

window.addEventListener("resize", () => {
  applyLibrarySplit(librarySplitState.width);
  applyWorkspaceSplit(workspaceSplitState.width);
});

applyColorTheme(storedColorTheme());
removePassiveGuidance();
restoreLibrarySplit();
restoreWorkspaceSplit();
renderWorkspaceLayout();

request("/api/bootstrap")
  .then(async (data) => {
    applyServerState(data, "", 0);
    setStatus(
      data.hasLibrary
        ? `已载入资料库：${data.projects.length} 个项目，${data.files.length} 份资料`
        : "请选择或新建一个资料库"
    );
    await loadCloudOcrSettings();
    await loadAiSentenceSettings();
    await loadTranslationSettings();
    await refreshOcrServiceStatus();
  })
  .catch((error) => {
    showToast(error.message, "error");
    setStatus("无法连接本地工具，请重新双击启动文件");
  });
