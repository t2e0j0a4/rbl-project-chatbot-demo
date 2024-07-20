import React, { useState, useRef, useEffect } from "react";
import styles from "./App.module.css";

const mentalHealthResponses = [
  {
    keywords: ["hey", "hi", "hello", "hey hi bot."],
    response: "Hey user! how are you? If you have any questions on mental health related feel free to ask me.",
  },
  {
    keywords: ["what should i do", "how can i", "help me"],
    response:
      "I understand you're looking for advice. While I can provide general information, it's always best to consult with a healthcare professional for personalized guidance.",
  },
  {
    keywords: ["brain", "head", "headache", "migraine"],
    response:
      "Headaches can have various causes. Make sure you're staying hydrated, getting enough rest, and managing stress. If headaches persist or are severe, please consult a doctor.",
  },
  {
    keywords: ["cant focus", "focus", "concentrate", "concentration"],
    response:
      "Difficulty focusing can be related to various factors like stress, lack of sleep, or underlying health issues. Try breaking tasks into smaller parts, taking regular breaks, and ensuring you're getting enough sleep.",
  },
  {
    keywords: ["tired", "fatigue", "exhausted"],
    response:
      "Feeling constantly tired can impact mental health. Ensure you're getting enough sleep, eating a balanced diet, and exercising regularly. If fatigue persists, consider talking to a doctor.",
  },
  {
    keywords: ["motivation", "unmotivated"],
    response:
      "Lack of motivation can be challenging. Try setting small, achievable goals, rewarding yourself for accomplishments, and remember it's okay to have off days.",
  },
  {
    keywords: ["relationship", "partner", "friend"],
    response:
      "Relationships can greatly affect our mental health. Open communication, setting boundaries, and seeking couples therapy if needed can be helpful in managing relationship challenges.",
  },
  {
    keywords: ["work", "job", "career"],
    response:
      "Work-related stress is common. Try to maintain a work-life balance, communicate with your supervisor about concerns, and practice stress-management techniques.",
  },
  {
    keywords: ["family", "parents", "siblings"],
    response:
      "Family dynamics can be complex and impact mental health. Setting boundaries, open communication, and family therapy can be beneficial in managing family-related stress.",
  },
  {
    keywords: ["school", "study", "exam"],
    response:
      "Academic stress is common. Create a study schedule, take regular breaks, and don't hesitate to ask for help from teachers or counselors if you're feeling overwhelmed.",
  },
  {
    keywords: ["body", "weight", "appearance"],
    response:
      "Body image concerns can affect mental health. Remember that all bodies are different, and it's important to focus on overall health rather than appearance. Consider talking to a therapist about body image issues.",
  },
  {
    keywords: ["friend", "social", "people"],
    response:
      "Social interactions are important for mental health. If you're having difficulties, consider joining clubs or groups with shared interests, or practice social skills with a therapist.",
  },
  {
    keywords: ["future", "worry about future"],
    response:
      "Worrying about the future is common. Try to focus on what you can control in the present, set realistic goals, and remember that it's okay to take things one step at a time.",
  },
  {
    keywords: ["overwhelmed", "too much"],
    response:
      "Feeling overwhelmed is challenging. Break tasks into smaller, manageable parts, prioritize self-care, and don't hesitate to ask for help when you need it.",
  },
  {
    keywords: ["purpose", "meaning"],
    response:
      "Questioning life's purpose is a common existential concern. Explore activities that give you a sense of fulfillment, consider volunteering, or talk to a therapist about finding meaning in life.",
  },
  {
    keywords: ["change", "afraid of change"],
    response:
      "Change can be scary but it's a natural part of life. Try to focus on the potential positive outcomes of change and remember that adapting to new situations is a skill that can be developed.",
  },
  {
    keywords: ["anxious", "anxiety", "worried"],
    response:
      "It's common to feel anxious. Try deep breathing exercises or consider talking to a therapist for more support.",
  },
  {
    keywords: ["depressed", "depression", "sad"],
    response:
      "I'm sorry you're feeling this way. Depression is treatable, and it's important to reach out to a mental health professional for help.",
  },
  {
    keywords: ["stress", "stressed"],
    response:
      "Stress can be overwhelming. Consider practicing mindfulness, exercising, or talking to someone you trust about your feelings.",
  },
  {
    keywords: ["sleep", "insomnia", "can't sleep"],
    response:
      "Sleep problems can greatly affect mental health. Try establishing a regular sleep routine and avoiding screens before bedtime.",
  },
  {
    keywords: ["lonely", "alone"],
    response:
      "Feeling lonely is difficult. Consider reaching out to friends, joining social groups, or volunteering to connect with others.",
  },
  {
    keywords: ["panic", "panic attack"],
    response:
      "Panic attacks can be frightening. Try grounding techniques like the 5-4-3-2-1 method and remember that the feeling will pass.",
  },
  {
    keywords: ["self-esteem", "confidence"],
    response:
      "Building self-esteem takes time. Focus on your strengths and practice self-compassion.",
  },
  {
    keywords: ["trauma", "ptsd"],
    response:
      "Trauma can have lasting effects. It's important to work with a trauma-informed therapist to process your experiences.",
  },
  {
    keywords: ["therapy", "therapist", "counseling"],
    response:
      "Seeking therapy is a great step towards better mental health. A therapist can provide personalized support and coping strategies.",
  },
  {
    keywords: ["medication", "antidepressants"],
    response:
      "Medication can be helpful for some people. It's important to discuss options with a psychiatrist or your healthcare provider.",
  },
  {
    keywords: ["suicide", "suicidal"],
    response:
      "If you're having thoughts of suicide, please reach out for help immediately. Contact a crisis hotline or emergency services.",
  },
  {
    keywords: ["mindfulness", "meditation"],
    response:
      "Mindfulness and meditation can be powerful tools for mental health. There are many apps and resources available to get started.",
  },
  {
    keywords: ["exercise", "workout"],
    response:
      "Regular exercise can significantly improve mood and reduce symptoms of anxiety and depression.",
  },
  {
    keywords: ["addiction", "substance abuse"],
    response:
      "Addiction is a complex issue that often requires professional help. Consider reaching out to a substance abuse counselor or support group.",
  },
  {
    keywords: ["bipolar", "mood swings"],
    response:
      "Bipolar disorder involves significant mood changes. It's important to work with a psychiatrist for proper diagnosis and treatment.",
  },
  {
    keywords: ["eat", "eating disorder"],
    response:
      "Eating disorders are serious conditions that require professional help. Please consult with a healthcare provider or specialist.",
  },
  {
    keywords: ["ocd", "obsessive"],
    response:
      "OCD can be challenging to manage. Cognitive-behavioral therapy (CBT) and exposure therapy can be effective treatments.",
  },
  {
    keywords: ["grief", "loss"],
    response:
      "Grief is a natural response to loss. Allow yourself to feel your emotions and consider joining a grief support group.",
  },
  {
    keywords: ["anger", "angry"],
    response:
      "Managing anger is important for mental health. Try anger management techniques or consider working with a therapist.",
  },
  {
    keywords: ["self-care", "self care"],
    response:
      "Self-care is crucial for mental health. Make time for activities you enjoy and that help you relax.",
  },
];

