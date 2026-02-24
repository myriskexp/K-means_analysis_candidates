import { useState, useEffect, useRef } from "react";
import logo from "./assets/myriskexp-logo.png";

// ─── BILINGUAL CONTENT SCHEMA ─────────────────────────────────────────────────
const content = {
  en: {
    nav: {
      overview: "Overview",
      summary: "Executive Summary",
      context: "Business Context",
      data: "Data Scope",
      method: "Method",
      findings: "Findings",
      visuals: "Visual Insights",
      implications: "Implications",
      recommendations: "Recommendations",
      limitations: "Limitations",
      appendix: "Appendix",
    },
    badge: "Anonymized Case Study",
    labels: {
      riskFlag: "Risk Flag",
      candidates: "candidates",
      avgAge: "Avg. Age",
      education: "Education",
      gender: "Gender",
      experience: "Experience",
      searchBehavior: "Search Behavior",
      topRoles: "Roles",
      donutSegments: "segments",
      techStack: "Tech Stack",
    },
    hero: {
      subtitle: "Risk Analysis & Decision Intelligence",
      title: "Candidate Segmentation Using K-Means Clustering",
      description:
        "A data-driven approach to understanding applicant profiles through clustering analysis — identifying four distinct talent segments from 10,487 candidates across 2,546 positions.",
      cta1: "View Findings",
      cta2: "Method Summary",
      cta3: "Recommendations",
      stats: [
        { value: "10,487", label: "Candidates Analyzed" },
        { value: "4", label: "Segments Identified" },
        { value: "26", label: "Variables Processed" },
        { value: "35", label: "AI-Classified Roles" },
      ],
    },
    summary: {
      title: "Executive Summary",
      intro:
        "This analysis segments over 10,000 job applicants from a leading recruitment platform into four distinct profiles, enabling targeted talent management strategies. Below are the key takeaways for decision-makers.",
      takeaways: [
        {
          icon: "📊",
          title: "Dominant Operational Talent Pool",
          text: "65.4% of all applicants belong to a single segment of experienced workers (avg. age ~30) with completed technical or professional education. This group represents the core workforce pipeline for standard placement.",
        },
        {
          icon: "🚀",
          title: "Large Emerging Talent Segment at Risk",
          text: "29.9% of applicants are young (avg. ~28), with low education completion, minimal experience, and low job-search activity — representing both an opportunity for training programs and a risk of disengagement.",
        },
        {
          icon: "🌐",
          title: "Scarce Bilingual Talent",
          text: "Only 2.2% of candidates have strong English and multilingual skills. This small but high-value segment targets interpreter and advisory roles, making them critical for bilingual service offerings.",
        },
        {
          icon: "⚠️",
          title: "Geographic Concentration Risk",
          text: "79% of all candidates are concentrated in just 5 metropolitan areas, with the capital region alone accounting for 36.6%. Mid-sized cities present untapped recruitment opportunities.",
        },
        {
          icon: "🔍",
          title: "Data Gaps Limit Precision",
          text: "The source platform lacks critical variables such as years of experience, salary expectations, and vacancy metadata — limiting the model's predictive power and requiring enrichment for operational use.",
        },
      ],
    },
    context: {
      title: "Business Context",
      subtitle: "Why This Analysis Matters",
      problem:
        "An international staffing and workforce solutions firm needed to understand who was actually applying to their published job openings through a major online recruitment platform. With over 16,000 applications across 2,500+ positions in Q1 2025, manual profiling was no longer viable.",
      stakeholders: [
        {
          role: "HR & Talent Acquisition",
          icon: "👥",
          text: "Needed a structured view of applicant profiles to improve screening speed, reduce bottlenecks in high-volume roles (auxiliary, operators, drivers), and design segment-specific recruitment pipelines.",
        },
        {
          role: "Finance & Resource Planning",
          icon: "💰",
          text: "Required visibility into talent availability by region and profile type to optimize recruitment budget allocation and evaluate cost-per-hire by segment.",
        },
        {
          role: "Operations & Service Delivery",
          icon: "⚙️",
          text: "Needed to anticipate workforce supply constraints, detect mismatches between applicant profiles and client demands, and reduce post-placement turnover driven by poor candidate-role fit.",
        },
      ],
      scope:
        "The analysis covered 10,487 unique candidates who applied to approximately 2,546 job openings, generating around 16,191 total applications. All personal identifiers were removed in compliance with data protection regulations. The dataset was enriched with 35 AI-classified job role categories.",
    },
    dataScope: {
      title: "Data & Analysis Scope",
      subtitle: "What Was Analyzed — In Plain Terms",
      description:
        "The dataset included applicant records from a leading Latin American job platform, spanning the first quarter of 2025. Each record contained demographic, educational, linguistic, geographic, and application behavior information — but no personally identifiable data.",
      items: [
        {
          label: "Population",
          value: "10,487 unique candidates",
        },
        {
          label: "Applications",
          value: "~16,191 total across ~2,546 openings",
        },
        {
          label: "Variables Used",
          value:
            "26 features including age, education level, language skills, work experience, geographic region, and application volume",
        },
        {
          label: "Job Categories",
          value:
            "35 role types classified using AI from job titles (e.g., auxiliary, driver, operator, advisor, technician)",
        },
      ],
      caveats: [
        "Extraction and application dates were redacted from the source",
        "No vacancy-level metadata was available (e.g., city, status, dates)",
        "Experience data was limited to binary (has/doesn't have) — no years or relevance detail",
        "Salary expectations and soft skills were not captured by the platform",
      ],
      caveatTitle: "Data Quality Notes",
    },
    method: {
      title: "Method Summary",
      subtitle: "How the Segmentation Was Performed",
      intro:
        "The analysis used a well-established data science technique to automatically group applicants into segments based on shared characteristics — without predefined categories. This approach lets the data reveal natural patterns that traditional filters or manual sorting cannot detect.",
      steps: [
        {
          title: "Data Preparation",
          desc: "Personal identifiers were removed. Numerical variables (age, education level, application count) were standardized. Categorical variables (region, gender, education status) were encoded for analysis. Job roles were classified using AI into 35 categories.",
        },
        {
          title: "Segmentation Modeling",
          desc: "The optimal number of groups (4) was determined using a standard evaluation method. The model was run both on the full 26-variable set and on a dimensionally reduced version (10 components capturing ~92% of variance) for validation.",
        },
        {
          title: "Quality Validation",
          desc: "Segmentation quality was assessed using established metrics. Results showed moderate-to-good separation — typical for workforce data with correlated variables. The segments were found to be non-trivial and operationally meaningful.",
        },
      ],
      artifacts:
        "Reproducible artifacts (analysis notebook and full report) were produced and anonymized for portfolio purposes. No raw candidate data is included in any public material.",
    },
    findings: {
      title: "Segment Results",
      subtitle: "Four Distinct Candidate Profiles Identified",
      clusters: [
        {
          id: 0,
          name: "Experienced Talent",
          color: "#2563EB",
          pct: "65.4%",
          count: "6,805",
          avgAge: "~30 years",
          education: "Professional or technical, mostly completed",
          gender: "Balanced, slightly more women",
          experience: "High proportion with work experience",
          searchBehavior: "Moderate application volume",
          topRoles: [
            { role: "Auxiliary", pct: "44.3%" },
            { role: "Driver", pct: "9.6%" },
            { role: "Advisor", pct: "9.3%" },
            { role: "Operator", pct: "8.0%" },
            { role: "Sales", pct: "4.2%" },
          ],
          interpretation:
            "Core workforce pipeline. Responds well to standard placement in outsourcing, plant, and office roles. Requires efficient screening processes given the volume.",
          riskFlag: false,
        },
        {
          id: 1,
          name: "Bilingual Talent",
          color: "#DC2626",
          pct: "2.2%",
          count: "228",
          avgAge: "~27 years",
          education: "Professional / postgraduate",
          gender: "Balanced",
          experience: "Only 13% report experience",
          searchBehavior: "Low, targeted applications",
          topRoles: [
            { role: "Interpreter/Agent", pct: "20.6%" },
            { role: "Auxiliary", pct: "18.4%" },
            { role: "Advisor", pct: "16.2%" },
            { role: "Sales", pct: "4.4%" },
            { role: "Analyst", pct: "4.4%" },
          ],
          interpretation:
            "High-value niche for bilingual service positions. Strong academic credentials but limited formal work experience. Ideal for specialized client-facing roles requiring language skills.",
          riskFlag: false,
        },
        {
          id: 2,
          name: "Emerging Talent",
          color: "#F97316",
          pct: "29.9%",
          count: "3,112",
          avgAge: "~28 years",
          education: "High school or technical, high dropout rate",
          gender: "Balanced",
          experience: "Minimal work experience",
          searchBehavior: "Low — possibly due to discouragement",
          topRoles: [
            { role: "Auxiliary", pct: "45.1%" },
            { role: "Driver", pct: "9.8%" },
            { role: "Advisor", pct: "8.7%" },
            { role: "Operator", pct: "7.6%" },
            { role: "Sales", pct: "3.7%" },
          ],
          interpretation:
            "Massive segment of young or vulnerable candidates in educational transition or seeking first employment. High potential for basic operational roles or structured training programs.",
          riskFlag: true,
        },
        {
          id: 3,
          name: "Transitional Talent",
          color: "#16A34A",
          pct: "2.5%",
          count: "258",
          avgAge: "~33 years",
          education: "Varied",
          gender: "Diverse profiles",
          experience: "Mixed",
          searchBehavior: "Varied, some language barriers",
          topRoles: [
            { role: "Auxiliary", pct: "45.0%" },
            { role: "Operator", pct: "10.9%" },
            { role: "Driver", pct: "9.7%" },
            { role: "Advisor", pct: "5.4%" },
            { role: "Analyst", pct: "3.9%" },
          ],
          interpretation:
            "Niche group with low Spanish proficiency but functional English and other languages. May include foreign applicants or data quality anomalies. Requires specialized assessment before placement.",
          riskFlag: true,
        },
      ],
    },
    visuals: {
      title: "Visual Insights",
      subtitle: "Decision-Focused Data Views",
      clusterDistTitle: "Segment Size Distribution",
      profileTitle: "Segment Profile Comparison",
      mapTitle: "2D Cluster Map (PCA Projection)",
      mapDesc:
        "The horizontal axis represents multilingual academic capital (higher English, education, other languages). The vertical axis represents active labor maturity (higher experience, age, application volume). Each dot is a candidate, colored by segment.",
      summaryTitle: "Segment Characteristics Summary",
      geoTitle: "Geographic Distribution",
      geoData: [
        { region: "Capital Region", pct: "36.6%", n: "3,824" },
        { region: "Medellín Metro", pct: "14.6%", n: "1,523" },
        { region: "Cali Metro", pct: "12.0%", n: "1,257" },
        { region: "Barranquilla", pct: "8.3%", n: "868" },
        { region: "Bucaramanga", pct: "7.4%", n: "771" },
        { region: "Pereira", pct: "4.5%", n: "466" },
        { region: "Cartagena", pct: "4.0%", n: "420" },
        { region: "Ibagué", pct: "2.3%", n: "242" },
        { region: "Other", pct: "9.6%", n: "1,005" },
      ],
      demographicTitle: "Demographic Snapshot",
      demographics: [
        { label: "Gender Split", value: "61% Male · 39% Female" },
        { label: "Average Age", value: "28.1 years (Median: 25)" },
        {
          label: "Age Concentration",
          value: "50.2% aged 16–25; 80% aged 19–42",
        },
        {
          label: "Education",
          value: "39% high school; 21% technical; 15% university",
        },
        { label: "English Proficiency", value: "86% report no English skills" },
        { label: "Work Experience", value: "68.7% report having experience" },
      ],
    },
    implications: {
      title: "Decision Implications",
      subtitle: "What This Means for Each Function",
      functions: [
        {
          name: "HR & Talent Acquisition",
          icon: "👥",
          items: [
            "Design differentiated screening pipelines per segment to reduce bottleneck in high-volume roles (auxiliary alone accounts for ~44% of applications).",
            "Create a dedicated fast-track channel for the bilingual talent segment (2.2%) — they apply selectively and may be lost to competitors if response times are slow.",
            "Develop first-job placement programs targeting the Emerging Talent segment (29.9%), especially those with incomplete education who show low search activity.",
            "Implement language assessment protocols for the Transitional segment to separate data quality issues from genuine multilingual candidates.",
          ],
        },
        {
          name: "Finance & Planning",
          icon: "💰",
          items: [
            "Allocate recruitment budget proportionally: ~65% to standard pipeline processing, ~25% to emerging talent development programs, ~10% to specialized bilingual and transitional assessment.",
            "Evaluate cost-per-hire differentials by segment — bilingual candidates likely require premium sourcing while operational segments can leverage volume efficiencies.",
            "Geographic concentration (79% in 5 cities) suggests opportunity to optimize regional office costs and explore lower-cost recruitment in mid-size markets.",
          ],
        },
        {
          name: "Operations & Delivery",
          icon: "⚙️",
          items: [
            "Anticipate placement bottlenecks: top 3 role categories (auxiliary, driver, operator) concentrate the majority of applications, creating selection team overload.",
            "Use cluster-based matching to align applicants with positions more efficiently — reducing mismatch, early turnover, and post-placement costs.",
            "Monitor candidates with extremely high application volumes (up to 150 applications) as a signal of potential disengagement or need for guided job orientation.",
          ],
        },
        {
          name: "Cross-Functional",
          icon: "🔗",
          items: [
            "Integrate segmentation outputs into the CRM/ATS to enable segment-aware communications and automated routing.",
            "Use these profiles as a benchmark for comparing actual vacancy demand versus talent supply — identifying structural mismatches early.",
            "Consider the ~8.6% underage applicants (≤18) as a compliance monitoring signal requiring age-appropriate role assignment protocols.",
          ],
        },
      ],
    },
    recommendations: {
      title: "Recommendations & Next Steps",
      subtitle: "From Insight to Action",
      shortTerm: {
        title: "Short-Term Actions (0–90 Days)",
        items: [
          "Implement segment tags in the applicant tracking system to enable cluster-aware filtering and routing.",
          "Create a bilingual talent fast-response protocol — these 228 candidates are high-value and should receive priority outreach within 48 hours.",
          "Launch a pilot screening pathway for the Emerging Talent segment in one metropolitan area, pairing basic operational roles with onboarding support.",
          "Audit the Transitional segment (258 candidates) to separate genuine multilingual profiles from data entry anomalies.",
        ],
      },
      mediumTerm: {
        title: "Medium-Term Actions (90–180 Days)",
        items: [
          "Expand data capture on the recruitment platform to include years of experience, salary expectations, and skills assessments.",
          "Develop differentiated application funnels by segment to reduce process congestion in high-volume categories.",
          "Explore recruitment expansion in mid-size cities (Bucaramanga, Pereira) where talent pools are less saturated.",
          "Build a demand-supply alignment dashboard comparing segmentation profiles with the most-requested roles from client companies.",
        ],
      },
      monitoring: {
        title: "Monitoring & Decision Checkpoints",
        items: [
          "Track placement success rates by segment quarterly to validate segment-based strategies.",
          "Monitor time-to-fill metrics by segment and region for early detection of supply constraints.",
          "Refresh the segmentation model semi-annually as new applicant data accumulates.",
          "Conduct A/B tests comparing segment-aware versus generic screening on a sample of vacancies.",
        ],
      },
      inaction: {
        title: "Risks of Inaction",
        items: [
          "Continued one-size-fits-all screening increases cost-per-hire and time-to-fill for all segments.",
          "Loss of scarce bilingual talent to faster-responding competitors.",
          "Growing disengagement in the Emerging Talent segment without structured onboarding paths.",
          "75% of candidates cluster in operationally-oriented, low-qualification profiles — without active talent development, this concentration deepens dependency on a narrow skill base.",
        ],
      },
    },
    limitations: {
      title: "Limitations & Responsible Use",
      subtitle: "What This Analysis Cannot Tell You",
      items: [
        {
          title: "Model Assumptions",
          text: "The clustering model assumes roughly spherical, similarly-sized groups. One segment represents 65% of all candidates, which partially violates this assumption. Results should be treated as directional guidance, not definitive classification.",
        },
        {
          title: "Data Completeness",
          text: "The source platform does not capture years of experience, salary expectations, application dates, or vacancy metadata (city, status, dates). These gaps limit the granularity of segment profiles.",
        },
        {
          title: "Sensitivity to Outliers",
          text: "Extreme values — such as candidates with 150+ applications or incomplete language data — can influence cluster boundaries. The Transitional segment in particular may reflect data quality issues rather than a true behavioral profile.",
        },
        {
          title: "Refresh Requirements",
          text: "Applicant pools evolve over time. This segmentation reflects Q1 2025 data only and should be refreshed as new quarters are processed to maintain relevance.",
        },
        {
          title: "Avoid Over-Interpretation",
          text: "Segments are statistical groupings, not personality types or capability assessments. Individual candidates within a segment may vary significantly. Use segments for resource planning and process design, not for individual hiring decisions.",
        },
      ],
    },
    appendix: {
      title: "Portfolio Notes",
      subtitle: "About This Case Study",
      notes: [
        "No raw candidate data, personal identifiers, or sensitive information is included in any publicly shared material.",
        "The segmentation methodology follows standard data science practices: z-score standardization, one-hot encoding, elbow method for cluster selection (k=4), PCA for dimensionality reduction (10 components, ~92% variance), and Silhouette/Calinski-Harabasz validation metrics.",
      ],
      techStack:
        "Python · pandas · scikit-learn · K-Means · PCA · matplotlib · seaborn",
    },
    footer: {
      credits: "Credits",
      developed:
        "Developed by MyRiskExp — Risk Analysis & Strategic Intelligence.",
      rights: "© 2026 MyRiskExp. All rights reserved.",
    },
  },
  es: {
    nav: {
      overview: "Visión General",
      summary: "Resumen Ejecutivo",
      context: "Contexto",
      data: "Datos",
      method: "Método",
      findings: "Hallazgos",
      visuals: "Visualización",
      implications: "Implicaciones",
      recommendations: "Recomendaciones",
      limitations: "Limitaciones",
      appendix: "Anexo",
    },
    badge: "Caso de Estudio Anonimizado",
    labels: {
      riskFlag: "Señal de Riesgo",
      candidates: "candidatos",
      avgAge: "Edad Prom.",
      education: "Educación",
      gender: "Género",
      experience: "Experiencia",
      searchBehavior: "Comportamiento",
      topRoles: "Ocupaciones",
      donutSegments: "segmentos",
      techStack: "Stack Tecnológico",
    },
    hero: {
      subtitle: "Análisis de Riesgos e Inteligencia de Decisión",
      title: "Segmentación de candidatos mediante agrupamiento K-means",
      description:
        "Un enfoque basado en datos para comprender perfiles de postulantes mediante análisis de agrupamiento — identificando cuatro segmentos distintos de talento a partir de 10,487 candidatos en 2,546 vacantes.",
      cta1: "Ver Hallazgos",
      cta2: "Resumen del Método",
      cta3: "Recomendaciones",
      stats: [
        { value: "10,487", label: "Candidatos Analizados" },
        { value: "4", label: "Segmentos Identificados" },
        { value: "26", label: "Variables Procesadas" },
        { value: "35", label: "Roles Clasificados con IA" },
      ],
    },
    summary: {
      title: "Resumen Ejecutivo",
      intro:
        "Este análisis segmenta a más de 10,000 postulantes de una plataforma líder de reclutamiento en cuatro perfiles diferenciados, habilitando estrategias de gestión de talento dirigidas. A continuación, los hallazgos clave para la toma de decisiones.",
      takeaways: [
        {
          icon: "📊",
          title: "Pool Dominante de Talento Operativo",
          text: "El 65.4% de los postulantes pertenecen a un solo segmento de trabajadores experimentados (edad promedio ~30 años) con educación técnica o profesional finalizada. Este grupo constituye el canal principal de colocación estándar.",
        },
        {
          icon: "🚀",
          title: "Gran Segmento de Talento Emergente en Riesgo",
          text: "El 29.9% de los candidatos son jóvenes (~28 años promedio), con baja finalización educativa, experiencia mínima y poca actividad de búsqueda — representando tanto una oportunidad de capacitación como un riesgo de desvinculación.",
        },
        {
          icon: "🌐",
          title: "Talento Bilingüe Escaso",
          text: "Solo el 2.2% de los candidatos tienen dominio sólido de inglés y habilidades multilingües. Este segmento pequeño pero de alto valor se orienta a roles de intérprete y asesoría, siendo crítico para servicios bilingües.",
        },
        {
          icon: "⚠️",
          title: "Riesgo de Concentración Geográfica",
          text: "El 79% de todos los candidatos se concentran en solo 5 áreas metropolitanas, con la región capital representando el 36.6%. Las ciudades intermedias presentan oportunidades de reclutamiento sin explotar.",
        },
        {
          icon: "🔍",
          title: "Las Brechas de Datos Limitan la Precisión",
          text: "La plataforma fuente carece de variables críticas como años de experiencia, expectativas salariales y metadatos de vacantes — limitando el poder predictivo del modelo y requiriendo enriquecimiento para uso operativo.",
        },
      ],
    },
    context: {
      title: "Contexto de Negocio",
      subtitle: "Por Qué Importa Este Análisis",
      problem:
        "Una firma internacional de soluciones de personal necesitaba comprender quién realmente se postulaba a sus vacantes publicadas a través de una plataforma líder de reclutamiento en línea. Con más de 16,000 aplicaciones en más de 2,500 posiciones durante el Q1 2025, el perfilamiento manual ya no era viable.",
      stakeholders: [
        {
          role: "RRHH y Atracción de Talento",
          icon: "👥",
          text: "Necesitaban una visión estructurada de los perfiles de candidatos para mejorar la velocidad de filtrado, reducir cuellos de botella en roles de alto volumen (auxiliar, operarios, conductores) y diseñar pipelines de reclutamiento por segmento.",
        },
        {
          role: "Finanzas y Planificación",
          icon: "💰",
          text: "Requerían visibilidad sobre la disponibilidad de talento por región y tipo de perfil para optimizar la asignación del presupuesto de reclutamiento y evaluar el costo por contratación por segmento.",
        },
        {
          role: "Operaciones y Entrega de Servicio",
          icon: "⚙️",
          text: "Necesitaban anticipar restricciones de oferta laboral, detectar desajustes entre perfiles de candidatos y demandas de clientes, y reducir la rotación post-colocación por mala alineación candidato-puesto.",
        },
      ],
      scope:
        "El análisis cubrió 10,487 candidatos únicos que aplicaron a aproximadamente 2,546 vacantes, generando alrededor de 16,191 aplicaciones totales. Todos los identificadores personales fueron eliminados en cumplimiento de las regulaciones de protección de datos. El dataset fue enriquecido con 35 categorías de roles clasificadas por IA.",
    },
    dataScope: {
      title: "Datos y Alcance del Análisis",
      subtitle: "Qué Se Analizó — En Términos Simples",
      description:
        "El dataset incluyó registros de postulantes de una plataforma líder de empleo en Latinoamérica, correspondientes al primer trimestre de 2025. Cada registro contenía información demográfica, educativa, lingüística, geográfica y de comportamiento de aplicación — sin datos personales identificables.",
      items: [
        {
          label: "Población",
          value: "10,487 candidatos únicos",
        },
        {
          label: "Aplicaciones",
          value: "~16,191 en total sobre ~2,546 vacantes",
        },
        {
          label: "Variables Utilizadas",
          value:
            "26 características incluyendo edad, nivel educativo, habilidades lingüísticas, experiencia laboral, región geográfica y volumen de aplicaciones",
        },
        {
          label: "Categorías de Empleo",
          value:
            "35 tipos de roles clasificados con IA a partir de títulos de cargo (ej. auxiliar, conductor, operario, asesor, técnico)",
        },
      ],
      caveats: [
        "Las fechas de extracción y aplicación fueron redactadas de la fuente",
        "No se dispuso de metadatos de las vacantes (ej. ciudad, estado, fechas)",
        "La experiencia fue limitada a una variable binaria (tiene/no tiene) — sin años ni detalle de relevancia",
        "Las expectativas salariales y habilidades blandas no fueron capturadas por la plataforma",
      ],
      caveatTitle: "Notas sobre Calidad de Datos",
    },
    method: {
      title: "Resumen del Método",
      subtitle: "Cómo Se Realizó la Segmentación",
      intro:
        "El análisis utilizó una técnica establecida de ciencia de datos para agrupar automáticamente a los postulantes en segmentos basados en características compartidas — sin categorías predefinidas. Este enfoque permite que los datos revelen patrones naturales que los filtros tradicionales o la clasificación manual no pueden detectar.",
      steps: [
        {
          title: "Preparación de Datos",
          desc: "Se eliminaron los identificadores personales. Las variables numéricas (edad, nivel educativo, número de aplicaciones) fueron estandarizadas. Las variables categóricas (región, género, estado de estudios) fueron codificadas para el análisis. Los roles laborales fueron clasificados mediante IA en 35 categorías.",
        },
        {
          title: "Modelado de Segmentación",
          desc: "El número óptimo de grupos (4) se determinó usando un método de evaluación estándar. El modelo se ejecutó tanto sobre el conjunto completo de 26 variables como sobre una versión con reducción dimensional (10 componentes capturando ~92% de la varianza) para validación.",
        },
        {
          title: "Validación de Calidad",
          desc: "La calidad de la segmentación se evaluó con métricas establecidas. Los resultados mostraron separación moderada a buena — típica para datos laborales con variables correlacionadas. Los segmentos resultaron no triviales y operativamente significativos.",
        },
      ],
      artifacts:
        "Se produjeron artefactos reproducibles (cuaderno de análisis e informe completo) anonimizados para uso de portafolio. No se incluyen datos crudos de candidatos en ningún material público.",
    },
    findings: {
      title: "Resultados de Segmentación",
      subtitle: "Cuatro Perfiles Distintos de Candidatos Identificados",
      clusters: [
        {
          id: 0,
          name: "Talento Experimentado",
          color: "#2563EB",
          pct: "65.4%",
          count: "6,805",
          avgAge: "~30 años",
          education: "Profesional o técnico, mayormente finalizado",
          gender: "Balanceado, ligeramente más mujeres",
          experience: "Alta proporción con experiencia laboral",
          searchBehavior: "Volumen moderado de aplicaciones",
          topRoles: [
            { role: "Auxiliar", pct: "44.3%" },
            { role: "Conductor", pct: "9.6%" },
            { role: "Asesor", pct: "9.3%" },
            { role: "Operario", pct: "8.0%" },
            { role: "Vendedor", pct: "4.2%" },
          ],
          interpretation:
            "Canal principal de colocación. Responde bien a procesos estándar en outsourcing, planta y oficinas. Requiere procesos de filtrado eficientes dado el volumen.",
          riskFlag: false,
        },
        {
          id: 1,
          name: "Talento Bilingüe",
          color: "#DC2626",
          pct: "2.2%",
          count: "228",
          avgAge: "~27 años",
          education: "Profesional / posgrado",
          gender: "Balanceado",
          experience: "Solo 13% reporta experiencia",
          searchBehavior: "Aplicaciones bajas y dirigidas",
          topRoles: [
            { role: "Agente/Intérprete", pct: "20.6%" },
            { role: "Auxiliar", pct: "18.4%" },
            { role: "Asesor", pct: "16.2%" },
            { role: "Vendedor", pct: "4.4%" },
            { role: "Analista", pct: "4.4%" },
          ],
          interpretation:
            "Nicho de alto valor para posiciones de servicio bilingüe. Sólidas credenciales académicas pero experiencia laboral formal limitada. Ideal para roles especializados orientados al cliente que requieran habilidades lingüísticas.",
          riskFlag: false,
        },
        {
          id: 2,
          name: "Talento en Despegue",
          color: "#F97316",
          pct: "29.9%",
          count: "3,112",
          avgAge: "~28 años",
          education:
            "Bachillerato o técnico, alta tasa de deserción académica",
          gender: "Balanceado",
          experience: "Experiencia laboral mínima",
          searchBehavior: "Baja — posiblemente por desmotivación",
          topRoles: [
            { role: "Auxiliar", pct: "45.1%" },
            { role: "Conductor", pct: "9.8%" },
            { role: "Asesor", pct: "8.7%" },
            { role: "Operario", pct: "7.6%" },
            { role: "Vendedor", pct: "3.7%" },
          ],
          interpretation:
            "Segmento masivo de candidatos jóvenes o vulnerables en transición educativa o buscando primer empleo. Alto potencial para roles operativos básicos o programas de capacitación estructurada.",
          riskFlag: true,
        },
        {
          id: 3,
          name: "Talento en Tránsito",
          color: "#16A34A",
          pct: "2.5%",
          count: "258",
          avgAge: "~33 años",
          education: "Variada",
          gender: "Perfiles diversos",
          experience: "Mixta",
          searchBehavior: "Variado, algunas barreras de idioma",
          topRoles: [
            { role: "Auxiliar", pct: "45.0%" },
            { role: "Operario", pct: "10.9%" },
            { role: "Conductor", pct: "9.7%" },
            { role: "Asesor", pct: "5.4%" },
            { role: "Analista", pct: "3.9%" },
          ],
          interpretation:
            "Grupo nicho con baja competencia en español pero inglés funcional y otros idiomas. Puede incluir postulantes extranjeros o anomalías de calidad de datos. Requiere evaluación especializada antes de la colocación.",
          riskFlag: true,
        },
      ],
    },
    visuals: {
      title: "Visualización de Resultados",
      subtitle: "Vistas de Datos Orientadas a la Decisión",
      clusterDistTitle: "Distribución por Tamaño de Segmento",
      profileTitle: "Comparación de Perfiles por Segmento",
      mapTitle: "Mapa de Clústeres 2D (Proyección PCA)",
      mapDesc:
        "El eje horizontal representa el capital académico-lingüístico (mayor inglés, educación, otros idiomas). El eje vertical representa la madurez laboral activa (mayor experiencia, edad, volumen de aplicaciones). Cada punto es un candidato, coloreado por segmento.",
      summaryTitle: "Resumen de Características por Segmento",
      geoTitle: "Distribución Geográfica",
      geoData: [
        { region: "Región Capital", pct: "36.6%", n: "3,824" },
        { region: "Medellín Metro", pct: "14.6%", n: "1,523" },
        { region: "Cali Metro", pct: "12.0%", n: "1,257" },
        { region: "Barranquilla", pct: "8.3%", n: "868" },
        { region: "Bucaramanga", pct: "7.4%", n: "771" },
        { region: "Pereira", pct: "4.5%", n: "466" },
        { region: "Cartagena", pct: "4.0%", n: "420" },
        { region: "Ibagué", pct: "2.3%", n: "242" },
        { region: "Otros", pct: "9.6%", n: "1,005" },
      ],
      demographicTitle: "Panorama Demográfico",
      demographics: [
        { label: "Distribución por Género", value: "61% Hombres · 39% Mujeres" },
        { label: "Edad Promedio", value: "28.1 años (Mediana: 25)" },
        {
          label: "Concentración Etaria",
          value: "50.2% entre 16–25 años; 80% entre 19–42",
        },
        {
          label: "Educación",
          value: "39% bachillerato; 21% técnico; 15% universitario",
        },
        {
          label: "Dominio de Inglés",
          value: "86% no reporta conocimientos de inglés",
        },
        {
          label: "Experiencia Laboral",
          value: "68.7% reporta tener experiencia",
        },
      ],
    },
    implications: {
      title: "Implicaciones para la Decisión",
      subtitle: "Qué Significa para Cada Función",
      functions: [
        {
          name: "RRHH y Atracción de Talento",
          icon: "👥",
          items: [
            "Diseñar pipelines de filtrado diferenciados por segmento para reducir cuellos de botella en roles de alto volumen (auxiliar solo concentra ~44% de las aplicaciones).",
            "Crear un canal de respuesta rápida dedicado para el segmento de talento bilingüe (2.2%) — aplican selectivamente y pueden perderse ante competidores si los tiempos de respuesta son lentos.",
            "Desarrollar programas de colocación de primer empleo dirigidos al segmento de Talento en Despegue (29.9%), especialmente aquellos con educación incompleta y baja actividad de búsqueda.",
            "Implementar protocolos de evaluación lingüística para el segmento en Tránsito para separar problemas de calidad de datos de candidatos genuinamente multilingües.",
          ],
        },
        {
          name: "Finanzas y Planificación",
          icon: "💰",
          items: [
            "Asignar el presupuesto de reclutamiento proporcionalmente: ~65% al procesamiento de pipeline estándar, ~25% a programas de desarrollo de talento emergente, ~10% a evaluación especializada bilingüe y transicional.",
            "Evaluar diferenciales de costo por contratación por segmento — los candidatos bilingües probablemente requieran fuentes premium mientras que los segmentos operativos pueden aprovechar eficiencias de volumen.",
            "La concentración geográfica (79% en 5 ciudades) sugiere oportunidades de optimizar costos de oficinas regionales y explorar reclutamiento de menor costo en mercados de tamaño medio.",
          ],
        },
        {
          name: "Operaciones y Entrega",
          icon: "⚙️",
          items: [
            "Anticipar cuellos de botella de colocación: las 3 principales categorías de roles (auxiliar, conductor, operario) concentran la mayoría de aplicaciones, generando sobrecarga en el equipo de selección.",
            "Usar matching basado en clústeres para alinear postulantes con posiciones más eficientemente — reduciendo desajustes, rotación temprana y costos post-colocación.",
            "Monitorear candidatos con volúmenes de aplicación extremadamente altos (hasta 150 aplicaciones) como señal de potencial desvinculación o necesidad de orientación laboral guiada.",
          ],
        },
        {
          name: "Transversal",
          icon: "🔗",
          items: [
            "Integrar las salidas de segmentación al CRM/ATS para habilitar comunicaciones y enrutamiento automático conscientes del segmento.",
            "Usar estos perfiles como benchmark para comparar la demanda real de vacantes versus la oferta de talento — identificando desajustes estructurales tempranamente.",
            "Considerar el ~8.6% de postulantes menores de edad (≤18) como señal de monitoreo de cumplimiento que requiere protocolos de asignación de roles apropiados para la edad.",
          ],
        },
      ],
    },
    recommendations: {
      title: "Recomendaciones y Próximos Pasos",
      subtitle: "De la Perspectiva a la Acción",
      shortTerm: {
        title: "Acciones a Corto Plazo (0–90 Días)",
        items: [
          "Implementar etiquetas de segmento en el sistema de seguimiento de candidatos para habilitar filtrado y enrutamiento conscientes del clúster.",
          "Crear un protocolo de respuesta rápida para talento bilingüe — estos 228 candidatos son de alto valor y deben recibir contacto prioritario dentro de 48 horas.",
          "Lanzar un piloto de ruta de filtrado para el segmento de Talento en Despegue en un área metropolitana, emparejando roles operativos básicos con soporte de onboarding.",
          "Auditar el segmento en Tránsito (258 candidatos) para separar perfiles genuinamente multilingües de anomalías de ingreso de datos.",
        ],
      },
      mediumTerm: {
        title: "Acciones a Mediano Plazo (90–180 Días)",
        items: [
          "Ampliar la captura de datos en la plataforma de reclutamiento para incluir años de experiencia, expectativas salariales y evaluaciones de habilidades.",
          "Desarrollar embudos de aplicación diferenciados por segmento para reducir la congestión en categorías de alto volumen.",
          "Explorar la expansión de reclutamiento en ciudades intermedias (Bucaramanga, Pereira) donde los pools de talento están menos saturados.",
          "Construir un dashboard de alineación oferta-demanda comparando perfiles de segmentación con los roles más solicitados por empresas clientes.",
        ],
      },
      monitoring: {
        title: "Monitoreo y Puntos de Decisión",
        items: [
          "Rastrear tasas de éxito de colocación por segmento trimestralmente para validar estrategias basadas en segmentos.",
          "Monitorear métricas de tiempo de cobertura por segmento y región para detección temprana de restricciones de oferta.",
          "Refrescar el modelo de segmentación semestralmente conforme se acumulen nuevos datos de postulantes.",
          "Realizar pruebas A/B comparando filtrado consciente del segmento versus genérico en una muestra de vacantes.",
        ],
      },
      inaction: {
        title: "Riesgos de la Inacción",
        items: [
          "El filtrado genérico incrementa el costo por contratación y el tiempo de cobertura para todos los segmentos.",
          "Pérdida de talento bilingüe escaso ante competidores con respuesta más rápida.",
          "Creciente desvinculación en el segmento de Talento en Despegue sin rutas de onboarding estructuradas.",
          "El 75% de los candidatos se agrupan en perfiles operativos de baja calificación — sin desarrollo activo del talento, esta concentración profundiza la dependencia de una base de habilidades estrecha.",
        ],
      },
    },
    limitations: {
      title: "Limitaciones y Uso Responsable",
      subtitle: "Lo Que Este Análisis No Puede Decirle",
      items: [
        {
          title: "Supuestos del Modelo",
          text: "El modelo de agrupamiento asume grupos aproximadamente esféricos y de tamaño similar. Un segmento representa el 65% de todos los candidatos, lo cual viola parcialmente este supuesto. Los resultados deben tratarse como guía direccional, no como clasificación definitiva.",
        },
        {
          title: "Completitud de Datos",
          text: "La plataforma fuente no captura años de experiencia, expectativas salariales, fechas de aplicación ni metadatos de vacantes (ciudad, estado, fechas). Estas brechas limitan la granularidad de los perfiles de segmento.",
        },
        {
          title: "Sensibilidad a Valores Extremos",
          text: "Los valores extremos — como candidatos con 150+ aplicaciones o datos de idioma incompletos — pueden influir en los límites de los clústeres. El segmento en Tránsito en particular puede reflejar problemas de calidad de datos más que un perfil conductual real.",
        },
        {
          title: "Necesidad de Actualización",
          text: "Los pools de postulantes evolucionan con el tiempo. Esta segmentación refleja solo datos del Q1 2025 y debe actualizarse conforme se procesen nuevos trimestres para mantener relevancia.",
        },
        {
          title: "Evitar Sobre-Interpretación",
          text: "Los segmentos son agrupaciones estadísticas, no tipos de personalidad ni evaluaciones de capacidad. Los candidatos individuales dentro de un segmento pueden variar significativamente. Use los segmentos para planificación de recursos y diseño de procesos, no para decisiones individuales de contratación.",
        },
      ],
    },
    appendix: {
      title: "Notas de Portafolio",
      subtitle: "Sobre Este Caso de Estudio",
      notes: [
        "No se incluye ningún dato crudo de candidatos, identificadores personales ni información sensible en ningún material compartido públicamente.",
        "La metodología de segmentación sigue prácticas estándar de ciencia de datos: estandarización z-score, codificación one-hot, método del codo para selección de clústeres (k=4), PCA para reducción dimensional (10 componentes, ~92% varianza), y métricas de validación Silhouette/Calinski-Harabasz.",
      ],
      techStack:
        "Python · pandas · scikit-learn · K-Means · PCA · matplotlib · seaborn",
    },
    footer: {
      credits: "Créditos",
      developed:
        "Desarrollado por MyRiskExp — Análisis de Riesgos e Inteligencia Estratégica.",
      rights: "© 2026 MyRiskExp. Todos los derechos reservados.",
    },
  },
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const palette = {
  navy: "#0F172A",
  dark: "#1E293B",
  mid: "#334155",
  slate: "#64748B",
  light: "#F1F5F9",
  white: "#FFFFFF",
  accent: "#2563EB",
  accentLight: "#DBEAFE",
  orange: "#F97316",
  red: "#DC2626",
  green: "#16A34A",
  gold: "#F59E0B",
};

// ─── MINI BAR CHART COMPONENT ─────────────────────────────────────────────────
function MiniBar({ data, maxVal }) {
  const max = maxVal || Math.max(...data.map((d) => parseFloat(d.pct)));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {data.map((d, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 120,
              fontSize: 13,
              color: palette.mid,
              textAlign: "right",
              flexShrink: 0,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {d.role || d.region}
          </span>
          <div
            style={{
              flex: 1,
              background: palette.light,
              borderRadius: 4,
              height: 22,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${(parseFloat(d.pct) / max) * 100}%`,
                background: d.color || palette.accent,
                height: "100%",
                borderRadius: 4,
                transition: "width 0.8s ease",
              }}
            />
          </div>
          <span
            style={{
              width: 50,
              fontSize: 13,
              fontWeight: 600,
              color: palette.dark,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {d.pct}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── CLUSTER SCATTER PLACEHOLDER ──────────────────────────────────────────────
function ClusterScatter() {
  const dots = [];
  const rng = (seed) => {
    let s = seed;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  };
  const r = rng(42);
  // Cluster 0 - blue - center-upper area
  for (let i = 0; i < 120; i++)
    dots.push({
      x: 30 + r() * 40,
      y: 20 + r() * 35,
      c: palette.accent,
      o: 0.6,
    });
  // Cluster 1 - red - right area
  for (let i = 0; i < 12; i++)
    dots.push({
      x: 65 + r() * 25,
      y: 30 + r() * 25,
      c: palette.red,
      o: 0.8,
    });
  // Cluster 2 - orange - lower-left area
  for (let i = 0; i < 55; i++)
    dots.push({
      x: 15 + r() * 45,
      y: 50 + r() * 35,
      c: palette.orange,
      o: 0.6,
    });
  // Cluster 3 - green - upper-left
  for (let i = 0; i < 12; i++)
    dots.push({
      x: 20 + r() * 25,
      y: 15 + r() * 30,
      c: palette.green,
      o: 0.8,
    });

  return (
    <svg viewBox="0 0 100 100" style={{ width: "100%", maxWidth: 500, height: "auto" }}>
      <rect x="0" y="0" width="100" height="100" fill={palette.light} rx="4" />
      <line x1="10" y1="50" x2="95" y2="50" stroke="#CBD5E1" strokeWidth="0.3" strokeDasharray="2" />
      <line x1="50" y1="5" x2="50" y2="95" stroke="#CBD5E1" strokeWidth="0.3" strokeDasharray="2" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={1.2} fill={d.c} opacity={d.o} />
      ))}
      {/* Centroids */}
      <text x="38" y="35" fontSize="4" fill={palette.accent} fontWeight="bold">✕</text>
      <text x="75" y="42" fontSize="4" fill={palette.red} fontWeight="bold">✕</text>
      <text x="35" y="68" fontSize="4" fill={palette.orange} fontWeight="bold">✕</text>
      <text x="30" y="28" fontSize="4" fill={palette.green} fontWeight="bold">✕</text>
    </svg>
  );
}

// ─── DONUT CHART ──────────────────────────────────────────────────────────────
function DonutChart({ segments, donutLabel }) {
  let cumulative = 0;
  const total = segments.reduce((a, s) => a + s.value, 0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg viewBox="0 0 120 120" style={{ width: 200, height: 200 }}>
      {segments.map((seg, i) => {
        const pct = seg.value / total;
        const offset = cumulative * circumference;
        cumulative += pct;
        return (
          <circle
            key={i}
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth="18"
            strokeDasharray={`${pct * circumference} ${circumference}`}
            strokeDashoffset={-offset}
            transform="rotate(-90 60 60)"
            opacity="0.85"
          />
        );
      })}
      <circle cx="60" cy="60" r="30" fill={palette.white} />
      <text x="60" y="58" textAnchor="middle" fontSize="10" fontWeight="700" fill={palette.dark} fontFamily="'DM Sans', sans-serif">
        4
      </text>
      <text x="60" y="68" textAnchor="middle" fontSize="5" fill={palette.slate} fontFamily="'DM Sans', sans-serif">
        {donutLabel}
      </text>
    </svg>
  );
}

// ─── GEO BAR ──────────────────────────────────────────────────────────────────
function GeoBar({ data }) {
  const max = Math.max(...data.map((d) => parseFloat(d.pct)));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {data.map((d, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 110, fontSize: 12, color: palette.mid, textAlign: "right", flexShrink: 0, fontFamily: "'DM Sans', sans-serif" }}>
            {d.region}
          </span>
          <div style={{ flex: 1, background: "#E2E8F0", borderRadius: 3, height: 18, overflow: "hidden" }}>
            <div
              style={{
                width: `${(parseFloat(d.pct) / max) * 100}%`,
                background: `linear-gradient(90deg, ${palette.accent}, #60A5FA)`,
                height: "100%",
                borderRadius: 3,
              }}
            />
          </div>
          <span style={{ width: 65, fontSize: 12, fontWeight: 600, color: palette.dark, fontFamily: "'DM Sans', sans-serif" }}>
            {d.pct} ({d.n})
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("en");
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const t = content[lang];

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:wght@600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  const sectionStyle = (bg) => ({
    padding: "72px 24px",
    maxWidth: 1080,
    margin: "0 auto",
    background: bg || "transparent",
  });

  const cardStyle = {
    background: palette.white,
    borderRadius: 12,
    padding: "28px 24px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
    border: `1px solid #E2E8F0`,
  };

  const sectionTitle = (title, subtitle) => (
    <div style={{ marginBottom: 40 }}>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 32,
          fontWeight: 700,
          color: palette.navy,
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            color: palette.slate,
            marginTop: 8,
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </p>
      )}
      <div
        style={{
          width: 48,
          height: 3,
          background: palette.accent,
          borderRadius: 2,
          marginTop: 16,
        }}
      />
    </div>
  );

  const proseMaxWidth = 820;

  const navItems = [
    ["overview", "hero"],
    ["summary", "summary"],
    ["context", "context"],
    ["data", "data"],
    ["method", "method"],
    ["findings", "findings"],
    ["visuals", "visuals"],
    ["implications", "implications"],
    ["recommendations", "recommendations"],
  ];

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        color: palette.dark,
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      <style>
        {`
          .nav-tabs {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .nav-tabs::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      {/* ─── NAV ─── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: scrolled ? "rgba(255,255,255,0.95)" : palette.white,
          backdropFilter: "blur(8px)",
          borderBottom: `1px solid ${scrolled ? "#E2E8F0" : "transparent"}`,
          transition: "all 0.3s ease",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 56,
          }}
        >
          {/* Logo area */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src={logo}
              alt="MyRiskExp — Risk Analysis & Strategic Intelligence"
              style={{ width: isMobile ? 32 : 36, height: isMobile ? 32 : 36, borderRadius: 6, objectFit: "contain" }}
            />
          </div>

          {/* Section nav tabs */}
          <div
            className="nav-tabs"
            style={{
              display: "flex",
              gap: isMobile ? 6 : 8,
              alignItems: "center",
              overflowX: "auto",
              flex: 1,
              justifyContent: "center",
              padding: "0 8px",
            }}
          >
            {navItems.map(([key, id]) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={key}
                  onClick={() => scrollTo(id)}
                  style={{
                    background: isActive ? palette.accent : "#E2E8F0",
                    border: isActive ? `1px solid ${palette.accent}` : "1px solid #CBD5E1",
                    padding: isMobile ? "6px 10px" : "6px 12px",
                    fontSize: isMobile ? 11 : 12,
                    color: isActive ? "#fff" : palette.mid,
                    cursor: "pointer",
                    borderRadius: 999,
                    whiteSpace: "nowrap",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    transition: "all 0.2s",
                  }}
                >
                  {t.nav[key]}
                </button>
              );
            })}
          </div>

          {/* Language toggle */}
          <div
            style={{
              display: "flex",
              background: palette.light,
              borderRadius: 8,
              padding: 3,
              gap: isMobile ? 2 : 4,
            }}
          >
            {["EN", "ES"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l.toLowerCase())}
                style={{
                  padding: isMobile ? "5px 10px" : "6px 14px",
                  fontSize: isMobile ? 11 : 12,
                  fontWeight: 600,
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  background:
                    lang === l.toLowerCase() ? palette.accent : "transparent",
                  color:
                    lang === l.toLowerCase() ? "#fff" : palette.slate,
                  transition: "all 0.2s",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section
        id="hero"
        style={{
          background: `linear-gradient(135deg, ${palette.navy} 0%, #1a365d 50%, #1e3a5f 100%)`,
          padding: "80px 24px 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.15), transparent 70%)",
          }}
        />
        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 20,
              padding: "5px 16px",
              fontSize: 12,
              color: "rgba(255,255,255,0.8)",
              marginBottom: 24,
              fontWeight: 500,
            }}
          >
            {t.badge}
          </div>
          <p
            style={{
              color: "#60A5FA",
              fontSize: 14,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 12,
            }}
          >
            {t.hero.subtitle}
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.15,
              margin: "0 0 20px",
              maxWidth: 700,
            }}
          >
            {t.hero.title}
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.6,
              maxWidth: isMobile ? 520 : 640,
              marginBottom: 32,
            }}
          >
            {t.hero.description}
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "stretch" : "center",
              marginBottom: 48,
            }}
          >
            {[
              [t.hero.cta1, "findings", palette.accent],
              [t.hero.cta2, "method", "transparent"],
              [t.hero.cta3, "recommendations", "transparent"],
            ].map(([label, id, bg], i) => (
              <button
                key={i}
                onClick={() => scrollTo(id)}
                style={{
                  padding: "10px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.25)",
                  borderRadius: 8,
                  cursor: "pointer",
                  background: bg,
                  color: "#fff",
                  width: isMobile ? "100%" : "auto",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.2s",
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : "repeat(auto-fit, minmax(140px, 1fr))",
              gap: isMobile ? 12 : 16,
            }}
          >
            {t.hero.stats.map((s, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10,
                  padding: "16px 20px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXECUTIVE SUMMARY ─── */}
      <section id="summary" style={sectionStyle()}>
        {sectionTitle(t.summary.title)}
        <p style={{ fontSize: 16, lineHeight: 1.7, color: palette.mid, marginBottom: 32, maxWidth: proseMaxWidth }}>
          {t.summary.intro}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {t.summary.takeaways.map((tk, i) => (
            <div key={i} style={{ ...cardStyle, borderLeft: `3px solid ${palette.accent}` }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{tk.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: palette.navy, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
                {tk.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: palette.mid, margin: 0 }}>{tk.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BUSINESS CONTEXT ─── */}
      <section id="context" style={{ background: palette.white }}>
        <div style={sectionStyle()}>
          {sectionTitle(t.context.title, t.context.subtitle)}
          <p style={{ fontSize: 16, lineHeight: 1.7, color: palette.mid, marginBottom: 32, maxWidth: proseMaxWidth }}>
            {t.context.problem}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 32 }}>
            {t.context.stakeholders.map((s, i) => (
              <div key={i} style={{ ...cardStyle, background: palette.light }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: palette.navy, marginBottom: 8 }}>{s.role}</h4>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: palette.mid, margin: 0 }}>{s.text}</p>
              </div>
            ))}
          </div>
          <div style={{ ...cardStyle, background: "#F0F9FF", borderColor: "#BAE6FD" }}>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: palette.mid, margin: 0 }}>{t.context.scope}</p>
          </div>
        </div>
      </section>

      {/* ─── DATA SCOPE ─── */}
      <section id="data" style={sectionStyle()}>
        {sectionTitle(t.dataScope.title, t.dataScope.subtitle)}
        <p style={{ fontSize: 15, lineHeight: 1.7, color: palette.mid, marginBottom: 28, maxWidth: proseMaxWidth }}>
          {t.dataScope.description}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14, marginBottom: 32 }}>
          {t.dataScope.items.map((item, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ fontSize: 12, textTransform: "uppercase", fontWeight: 600, color: palette.accent, letterSpacing: "0.05em", marginBottom: 6 }}>
                {item.label}
              </div>
              <div style={{ fontSize: 14, color: palette.dark, lineHeight: 1.5 }}>{item.value}</div>
            </div>
          ))}
        </div>
        <div style={{ ...cardStyle, background: "#FFFBEB", borderColor: "#FDE68A" }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: "#92400E", marginBottom: 12 }}>{t.dataScope.caveatTitle}</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {t.dataScope.caveats.map((c, i) => (
              <p key={i} style={{ fontSize: 13, color: "#78716C", margin: 0, lineHeight: 1.5, paddingLeft: 16, position: "relative" }}>
                <span style={{ position: "absolute", left: 0 }}>•</span> {c}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ─── METHOD ─── */}
      <section id="method" style={{ background: palette.white }}>
        <div style={sectionStyle()}>
          {sectionTitle(t.method.title, t.method.subtitle)}
          <p style={{ fontSize: 15, lineHeight: 1.7, color: palette.mid, marginBottom: 36, maxWidth: proseMaxWidth }}>
            {t.method.intro}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 32 }}>
            {t.method.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 20, marginBottom: 24, alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 2 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: palette.accent,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 15,
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  {i < t.method.steps.length - 1 && (
                    <div style={{ width: 2, flex: 1, background: "#E2E8F0", marginTop: 6 }} />
                  )}
                </div>
                <div style={{ paddingTop: 2 }}>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: palette.navy, marginBottom: 6 }}>{step.title}</h4>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: palette.mid, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ ...cardStyle, background: palette.light }}>
            <p style={{ fontSize: 13, color: palette.slate, margin: 0, fontStyle: "italic" }}>{t.method.artifacts}</p>
          </div>
        </div>
      </section>

      {/* ─── FINDINGS ─── */}
      <section id="findings" style={sectionStyle()}>
        {sectionTitle(t.findings.title, t.findings.subtitle)}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(auto-fill, minmax(280px, 1fr))" : "repeat(auto-fill, minmax(480px, 1fr))",
            gap: 20,
          }}
        >
          {t.findings.clusters.map((cl) => (
            <div
              key={cl.id}
              style={{
                ...cardStyle,
                borderTop: `4px solid ${cl.color}`,
                position: "relative",
              }}
            >
              {cl.riskFlag && (
                <span
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: "#FEF2F2",
                    color: "#DC2626",
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: 12,
                  }}
                >
                  ⚠ {t.labels.riskFlag}
                </span>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    background: cl.color + "15",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: 800,
                    color: cl.color,
                  }}
                >
                  {cl.id}
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: palette.navy, margin: 0 }}>{cl.name}</h3>
                  <span style={{ fontSize: 13, color: palette.slate }}>
                    {cl.pct} · {cl.count} {t.labels.candidates}
                  </span>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16, fontSize: 13 }}>
                {[
                  [t.labels.avgAge, cl.avgAge],
                  [t.labels.education, cl.education],
                  [t.labels.gender, cl.gender],
                  [t.labels.experience, cl.experience],
                  [t.labels.searchBehavior, cl.searchBehavior],
                ].map(([label, val], i) => (
                  <div key={i} style={{ padding: "6px 0" }}>
                    <span style={{ fontWeight: 600, color: palette.navy }}>{label}: </span>
                    <span style={{ color: palette.mid }}>{val}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: palette.slate, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Top {t.labels.topRoles}
                </div>
                <MiniBar data={cl.topRoles.map((r) => ({ ...r, color: cl.color }))} maxVal={50} />
              </div>
              <div style={{ background: palette.light, borderRadius: 8, padding: "12px 16px", fontSize: 13, lineHeight: 1.6, color: palette.mid }}>
                {cl.interpretation}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── VISUAL INSIGHTS ─── */}
      <section id="visuals" style={{ background: palette.white }}>
        <div style={sectionStyle()}>
          {sectionTitle(t.visuals.title, t.visuals.subtitle)}

          {/* Demographics */}
          <div style={{ marginBottom: 40 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: palette.navy, marginBottom: 16 }}>{t.visuals.demographicTitle}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
              {t.visuals.demographics.map((d, i) => (
                <div key={i} style={{ ...cardStyle, padding: "16px 20px" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: palette.accent, marginBottom: 4 }}>{d.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: palette.navy }}>{d.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Cluster dist + scatter */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 24,
              marginBottom: 40,
            }}
          >
            <div style={cardStyle}>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: palette.navy, marginBottom: 16 }}>{t.visuals.clusterDistTitle}</h4>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <DonutChart
                  segments={[
                    { value: 65.41, color: palette.accent },
                    { value: 2.19, color: palette.red },
                    { value: 29.91, color: palette.orange },
                    { value: 2.48, color: palette.green },
                  ]}
                  donutLabel={t.labels.donutSegments}
                />
                <div style={{ marginLeft: 20, fontSize: 13 }}>
                  {t.findings.clusters.map((cl) => (
                    <div key={cl.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 3, background: cl.color }} />
                      <span style={{ color: palette.mid }}>{cl.name}: {cl.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={cardStyle}>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: palette.navy, marginBottom: 8 }}>{t.visuals.mapTitle}</h4>
              <p style={{ fontSize: 12, color: palette.slate, marginBottom: 12, lineHeight: 1.5 }}>{t.visuals.mapDesc}</p>
              <ClusterScatter />
            </div>
          </div>

          {/* Geographic */}
          <div style={{ ...cardStyle, marginBottom: 24 }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: palette.navy, marginBottom: 16 }}>{t.visuals.geoTitle}</h4>
            <GeoBar data={t.visuals.geoData} />
          </div>
        </div>
      </section>

      {/* ─── IMPLICATIONS ─── */}
      <section id="implications" style={sectionStyle()}>
        {sectionTitle(t.implications.title, t.implications.subtitle)}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))", gap: 20 }}>
          {t.implications.functions.map((fn, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>{fn.icon}</span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: palette.navy, margin: 0 }}>{fn.name}</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {fn.items.map((item, j) => (
                  <p key={j} style={{ fontSize: 14, lineHeight: 1.6, color: palette.mid, margin: 0, paddingLeft: 16, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: palette.accent, fontWeight: 700 }}>→</span>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── RECOMMENDATIONS ─── */}
      <section id="recommendations" style={{ background: palette.white }}>
        <div style={sectionStyle()}>
          {sectionTitle(t.recommendations.title, t.recommendations.subtitle)}
          {[t.recommendations.shortTerm, t.recommendations.mediumTerm, t.recommendations.monitoring, t.recommendations.inaction].map(
            (section, si) => (
              <div key={si} style={{ marginBottom: 28 }}>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: si === 3 ? palette.red : palette.navy,
                    marginBottom: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {si === 3 && "⚠️ "}
                  {section.title}
                </h3>
                <div
                  style={{
                    ...cardStyle,
                    background: si === 3 ? "#FEF2F2" : palette.light,
                    borderColor: si === 3 ? "#FECACA" : "#E2E8F0",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {section.items.map((item, j) => (
                      <p key={j} style={{ fontSize: 14, lineHeight: 1.6, color: palette.mid, margin: 0, paddingLeft: 20, position: "relative" }}>
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            color: si === 3 ? palette.red : palette.accent,
                            fontWeight: 700,
                            fontSize: 13,
                          }}
                        >
                          {si < 2 ? `${j + 1}.` : si === 2 ? "◉" : "!"}
                        </span>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* ─── LIMITATIONS ─── */}
      <section id="limitations" style={sectionStyle()}>
        {sectionTitle(t.limitations.title, t.limitations.subtitle)}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {t.limitations.items.map((item, i) => (
            <div key={i} style={{ ...cardStyle, borderLeft: `3px solid ${palette.gold}` }}>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: palette.navy, marginBottom: 6 }}>{item.title}</h4>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: palette.mid, margin: 0 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── APPENDIX ─── */}
      <section id="appendix" style={{ background: palette.white }}>
        <div style={sectionStyle()}>
          {sectionTitle(t.appendix.title, t.appendix.subtitle)}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            {t.appendix.notes.map((note, i) => (
              <div key={i} style={{ ...cardStyle, background: palette.light }}>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: palette.mid, margin: 0 }}>{note}</p>
              </div>
            ))}
          </div>
          <div style={{ ...cardStyle, borderLeft: `3px solid ${palette.accent}` }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: palette.accent, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
              {t.labels.techStack}
            </div>
            <p style={{ fontSize: 14, color: palette.mid, margin: 0, fontFamily: "monospace" }}>{t.appendix.techStack}</p>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        style={{
          background: palette.navy,
          padding: "40px 24px",
          borderTop: `3px solid ${palette.accent}`,
        }}
      >
        <div style={{ maxWidth: 1080, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 4, fontWeight: 600 }}>{t.footer.credits}</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 8, lineHeight: 1.5 }}>{t.footer.developed}</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>{t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}
