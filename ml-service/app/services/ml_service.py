import os
import json
import asyncio
import re
import google.generativeai as genai
from typing import Dict, List, Optional
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()


class MLService:
    def __init__(self):
        # Load API key
        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment")

        # Configure Gemini
        genai.configure(api_key=api_key)

        # Initialize model
        self.llm = genai.GenerativeModel("gemini-2.5-flash")

    async def generate_response(self, message: str) -> Dict:
        """
        Main entry point for ML service
        """
        context = await self._retrieve_context(message)
        llm_output = await self._call_llm(message, context)
        return llm_output

    async def _retrieve_context(self, message: str) -> Optional[List[str]]:
        """
        Placeholder for future RAG / embeddings
        """
        return None

    async def _call_llm(self, message: str, context: Optional[List[str]]) -> Dict:
        """
        Calls Gemini and safely parses response
        """
        prompt = self._build_prompt(message, context)

        try:
            loop = asyncio.get_event_loop()

            response = await loop.run_in_executor(
                None,
                lambda: self.llm.generate_content(prompt)
            )

            text = response.text.strip()

            # Extract JSON safely
            return self._extract_json(text)

        except Exception as e:
            return {
                "is_scam": False,
                "risk_level": "unknown",
                "reason": f"Error: {str(e)}"
            }

    def _extract_json(self, text: str) -> Dict:
        """
        Handles messy LLM outputs:
        - Markdown blocks
        - Extra text
        - Partial JSON
        """
        try:
            # Remove markdown formatting
            text = re.sub(r"```json|```", "", text).strip()

            # Extract JSON block
            match = re.search(r"\{.*\}", text, re.DOTALL)
            if match:
                return json.loads(match.group())

        except Exception:
            pass

        return {
            "is_scam": False,
            "risk_level": "unknown",
            "reason": "Failed to parse model output"
        }

    def _build_prompt(self, message: str, context: Optional[List[str]]) -> str:
        return f"""
        You are a cybersecurity assistant.

        Analyze the message and determine if it is likely a scam.

        Be cautious:
        - Do NOT label something as a scam unless there are clear suspicious signals
        - If the message is ambiguous or could be normal, mark it as NOT a scam

        Message: "{message}"

        Return ONLY JSON:
        {{
            "is_scam": true or false,
            "risk_level": "low | medium | high",
            "reason": "short explanation"
        }}
    """