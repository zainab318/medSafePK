# 🤖 MedSafe Assistant Chatbot - Quick Setup Guide

## ⚡ Quick Start (5 minutes)

### Step 1: Get Your Gemini API Key

1. **Visit:** https://makersuite.google.com/app/apikey
2. **Sign in** with your Google account
3. **Click** "Create API Key"
4. **Copy** the generated key

### Step 2: Create Environment File

1. In the project root (`C:\Users\Admin\Documents\MedSafePK`), create a file named `.env`
2. Add this line:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```
3. Replace `your_actual_api_key_here` with the key you copied
4. Save the file

**Example `.env` file:**
```
VITE_GEMINI_API_KEY=AIzaSyDXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Step 3: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Test the Chatbot

1. **Login** as a Patient
2. Look for the **floating chat button** (bottom-right corner)
3. **Click** the button to open MedSafe Assistant
4. **Try asking:** "When should I take Panadol?"

---

## 🧪 Test Questions

Try these questions to test the chatbot:

### **Questions About Local Database (Instant Responses):**
- "When should I take Panadol?"
- "Can I take Brufen with milk?"
- "What are the side effects of Augmentin?"
- "How much Glucophage should I take?"
- "Tell me about Risek"

### **Expected:** Fast response with ✓ Verified Database badge

---

## 🔧 Troubleshooting

### **Problem: Chatbot button doesn't appear**
**Solution:** Make sure you're logged in as a **Patient**, not Doctor or Pharmacy

### **Problem: "API call failed" error**
**Solutions:**
1. Check if `.env` file exists in project root
2. Verify API key is correct (no extra spaces)
3. Make sure you restarted the dev server after creating `.env`
4. Check if your API key has quota remaining

### **Problem: Slow or no responses**
**Solutions:**
1. Check your internet connection
2. Verify Gemini API service status
3. Try a simpler question first
4. Check browser console for errors (F12)

---

## 🆓 Gemini API Free Tier

Gemini offers a generous free tier:
- **60 requests per minute**
- **1 million tokens per minute**
- **Completely FREE** for development

**More than enough for testing!**

---

## 📱 How to Use

### **Opening the Chatbot:**
- Click the **floating button** in the bottom-right corner
- Button says "Ask MedSafe Assistant" on hover

### **Asking Questions:**
1. Type your question in the input box
2. Press **Enter** or click **Send**
3. Wait for response (local: instant, AI: 2-3 seconds)

### **Quick Actions:**
- First time users see quick action buttons
- Click any button to auto-fill the question

### **Closing the Chatbot:**
- Click the **X** button in the top-right
- Or click outside the chat window

---

## 🎯 What the Chatbot Can Do

✅ **Answer questions about 30 common Pakistani medicines**
✅ **Explain dosage and timing**
✅ **Check food/milk interactions**
✅ **List side effects and warnings**
✅ **Provide general medication info (via AI)**
✅ **Give pregnancy safety information**
✅ **Explain contraindications**

❌ **What it CANNOT do:**
- Diagnose medical conditions
- Prescribe new medications
- Replace doctor consultations
- Provide emergency medical advice

---

## 🔒 Privacy

- ✅ No conversation logging
- ✅ No data storage
- ✅ No third-party sharing
- ✅ Session-only memory
- ✅ Secure HTTPS connections

---

## 💡 Pro Tips

1. **Use brand names** for better results (e.g., "Panadol" not just "paracetamol")
2. **Ask specific questions** (e.g., "When to take" vs "Tell me everything")
3. **One drug at a time** for clearer answers
4. **Check the badge** to know if info is verified or AI-generated
5. **Always follow your doctor's prescription** - chatbot is for information only

---

## 📞 Need Help?

- **Full Documentation:** See `MEDSAFE_ASSISTANT_GUIDE.md`
- **Drug Database:** Check `src/data/drugs.json` for included medicines
- **Technical Issues:** Check browser console (F12) for errors

---

## 🚀 You're Ready!

Your MedSafe Assistant is now ready to help patients understand their medications safely and clearly.

**Happy Testing!** 🎉

