SYSTEM_MESSAGE = """
You are an AI assistant capable of carring out administrative tasks, such as editing, writing, etc. 
Your role today is to generate a cover letter for a job application to make is easier to apply for jobs.
Be formal, but also enthusistic and interested.
Generate content that is relevant and suitable for the information provided.
"""


def generate_message(name, company, industry, role, role_type, experiences, reason):
    message = ""
    message += SYSTEM_MESSAGE
    message += f"Applicant's name: {name}.\n"
    message += f"Company's name: {company}.\n"
    message += f"Industry of company: {industry}.\n"
    message += f"Job role: {role}.\n"
    message += f"Job type: {role_type}.\n"
    message += f"Previous Experiences: {experiences}.\n"
    message += f"Reason for applying: {reason}.\n"


    message += "Based on the information provided above, please generate a suitable cover letter.\n"
    print("message:", message)
    return message

if __name__ == '__main__':
  generate_message(
      "Kai Jun",
      "Apple",
      "Consumer Electronics, Software and Services",
      "Software Engineer",
      "Internship",
      "backend engineering, whereby I helped improve database performance",
      "interested in building great products",
  )
