"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  Layers, 
  FileCode, 
  Cpu, 
  Cloud
} from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  module: "Policy" | "Claims" | "Billing";
  xmlPayloadSnippet: string;
  xsltRule: string;
  outputDoc: string;
  s3Key: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "policy-auto",
    name: "Commercial Auto Dec Sheet",
    module: "Policy",
    xmlPayloadSnippet: `<Policy id="POL-9082" status="ISSUED">\n  <Insured>Apex Logistics Inc.</Insured>\n  <Coverage limit="1000000">Liability</Coverage>\n  <Endorsement state="CA">CA-042-ENDORSE</Endorsement>\n</Policy>`,
    xsltRule: `<xsl:template match="/Policy">\n  <xsl:apply-templates select="Endorsement"/>\n  <ghostdraft:bind field="AnnualPremium" expr="sum(//Premium)"/>\n</xsl:template>`,
    outputDoc: "Apex_Commercial_Auto_DecSheet_2026.pdf",
    s3Key: "s3://sapiens-enterprise-vault/policies/2026/POL-9082.pdf",
  },
  {
    id: "claims-fnol",
    name: "P&C Loss Notice (FNOL)",
    module: "Claims",
    xmlPayloadSnippet: `<Claim lossType="COLLISION" claimNo="CLM-4410">\n  <Claimant>Sarah Jenkins</Claimant>\n  <Severity>HIGH</Severity>\n  <FastTrackEligible>true</FastTrackEligible>\n</Claim>`,
    xsltRule: `<xsl:if test="Severity = 'HIGH'">\n  <ghostdraft:trigger alert="ImmediateAdjusterEscalation"/>\n  <ghostdraft:clause id="CLAUSE-EXPEDITED-01"/>\n</xsl:if>`,
    outputDoc: "FNOL_Loss_Notice_CLM-4410.pdf",
    s3Key: "s3://sapiens-enterprise-vault/claims/fnol/CLM-4410.pdf",
  },
  {
    id: "billing-invoice",
    name: "Premium Statement",
    module: "Billing",
    xmlPayloadSnippet: `<BillingAccount acctNo="BAC-8891">\n  <AmountDue currency="USD">4850.00</AmountDue>\n  <DueDate>2026-09-01</DueDate>\n  <AutoPayActive>false</AutoPayActive>\n</BillingAccount>`,
    xsltRule: `<xsl:template match="BillingAccount">\n  <ghostdraft:table dynamicRows="Installments"/>\n  <ghostdraft:qrCode value="PayURL_BAC-8891"/>\n</xsl:template>`,
    outputDoc: "Premium_Billing_Statement_BAC-8891.pdf",
    s3Key: "s3://sapiens-enterprise-vault/billing/invoices/BAC-8891.pdf",
  }
];

export function PipelineVisualizer() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [activeStep, setActiveStep] = useState<number>(3);

  const steps = [
    {
      id: 1,
      title: "1. XML Payload",
      subtitle: `${selectedScenario.module} Module`,
      icon: FileCode,
    },
    {
      id: 2,
      title: "2. XSLT Mapping",
      subtitle: "Rule Transform",
      icon: Cpu,
    },
    {
      id: 3,
      title: "3. GhostDraft CCM",
      subtitle: "Template Engine",
      icon: Layers,
    },
    {
      id: 4,
      title: "4. AWS S3 Storage",
      subtitle: "Cloud Delivery",
      icon: Cloud,
    },
  ];

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">
              Enterprise Document Pipeline
            </h3>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              GhostDraft CCM
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated XML transformation and cloud persistence flow
          </p>
        </div>

        {/* Scenario Select */}
        <select
          value={selectedScenario.id}
          onChange={(e) => {
            const sc = SCENARIOS.find((s) => s.id === e.target.value);
            if (sc) setSelectedScenario(sc);
          }}
          className="text-xs bg-slate-50 text-slate-800 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:border-blue-500 focus:outline-none font-medium"
        >
          {SCENARIOS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.module})
            </option>
          ))}
        </select>
      </div>

      {/* 4 Interactive Step Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4">
        {steps.map((st) => {
          const Icon = st.icon;
          const isSelected = activeStep === st.id;

          return (
            <button
              key={st.id}
              onClick={() => setActiveStep(st.id)}
              className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between min-h-[85px] ${
                isSelected
                  ? "bg-blue-50/90 border-blue-400 text-blue-950 shadow-xs"
                  : "bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-4 h-4 ${isSelected ? "text-blue-700" : "text-slate-400"}`} />
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
              </div>

              <div>
                <p className={`text-xs font-bold ${isSelected ? "text-blue-950" : "text-slate-800"}`}>
                  {st.title}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  {st.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Code / Detail Box */}
      <div className="rounded-lg border border-slate-800 bg-[#0F172A] p-4 font-mono text-xs text-slate-200 shadow-inner">
        <div className="flex items-center justify-between border-b border-slate-700/80 pb-2 mb-2.5">
          <span className="text-[11px] text-slate-300 font-semibold font-sans">
            {activeStep === 1 && "Step 1: Inbound XML Payload"}
            {activeStep === 2 && "Step 2: XSLT Transformation Template"}
            {activeStep === 3 && "Step 3: GhostDraft CCM Composition"}
            {activeStep === 4 && "Step 4: AWS S3 Cloud Storage Destination"}
          </span>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-sans font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Validated</span>
          </span>
        </div>

        <pre className="overflow-x-auto text-[11px] leading-relaxed text-slate-300 max-h-32">
          {activeStep === 1 && (
            <code className="text-cyan-300">{selectedScenario.xmlPayloadSnippet}</code>
          )}
          {activeStep === 2 && (
            <code className="text-slate-200">{selectedScenario.xsltRule}</code>
          )}
          {activeStep === 3 && (
            <div className="space-y-1.5 font-sans text-xs">
              <div className="text-emerald-400 font-semibold">✓ Generated: {selectedScenario.outputDoc}</div>
              <div className="text-slate-300">→ Dynamic rules applied for state regulatory compliance</div>
              <div className="text-slate-400 text-[11px]">→ Multi-channel print stream & high-resolution PDF rendering</div>
            </div>
          )}
          {activeStep === 4 && (
            <div className="space-y-1.5 font-sans text-xs">
              <div className="text-cyan-300 font-mono text-[11px]">{selectedScenario.s3Key}</div>
              <div className="text-slate-300 text-[11px]">
                Status: Stored securely in client AWS S3 document repository
              </div>
            </div>
          )}
        </pre>
      </div>
    </div>
  );
}
