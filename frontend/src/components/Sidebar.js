// src/components/Sidebar.js
import React, { useState } from "react";
import "../Sidebar.css"; // Optional CSS for styling

const rolesData = {
  doctor: {
    chapters: {
      "Chapter 1: Clinical Evaluation and Diagnosis": {
        topics: {
          "Female Infertility Assessment": {
            title: "Female Infertility Assessment",
            questions: [
              "What are the key components of history-taking in female infertility?",
              "How is PCOS identified during a physical exam?",
              "What are common diagnostic tests used to assess female fertility?",
            ],
          },
          "Male Infertility Assessment": {
            title: "Male Infertility Assessment",
            questions: [
              "What factors are considered in male infertility history-taking?",
              "How is semen analysis conducted and interpreted?",
              "What advanced tests are used in male infertility evaluation?",
            ],
          },
          "Comprehensive Diagnosis": {
            title: "Comprehensive Diagnosis",
            questions: [
              "How do you formulate a comprehensive infertility diagnosis?",
              "What role do hormonal tests play in diagnosis?",
              "What are common differential diagnoses in infertility?",
            ],
          },
        },
      },
      "Chapter 2: Treatment Protocols and Monitoring": {
        topics: {
          "Ovarian Stimulation": {
            title: "Ovarian Stimulation",
            questions: [
              "What are the different ovarian stimulation protocols?",
              "How do you monitor ovarian response during stimulation?",
              "What are common complications of ovarian stimulation?",
            ],
          },
          "Managing Treatment Complications": {
            title: "Managing Treatment Complications",
            questions: [
              "What are strategies to prevent and manage OHSS?",
              "How do you manage patients with poor ovarian response?",
              "What are the protocols for managing high-risk patients?",
            ],
          },
          "Monitoring Treatment Response": {
            title: "Monitoring Treatment Response",
            questions: [
              "How do you assess treatment response during ovarian stimulation?",
              "What is the significance of monitoring estradiol levels?",
              "How do you handle suboptimal treatment responses?",
            ],
          },
        },
      },
      "Chapter 3: IVF Procedures and Techniques": {
        topics: {
          "Oocyte Retrieval": {
            title: "Oocyte Retrieval",
            questions: [
              "What are the steps in ultrasound-guided oocyte retrieval?",
              "What precautions should be taken during oocyte retrieval?",
              "What are common complications of oocyte retrieval?",
            ],
          },
          "Embryo Transfer": {
            title: "Embryo Transfer",
            questions: [
              "What are best practices during embryo transfer?",
              "How do you optimize conditions for implantation success?",
              "How is embryo selection performed prior to transfer?",
            ],
          },
          "Cryopreservation": {
            title: "Cryopreservation",
            questions: [
              "What are key principles of embryo cryopreservation?",
              "How do you assess embryo viability post-thaw?",
              "What are the advantages of vitrification over slow freezing?",
            ],
          },
        },
      },
      "Chapter 4: Procedure-Specific Training": {
        topics: {
          "Sperm Retrieval Techniques": {
            title: "Sperm Retrieval Techniques",
            questions: [
              "What are the indications for TESA and PESA?",
              "How do you prepare patients for surgical sperm retrieval?",
              "What is the role of sperm DNA fragmentation testing?",
            ],
          },
          "ICSI Techniques": {
            title: "ICSI Techniques",
            questions: [
              "What are key steps in performing ICSI?",
              "What are common errors during sperm injection?",
              "How do you manage equipment calibration for ICSI?",
            ],
          },
        },
      },
      "Chapter 5: Complications Management": {
        topics: {
          "OHSS Management": {
            title: "OHSS Management",
            questions: [
              "How is OHSS severity classified?",
              "What are effective strategies for preventing OHSS?",
              "How do you manage severe cases of ovarian hyperstimulation?",
            ],
          },
          "Early Pregnancy Complications": {
            title: "Early Pregnancy Complications",
            questions: [
              "How do you manage ectopic pregnancies?",
              "What are the steps to manage early pregnancy losses?",
              "How do you counsel patients following a miscarriage?",
            ],
          },
        },
      },
      "Chapter 6: Patient Counseling and Management": {
        topics: {
          "Pre-IVF Counseling": {
            title: "Pre-IVF Counseling",
            questions: [
              "What are key components of pre-treatment counseling?",
              "How do you set realistic expectations for IVF success?",
              "What are common psychological concerns in IVF patients?",
            ],
          },
        },
      },
      "Chapter 7: Ethics and Legal Aspects": {
        topics: {
          "Informed Consent": {
            title: "Informed Consent",
            questions: [
              "What should be covered in informed consent discussions?",
              "What are legal implications of embryo ownership?",
              "How do you address ethical concerns in third-party reproduction?",
            ],
          },
        },
      },
    },
  },
  embryologist: {
    chapters: {
      "Chapter 1: Lab Setup and Equipment Management": {
        topics: {
          "Laboratory Setup": {
            title: "Laboratory Setup",
            questions: [
              "What are the essential components of a sterile lab environment?",
              "How should lab equipment be organized to optimize workflow?",
              "What are the recommended air quality standards in an embryology lab?",
            ],
          },
          "Lab Safety Protocols": {
            title: "Lab Safety Protocols",
            questions: [
              "What are the safety precautions for handling cryogenic materials?",
              "How do you ensure the safe storage of embryos and gametes?",
              "What are the key protocols to prevent cross-contamination in the lab?",
            ],
          },
        },
      },
      "Chapter 2: Oocyte and Embryo Handling": {
        topics: {
          "Oocyte Collection and Assessment": {
            title: "Oocyte Collection and Assessment",
            questions: [
              "How is oocyte maturity assessed (GV, MI, MII classification)?",
              "What are the steps for safe handling of retrieved oocytes?",
              "What are the quality control measures for oocyte handling?",
            ],
          },
          "Embryo Culture": {
            title: "Embryo Culture",
            questions: [
              "What are the key stages of embryo development during culture?",
              "How do you maintain optimal embryo culture conditions?",
              "What are common indicators of embryo viability?",
            ],
          },
          "Blastocyst Formation": {
            title: "Blastocyst Formation",
            questions: [
              "What factors influence blastocyst formation?",
              "How do you assess blastocyst quality based on ICM and TE?",
              "What are the advantages of extended embryo culture?",
            ],
          },
        },
      },
      "Chapter 3: Fertilization Techniques": {
        topics: {
          "IVF Procedure": {
            title: "IVF Procedure",
            questions: [
              "How is insemination performed during conventional IVF?",
              "What factors influence fertilization rates in IVF?",
              "How do you assess fertilization based on pronuclear appearance?",
            ],
          },
          "ICSI Procedure": {
            title: "ICSI Procedure",
            questions: [
              "What are the key steps involved in performing ICSI?",
              "What equipment calibration is necessary for successful ICSI?",
              "What are common challenges during sperm injection?",
            ],
          },
        },
      },
      "Chapter 4: Cryopreservation and Thawing": {
        topics: {
          "Vitrification Technique": {
            title: "Vitrification Technique",
            questions: [
              "What are the key steps in embryo vitrification?",
              "What are the advantages of vitrification over slow freezing?",
              "How do you prevent cryo-injury during vitrification?",
            ],
          },
          "Embryo Thawing": {
            title: "Embryo Thawing",
            questions: [
              "What is the recommended protocol for embryo thawing?",
              "How do you assess embryo viability post-thaw?",
              "What are potential challenges during the thawing process?",
            ],
          },
        },
      },
      "Chapter 5: Advanced Technologies in Embryology": {
        topics: {
          "Time-Lapse Imaging": {
            title: "Time-Lapse Imaging",
            questions: [
              "What are the benefits of using time-lapse imaging in embryo culture?",
              "How is embryo morphokinetics analyzed using time-lapse technology?",
              "What are key parameters to evaluate in time-lapse analysis?",
            ],
          },
          "AI Tools in Embryology": {
            title: "AI Tools in Embryology",
            questions: [
              "How can AI enhance embryo selection and grading?",
              "What are ethical considerations in using AI for embryo assessment?",
              "What are the limitations of current AI tools in embryology?",
            ],
          },
        },
      },
      "Chapter 6: Quality Control and Assurance": {
        topics: {
          "Quality Control Metrics": {
            title: "Quality Control Metrics",
            questions: [
              "What are common quality control metrics in an embryology lab?",
              "How do you monitor key performance indicators (KPIs)?",
              "What protocols ensure consistent lab performance?",
            ],
          },
          "Emergency Protocols": {
            title: "Emergency Protocols",
            questions: [
              "What are the steps for handling equipment failures (e.g., incubator breakdown)?",
              "How do you implement backup systems in the lab?",
              "What are emergency protocols for preserving gametes and embryos?",
            ],
          },
        },
      },
      "Chapter 7: Ethics and Legal Aspects in Embryology": {
        topics: {
          "Embryo Handling Ethics": {
            title: "Embryo Handling Ethics",
            questions: [
              "What are ethical guidelines for embryo handling and storage?",
              "How do you address legal issues in embryo cryopreservation?",
              "What are ethical concerns surrounding embryo disposal?",
            ],
          },
          "Informed Consent in ART": {
            title: "Informed Consent in ART",
            questions: [
              "What key information should be included in the informed consent process for ART procedures?",
              "How do you ensure patients understand the risks of embryo cryopreservation?",
              "What are the legal rights of patients regarding stored embryos?",
            ],
          },
        },
      },
    },
  },
  counsellor: {
    chapters: {
      "Chapter 1: Patient Communication and Emotional Support": {
        topics: {
          "Handling Patient Queries": {
            title: "Handling Patient Queries",
            questions: [
              "How do you effectively handle patient queries about infertility?",
              "What techniques help build trust when answering patient questions?",
              "How do you maintain professionalism while addressing patient concerns?",
            ],
          },
          "Breaking Bad News": {
            title: "Breaking Bad News",
            questions: [
              "What are best practices for communicating adverse outcomes?",
              "How do you support patients emotionally when delivering bad news?",
              "How can empathy help when discussing unsuccessful IVF outcomes?",
            ],
          },
        },
      },
      "Chapter 2: Counseling Best Practices": {
        topics: {
          "Effective Counseling Techniques": {
            title: "Effective Counseling Techniques",
            questions: [
              "What are active listening techniques in patient counseling?",
              "How does empathy enhance the counseling experience?",
              "What strategies can help manage difficult patient conversations?",
            ],
          },
          "Cultural Sensitivity": {
            title: "Cultural Sensitivity",
            questions: [
              "How do you adapt counseling techniques to culturally diverse patients?",
              "What are some strategies to handle culturally sensitive topics?",
              "How can cultural differences impact fertility treatment decisions?",
            ],
          },
        },
      },
      "Chapter 3: Ethical Considerations in Counseling": {
        topics: {
          "Informed Consent": {
            title: "Informed Consent",
            questions: [
              "What are key components to explain during informed consent?",
              "How do you ensure that patients understand treatment risks?",
              "What legal considerations should be included in the informed consent process?",
            ],
          },
          "Confidentiality": {
            title: "Confidentiality",
            questions: [
              "What are ethical principles for maintaining patient confidentiality?",
              "How do you handle situations where confidentiality may be at risk?",
              "How do privacy laws impact fertility counseling practices?",
            ],
          },
        },
      },
      "Chapter 4: Psychological Support and Counseling": {
        topics: {
          "Managing Emotional Distress": {
            title: "Managing Emotional Distress",
            questions: [
              "What are signs of emotional distress in patients undergoing fertility treatment?",
              "How can cognitive behavioral therapy (CBT) help manage patient anxiety?",
              "What resources can be provided to patients experiencing grief and loss?",
            ],
          },
          "Building Resilience": {
            title: "Building Resilience",
            questions: [
              "How do you help patients build resilience during infertility treatment?",
              "What coping strategies can improve emotional well-being?",
              "How do support groups contribute to patient resilience?",
            ],
          },
        },
      },
      "Chapter 5: Lifestyle Counseling": {
        topics: {
          "Lifestyle Modifications": {
            title: "Lifestyle Modifications",
            questions: [
              "How do lifestyle factors impact fertility outcomes?",
              "What dietary recommendations can improve fertility?",
              "What exercise routines are suitable for patients undergoing IVF?",
            ],
          },
          "Stress Management": {
            title: "Stress Management",
            questions: [
              "How does stress affect fertility and IVF success rates?",
              "What stress-reduction techniques are most effective for fertility patients?",
              "How can mindfulness-based stress reduction (MBSR) benefit patients?",
            ],
          },
        },
      },
      "Chapter 6: Ethical and Legal Counseling in ART": {
        topics: {
          "Third-Party Reproduction Ethics": {
            title: "Third-Party Reproduction Ethics",
            questions: [
              "What ethical considerations are involved in third-party reproduction?",
              "How do you counsel patients on the legal implications of using donor gametes?",
              "What are key ethical concerns in surrogacy arrangements?",
            ],
          },
          "Patient Rights and Legal Issues": {
            title: "Patient Rights and Legal Issues",
            questions: [
              "What legal rights do patients have regarding stored embryos?",
              "How do you ensure patients understand the legal aspects of ART procedures?",
              "What ethical dilemmas can arise from embryo disposition decisions?",
            ],
          },
        },
      },
      "Chapter 7: Post-Treatment Counseling and Follow-Up": {
        topics: {
          "Post-Treatment Emotional Support": {
            title: "Post-Treatment Emotional Support",
            questions: [
              "How do you provide emotional support to patients after unsuccessful IVF cycles?",
              "What follow-up strategies can improve patient outcomes?",
              "How can post-treatment counseling address feelings of guilt or failure?",
            ],
          },
          "Successful Treatment Outcomes": {
            title: "Successful Treatment Outcomes",
            questions: [
              "What are best practices for supporting patients after a successful pregnancy?",
              "How can you help patients manage anxiety during early pregnancy?",
              "What counseling services should be offered to patients after treatment completion?",
            ],
          },
        },
      },
    },
  },

};

