// TypeScript interfaces for case study data
export interface PatientInfo {
  demographics: string;
  condition: string;
  duration: string;
  surgicalDetails?: string;
  medicalHistory?: string;
}

export interface ClinicalPresentation {
  initialAssessment: string[];
  functionalLimitations: string[];
  diagnosticImaging?: string[];
}

export interface TreatmentPhase {
  title: string;
  duration?: string;
  frequency?: string;
  interventions: string[];
  goals: string;
  milestones?: string[];
}

export interface TreatmentProtocol {
  [phase: string]: TreatmentPhase;
}

export interface FunctionalTest {
  test: string;
  baseline: string;
  week8?: string;
  week12?: string;
  outcome: string;
}

export interface ClinicalMetric {
  metric: string;
  baseline: string;
  week4?: string;
  week8?: string;
  week12?: string;
  week16?: string;
  outcome: string;
}

export interface ClinicalOutcomes {
  functionalTests: FunctionalTest[];
  clinicalMetrics: ClinicalMetric[];
  complications?: string[];
}

export type FollowUp =
  | string
  | {
      shortTerm: string;
      mediumTerm: string;
      longTerm: string;
      additionalNotes?: string;
    };

export interface CaseStudy {
  id: string;
  title: string;
  patient: PatientInfo;
  clinicalPresentation: ClinicalPresentation;
  treatmentProtocol: TreatmentProtocol;
  clinicalOutcomes: ClinicalOutcomes;
  followUp: FollowUp;
  gradient: string;
  icon: React.ElementType;
  specialty: string;
  therapist: string;
  assistingStaff?: string[];
  dateCompleted: string;
  surgicalDate?: string;
  successRate: number;
  evidenceBase?: string[];
  keyLearnings?: string[];
} 