const App = () => {
  const [messages, setMessages] = useState([
    {
      isUser: false,
      text: "Hello! I'm here to provide information and support on mental health topics. Feel free to ask me about issues like anxiety, depression, stress, sleep problems, self-esteem, trauma, therapy, medication, mindfulness, exercise, addiction, eating disorders, grief, anger management, or self-care. You can also ask for general advice on topics like motivation, relationships, work-life balance, or dealing with change. Remember, I'm here to offer general guidance, but for specific concerns, it's always best to consult with a mental health professional. What would you like to know about?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getBotResponse = (userMessage) => {
    console.log(userMessage)
    const lowerCaseMessage = userMessage.toLowerCase();

    for (const item of mentalHealthResponses) {
      if (item.keywords.some((keyword) => lowerCaseMessage.includes(keyword.toLowerCase()))) {
        return item.response;
      }
    }

    return "I'm here to discuss mental health topics. Could you please rephrase your question or ask about a specific mental health concern?";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const response = getBotResponse(input);
      setMessages((prev) => [...prev, { text: response, isUser: false }]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className={styles.container}>
      <h1>Mind Mate</h1>
      <p>AI Chatbot for Mental Health</p>
      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                message.isUser ? styles.userMessage : styles.botMessage
              }`}
            >
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className={styles.inputContainer}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className={styles.input}
            disabled={isLoading}
          />
          <button
            type="submit"
            className={styles.sendButton}
            disabled={isLoading}
          >
            {isLoading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