const Sidebar = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setSelectedChapter(null); // Reset chapter and topic when switching role
    setSelectedTopic(null);
  };

  return (
    <div className="sidebar">
      <h2>Select Role</h2>
      <select value={selectedRole} onChange={handleRoleChange} className="dropdown">
        <option value="">Choose a Role</option>
        <option value="doctor">Doctor</option>
        <option value="embryologist">Embryologist</option>
        <option value="counsellor">Counsellor</option>
      </select>

      {selectedRole && rolesData[selectedRole]?.chapters && (
        <>
          <h3>Chapters</h3>
          <ul>
            {Object.keys(rolesData[selectedRole].chapters).map((chapter) => (
              <li
                key={chapter}
                onClick={() => setSelectedChapter(chapter)}
                className={selectedChapter === chapter ? "selected" : ""}
              >
                {chapter}
              </li>
            ))}
          </ul>
        </>
      )}

      {selectedChapter && rolesData[selectedRole]?.chapters[selectedChapter]?.topics && (
        <>
          <h3>Topics</h3>
          <ul>
            {Object.keys(rolesData[selectedRole].chapters[selectedChapter].topics).map((topic) => (
              <li
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={selectedTopic === topic ? "selected" : ""}
              >
                {rolesData[selectedRole].chapters[selectedChapter].topics[topic].title}
              </li>
            ))}
          </ul>
        </>
      )}

      {selectedTopic &&
        rolesData[selectedRole]?.chapters[selectedChapter]?.topics[selectedTopic]?.questions && (
          <>
            <h3>Suggested Questions</h3>
            <ul>
              {rolesData[selectedRole].chapters[selectedChapter].topics[selectedTopic].questions.map(
                (question, index) => (
                  <li key={index} className="question-item">
                    {question}
                    <button
                      className="copy-button"
                      onClick={() => navigator.clipboard.writeText(question)}
                    >
                      Copy
                    </button>
                  </li>
                )
              )}
            </ul>
          </>
        )}
    </div>
  );
};

export default Sidebar;
