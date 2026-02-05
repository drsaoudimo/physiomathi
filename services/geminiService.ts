import { GoogleGenAI } from "@google/genai";
import { AIResponse } from "../types";
import { THEOREMS } from "../constants";

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

const formatError = (error: any): AIResponse => {
  console.error("AI Service Error:", error);
  let errorType: AIResponse['errorType'] = 'GENERATION';
  
  if (error.message?.includes('403') || error.status === 403) {
    errorType = 'API_KEY';
  } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
    errorType = 'CONNECTION';
  }

  return {
    success: false,
    content: "",
    errorType
  };
};

export const mineUnknownTheories = async (
  topic: string, 
  language: 'fr' | 'ar', 
  isResearcherMode: boolean,
  modelName: string
): Promise<AIResponse> => {
  const ai = getAIClient();
  if (!ai) return { success: false, content: "", errorType: 'API_KEY' };

  const prompt = `
    Role: You are an avant-garde Theoretical Biomathematician specializing in **${topic || "Neuro-Immune Interaction"}**.
    
    **Language Requirement:** Output strictly in **${language === 'fr' ? "FRENCH" : "ARABIC"}**.

    **Goal:** Propose a hypothetical, scientifically rigorous theory that connects Neural Fields (Consciousness) with Immune Responses via Topological dynamics.

    **Requirements:**
    1. **Name**: Create a novel syndrome or effect name (e.g., "The Cytokine-Topology Paradox").
    2. **Formalism**: Use Differential Geometry or Topology terminology (e.g., manifolds, fiber bundles, homology groups).
    3. **Equation**: Propose a hypothetical LaTeX equation connecting $Psi$ (Psi field) to $I_{cyt}$ (Immune Cytokines).
    4. **Prediction**: What verifiable physiological phenomenon does this theory predict?

    Format: Markdown with LaTeX ($$ ... $$ for block, $ ... $ for inline) for math.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt
    });
    
    if (!response.text) throw new Error("Empty response");
    
    return {
      success: true,
      content: response.text
    };
  } catch (error) {
    return formatError(error);
  }
};

export const generateScientificArticle = async (
  topic: string, 
  language: 'fr' | 'ar',
  modelName: string
): Promise<AIResponse> => {
  const ai = getAIClient();
  if (!ai) return { success: false, content: "", errorType: 'API_KEY' };

  const theoremsContext = THEOREMS.map(t => `${t.title[language]}: ${t.description[language]}`).join('\n');

  const prompt = `
    Role: You are a Distinguished Professor of Mathematical Physiology writing for a top-tier journal (e.g., Nature, The Lancet Digital Health).
    
    **Language Requirement:** Output strictly in **${language === 'fr' ? "FRENCH" : "ARABIC"}**.

    **Topic:** ${topic} (Focus on the Formal Mathematical Model of Hypertension and Consciousness).

    **CRITICAL REQUIREMENT:**
    You must explicitly connect the **Consciousness Field Model (PFTC)** to the following Formal Theorems in the text. Explain how each theorem influences the PFTC equations and the Diagnostic Metric ($M_{Di}$).

    **Theorems to Integrate:**
    ${theoremsContext}

    **Structure:**
    1. **Abstract**: High-level summary.
    2. **Mathematical Formulation**: 
       - Define the pathology using PFTC variables: $Psi$ (Consciousness), $alpha$ (Integration), $\\beta$ (Inhibition).
       - Provide the **Master Equation** in LaTeX.
    3. **Theorem Analysis**: Dedicated section connecting Thm 4, 5, 6, 8, 10 to the model.
    4. **Digital Therapeutics**:
       - Discuss how Digital signals (Gamma/Alpha modulation) act as control inputs $u(t)$ to shift the attractor (Thm 6).
       - Analyze impact on $M_{Di}$ (Diagnostic Metric).
    5. **Conclusion**.

    **Format:** Professional Markdown. Use strict LaTeX ($$ ... $$ for block, $ ... $ for inline) for all equations.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt
    });

    if (!response.text) throw new Error("Empty response");

    return {
      success: true,
      content: response.text
    };
  } catch (error) {
    return formatError(error);
  }
};
