#!/usr/bin/env node

/**
 * Source configuration for all automated data updates.
 * Each source defines: URLs to scrape, target data file, extraction prompt,
 * schema for Claude, and validation thresholds.
 */

// ── Bank Rate Sources ────────────────────────────────────────────────

export const bankSavingsRatesConfig = {
  name: "Savings Interest Rates",
  dataFile: "src/data/rates/savings-rates.ts",
  updatedAtExport: "SAVINGS_RATES_UPDATED_AT",
  dataArrayExport: "bankSavingsRates",
  faqExport: "savingsRateFaqs",
  urls: [
    { bankName: "Maya", url: "https://www.maya.ph/savings" },
    { bankName: "Tonik", url: "https://tonikbank.com/" },
    { bankName: "GoTyme", url: "https://www.gotyme.com.ph/" },
    { bankName: "SeaBank", url: "https://www.seabank.ph/" },
    { bankName: "CIMB", url: "https://www.cimbbank.com.ph/en/digital-banking.html" },
    { bankName: "ING Philippines", url: "https://www.ing.com.ph/" },
    { bankName: "BDO", url: "https://www.bdo.com.ph/personal/accounts/peso-savings" },
    { bankName: "BPI", url: "https://www.bpi.com.ph/savings" },
    { bankName: "Metrobank", url: "https://www.metrobank.com.ph/articles/savings" },
  ],
  extractionPrompt:
    "Extract savings account interest rates from this Philippine bank webpage. Return the bank's savings rates including account type, annual interest rate, rate type (Promo or Standard), minimum balance, and any notes.",
  schema: {
    type: "object",
    properties: {
      rates: {
        type: "array",
        items: {
          type: "object",
          properties: {
            bankName: { type: "string" },
            accountType: { type: "string" },
            interestRate: {
              type: "number",
              description: "Annual interest rate as a percentage (e.g., 6 not 0.06)",
            },
            rateType: { type: "string", enum: ["Promo", "Standard"] },
            minimumBalance: { type: "number" },
            liquidity: { type: "string" },
            bestFor: { type: "string" },
            notes: { type: "string" },
          },
          required: ["bankName", "accountType", "interestRate", "rateType"],
        },
      },
    },
    required: ["rates"],
  },
  validationOptions: {
    nameField: "bankName",
    rateFields: ["interestRate"],
    maxRateChangePercent: 50,
  },
};

export const bankDigitalRatesConfig = {
  name: "Digital Bank Rates",
  dataFile: "src/data/rates/digital-bank-rates.ts",
  updatedAtExport: "DIGITAL_BANK_RATES_UPDATED_AT",
  dataArrayExport: "digitalBankRates",
  faqExport: "digitalBankFaqs",
  urls: [
    { bankName: "Tonik", url: "https://tonikbank.com/" },
    { bankName: "GoTyme", url: "https://www.gotyme.com.ph/" },
    { bankName: "SeaBank", url: "https://www.seabank.ph/" },
    { bankName: "Maya", url: "https://www.maya.ph/savings" },
    { bankName: "CIMB", url: "https://www.cimbbank.com.ph/en/digital-banking.html" },
  ],
  extractionPrompt:
    "Extract digital bank comparison data from this Philippine bank webpage. Return the bank's base interest rate, promo rate (if any), card/ATM access, transfer options, limits/conditions, deposit insurance, and notes.",
  schema: {
    type: "object",
    properties: {
      rates: {
        type: "array",
        items: {
          type: "object",
          properties: {
            bankName: { type: "string" },
            bestFor: { type: "string" },
            baseRate: {
              type: "number",
              description: "Base annual interest rate as a percentage",
            },
            promoRate: {
              type: ["number", "null"],
              description: "Promo rate if available, null otherwise",
            },
            cardAtmAccess: { type: "string" },
            transfers: { type: "string" },
            limitsConditions: { type: "string" },
            depositInsurance: { type: "string" },
            notes: { type: "string" },
          },
          required: ["bankName", "baseRate"],
        },
      },
    },
    required: ["rates"],
  },
  validationOptions: {
    nameField: "bankName",
    rateFields: ["baseRate", "promoRate"],
    maxRateChangePercent: 50,
  },
};

