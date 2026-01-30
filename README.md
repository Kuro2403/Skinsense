# Acne Detection & Severity Grading with YOLOv8 (ICIIT 2024)

This repository provides a reproducible pipeline for **acne lesion detection** and **skin damage severity grading (IGA scale 0–4)** using **YOLOv8**.

> Paper: *Initial Approach to the Identification Degree of Skin Damage and Classification of Acne by YOLOv8* (ICIIT 2024).  
> DOI: 10.1145/3654522.3654526

---

## 1. Overview

Acne is a common dermatological condition and manual assessment can be time-consuming and subjective. This project uses **YOLOv8** for object detection of acne lesion types and maps the detected outcomes to **acne severity grades** according to the **IGA scale (0–4)**.

**Target lesion classes (5):**
- acne scars
- blackheads
- papular
- purulent (pustules)
- sebo-crystan-conglo

---

## 2. Dataset

- Source: DermNet-NZ (annotated and prepared via Roboflow in our experiments)
- Total images: **566**
- Image size used for training: **640×640**

**Class distribution (images / objects depend on annotation setup):**
- Acne scars: 119
- Blackheads: 97
- Papular: 121
- Purulent: 114
- Sebo-crystan-conglo: 115
- Total: 566

> ⚠️ Dataset files are **not included** in this repository.  
> Please follow `data/README_DATA.md` to obtain and prepare data, and respect the original dataset license/terms.

---

## 3. Environment

Our reference training environment:
- OS: Ubuntu 20.04.6 LTS
- GPU: Tesla T4 (16 GB)
- CUDA: 12.0
- Framework: PyTorch
- Python: 3.10
- Training workflow: Google Colab + Anaconda

---

## 4. Installation (YOLOv8 / Ultralytics)

```bash
# (Recommended) Create a virtual environment
python -m venv .venv
# Windows: .venv\Scripts\activate
source .venv/bin/activate

pip install --upgrade pip
pip install ultralytics