export const bankTimeDepositRatesConfig = {
  name: "Time Deposit Rates",
  dataFile: "src/data/rates/time-deposit-rates.ts",
  updatedAtExport: "TIME_DEPOSIT_RATES_UPDATED_AT",
  dataArrayExport: "bankTimeDepositRates",
  faqExport: "timeDepositRateFaqs",
  urls: [
    { bankName: "Tonik", url: "https://tonikbank.com/" },
    { bankName: "CIMB", url: "https://www.cimbbank.com.ph/en/digital-banking.html" },
    { bankName: "GoTyme", url: "https://www.gotyme.com.ph/" },
    { bankName: "BDO", url: "https://www.bdo.com.ph/personal/accounts/time-deposit" },
    { bankName: "BPI", url: "https://www.bpi.com.ph/time-deposit" },
    { bankName: "Metrobank", url: "https://www.metrobank.com.ph/articles/time-deposit" },
    { bankName: "Security Bank", url: "https://www.securitybank.com/personal/save/time-deposit/" },
  ],
  extractionPrompt:
    "Extract time deposit rates from this Philippine bank webpage. Return product name, term length (e.g., '6 months', '12 months'), gross annual rate, minimum deposit amount, and any notes.",
  schema: {
    type: "object",
    properties: {
      rates: {
        type: "array",
        items: {
          type: "object",
          properties: {
            bankName: { type: "string" },
            product: { type: "string" },
            termLength: { type: "string" },
            grossRate: {
              type: "number",
              description: "Gross annual rate before 20% WHT",
            },
            minimumDeposit: { type: "number" },
            taxNote: { type: "string" },
            bestFor: { type: "string" },
            notes: { type: "string" },
          },
          required: ["bankName", "product", "termLength", "grossRate"],
        },
      },
    },
    required: ["rates"],
  },
  validationOptions: {
    nameField: "bankName",
    rateFields: ["grossRate"],
    maxRateChangePercent: 50,
  },
};

// ── Government Data Sources ──────────────────────────────────────────

export const sssContributionConfig = {
  name: "SSS Contribution Table",
  dataFile: "src/data/government/sss-contribution.ts",
  updatedAtExport: "SSS_CONTRIBUTION_UPDATED_AT",
  urls: [
    "https://www.sss.gov.ph/sss/appmanager/pages.jsp?page=scheduleofcontribution",
  ],
  extractionPrompt:
    "Extract the SSS contribution schedule from this Philippine government webpage. Return the payroll examples with salary, Monthly Salary Credit (MSC), employee share, employer share, and total contribution. Also extract the contribution rate and MSC range.",
  schema: {
    type: "object",
    properties: {
      contributionRate: {
        type: "number",
        description: "Total contribution rate as a percentage (e.g., 15)",
      },
      minMSC: { type: "number", description: "Minimum Monthly Salary Credit" },
      maxMSC: { type: "number", description: "Maximum Monthly Salary Credit" },
      payrollExamples: {
        type: "array",
        items: {
          type: "object",
          properties: {
            salary: { type: "number" },
            msc: { type: "number" },
            employeeShare: { type: "number" },
            employerShare: { type: "number" },
            totalContribution: { type: "number" },
          },
          required: ["salary", "msc", "employeeShare", "employerShare", "totalContribution"],
        },
      },
    },
    required: ["contributionRate", "minMSC", "maxMSC"],
  },
};

export const sssPensionConfig = {
  name: "SSS Pension Table",
  dataFile: "src/data/government/sss-pension-table.ts",
  updatedAtExport: "SSS_PENSION_TABLE_UPDATED_AT",
  urls: [
    "https://www.sss.gov.ph/sss/appmanager/pages.jsp?page=retirementbenefits",
  ],
  extractionPrompt:
    "Extract SSS pension information from this Philippine government webpage. Look for pension computation formulas, minimum pension amounts, MSC ceiling, and any eligibility requirements or changes.",
  schema: {
    type: "object",
    properties: {
      pensionFormulas: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
          },
        },
      },
      minimumPension10to20Years: { type: "number" },
      minimumPension20PlusYears: { type: "number" },
      maxMSC: { type: "number" },
      eligibilityRequirements: {
        type: "array",
        items: { type: "string" },
      },
    },
  },
};

export const pagibigHousingConfig = {
  name: "Pag-IBIG Housing Loan",
  dataFile: "src/data/government/pag-ibig-housing-loan.ts",
  updatedAtExport: "PAGIBIG_HOUSING_LOAN_UPDATED_AT",
  urls: ["https://www.pagibigfund.gov.ph/HousingLoan.html"],
  extractionPrompt:
    "Extract Pag-IBIG housing loan details from this Philippine government webpage. Return loan interest rates by amount range, repricing periods, loan limits by contribution years, and eligibility requirements.",
  schema: {
    type: "object",
    properties: {
      housingLoanRates: {
        type: "array",
        items: {
          type: "object",
          properties: {
            loanAmount: { type: "string" },
            repricingPeriod: { type: "string" },
            interestRate: { type: "number" },
          },
          required: ["loanAmount", "interestRate"],
        },
      },
      loanLimits: {
        type: "array",
        items: {
          type: "object",
          properties: {
            contributionYears: { type: "string" },
            maxLoanAmount: { type: "string" },
          },
          required: ["contributionYears", "maxLoanAmount"],
        },
      },
    },
  },
};

export const pagibigContributionConfig = {
  name: "Pag-IBIG Contribution Table",
  dataFile: "src/data/government/pag-ibig-contribution.ts",
  updatedAtExport: "PAGIBIG_CONTRIBUTION_UPDATED_AT",
  urls: ["https://www.pagibigfund.gov.ph/Membership.html"],
  extractionPrompt:
    "Extract Pag-IBIG Fund contribution details from this Philippine government webpage. Return employee and employer contribution rates, salary thresholds, maximum Monthly Salary Credit, and any recent changes.",
  schema: {
    type: "object",
    properties: {
      maxMSC: { type: "number" },
      lowSalaryThreshold: { type: "number" },
      employeeRateLow: { type: "number", description: "Rate for salary at or below threshold (e.g., 0.01 for 1%)" },
      employeeRateHigh: { type: "number", description: "Rate for salary above threshold (e.g., 0.02 for 2%)" },
      employerRate: { type: "number", description: "Employer rate (e.g., 0.02 for 2%)" },
    },
  },
};

export const pagibigMp2Config = {
  name: "Pag-IBIG MP2 Savings Program",
  dataFile: "src/data/government/pag-ibig-mp2.ts",
  updatedAtExport: "PAGIBIG_MP2_UPDATED_AT",
  urls: ["https://www.pagibigfund.gov.ph/MP2.html"],
  extractionPrompt:
    "Extract Pag-IBIG MP2 savings program details from this Philippine government webpage. Return the minimum monthly contribution, maturity period in years, latest annual dividend rate and its year, whether dividends are tax-exempt, and any recent program changes.",
  schema: {
    type: "object",
    properties: {
      minimumContribution: {
        type: "number",
        description: "Minimum monthly contribution in pesos (e.g., 500)",
      },
      maturityYears: {
        type: "number",
        description: "Lock-in period in years (e.g., 5)",
      },
      latestDividendRate: {
        type: "number",
        description: "Most recent annual dividend rate as a percentage (e.g., 5.61)",
      },
      latestDividendYear: {
        type: "number",
        description: "Year of the latest dividend rate (e.g., 2024)",
      },
      taxExempt: {
        type: "boolean",
        description: "Whether MP2 dividends are tax-exempt",
      },
    },
    required: ["minimumContribution", "maturityYears", "latestDividendRate", "latestDividendYear"],
  },
};

export const philhealthConfig = {
  name: "PhilHealth Contribution Table",
  dataFile: "src/data/government/philhealth.ts",
  updatedAtExport: "PHILHEALTH_UPDATED_AT",
  urls: ["https://www.philhealth.gov.ph/circulars/"],
  extractionPrompt:
    "Extract PhilHealth contribution information from this Philippine government webpage. Return the premium rate, salary floor, salary ceiling, and any recent changes to contribution rates or thresholds.",
  schema: {
    type: "object",
    properties: {
      premiumRate: { type: "number", description: "Premium rate as a decimal (e.g., 0.05 for 5%)" },
      salaryFloor: { type: "number" },
      salaryCeiling: { type: "number" },
      effectiveDate: { type: "string" },
      notes: { type: "string" },
    },
  },
};

export const withholdingTaxConfig = {
  name: "Withholding Tax Table",
  dataFile: "src/data/government/withholding-tax-table.ts",
  updatedAtExport: "WITHHOLDING_TAX_TABLE_UPDATED_AT",
  urls: ["https://www.bir.gov.ph/tax-information/tax-rates"],
  extractionPrompt:
    "Extract Philippine withholding tax brackets from this BIR webpage. Return monthly tax brackets with: lower bound, upper bound, base tax, rate percentage, and excess-over amount. Also note if the TRAIN Law (RA 10963) brackets are still in effect.",
  schema: {
    type: "object",
    properties: {
      isTrainLawEffective: { type: "boolean" },
      monthlyTaxBrackets: {
        type: "array",
        items: {
          type: "object",
          properties: {
            overBut: { type: "string" },
            notOver: { type: "string" },
            baseTax: { type: "number" },
            rate: { type: "number", description: "Tax rate as a percentage (e.g., 15 not 0.15)" },
            ofExcessOver: { type: "number" },
          },
          required: ["overBut", "notOver", "baseTax", "rate", "ofExcessOver"],
        },
      },
    },
  },
};

// ── All Sources Map ──────────────────────────────────────────────────

export const allSources = {
  "savings-rates": bankSavingsRatesConfig,
  "digital-rates": bankDigitalRatesConfig,
  "time-deposit-rates": bankTimeDepositRatesConfig,
  "sss-contribution": sssContributionConfig,
  "sss-pension": sssPensionConfig,
  "pagibig-housing": pagibigHousingConfig,
  "pagibig-contribution": pagibigContributionConfig,
  "pagibig-mp2": pagibigMp2Config,
  "philhealth": philhealthConfig,
  "withholding-tax": withholdingTaxConfig,
};
