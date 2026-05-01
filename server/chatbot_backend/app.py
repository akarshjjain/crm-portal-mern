# # app.py
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import requests
# import os

# app = Flask(__name__)
# CORS(app) # Enable CORS for all origins

# # IMPORTANT: If you are running this Flask app locally on your machine,
# # you MUST replace "YOUR_GEMINI_API_KEY_HERE" with your actual Gemini API key.
# # You can obtain a Gemini API key from Google AI Studio: https://aistudio.google.com/app/apikey
# # If running within the Canvas environment, the platform automatically injects the key.
# GEMINI_API_KEY = "AIzaSyCN68_lXJVM06bEyZ8aIe9pmEOE3ByoNNk" # <--- REPLACE THIS WITH YOUR ACTUAL API KEY IF RUNNING LOCALLY

# @app.route('/chat', methods=['POST'])
# def chat():
#     app.logger.info("Received /chat request.")
#     user_message = request.json.get('message')
#     if not user_message:
#         app.logger.error("No message provided in request.")
#         return jsonify({"error": "No message provided"}), 400

#     # Define the core knowledge base for the chatbot - EXPANDED CONTENT
#     business_knowledge = """
#     Team1 Consulting offers a wide range of services to help businesses thrive through digital transformation.
#     Our core services include:
#     - Cloud Services: We assist with cloud migration (e.g., from on-prem to AWS, Azure, Google Cloud), optimization of cloud resources, cost management, and robust cloud security. We handle IaaS, PaaS, and SaaS implementations. Our approach is phased: assessment, planning, migration, and ongoing management.
#     - Cyber Security: We provide comprehensive solutions including vulnerability assessments, penetration testing, security audits, managed security services (SOC-as-a-Service), incident response planning, and data protection strategies. We focus on protecting sensitive data, intellectual property, and ensuring business continuity against evolving threats. Our solutions comply with industry standards like ISO 27001 and GDPR.
#     - Consulting: We offer strategic IT consulting, digital transformation roadmapping, process optimization (e.g., Lean Six Sigma principles applied to IT workflows), IT governance, and technology advisory services. We help clients align IT strategy with business goals to drive efficiency and innovation.
#     - IT Infrastructure: Our services cover network design and implementation, server management (physical and virtual), data center solutions, virtualization, and infrastructure monitoring. We ensure your foundational IT systems are robust, scalable, and highly available.
#     - Data Analytics and AI: We help businesses leverage their data for actionable insights. This includes data warehousing, ETL processes, business intelligence (BI) dashboarding (using tools like Tableau, Power BI), predictive analytics, and custom AI/ML model development for tasks like customer segmentation, demand forecasting, and automation. We focus on turning raw data into strategic assets.
#     - Managed Services: We provide ongoing monitoring, maintenance, and support for your IT infrastructure and applications. This includes 24/7 helpdesk support, proactive problem resolution, patch management, backup and disaster recovery, and IT asset management, ensuring smooth operations and minimal downtime.

#     Why choose Team1 Consulting? We emphasize a client-centric approach, deep industry expertise, proven methodologies, and a strong track record of delivering measurable ROI. We focus on tailored solutions, not one-size-fits-all.

#     How we deliver solutions: Our typical project lifecycle involves discovery and assessment, solution design, agile development/implementation, rigorous testing, deployment, and post-implementation support. We use project management methodologies like Agile and Scrum.

#     How much does it cost? Our pricing varies based on the scope, complexity, and duration of the project. We typically offer project-based fixed fees, time-and-materials, or managed service subscriptions. We conduct a detailed needs assessment to provide a tailored proposal.
#     """

#     crm_knowledge = """
#     Our CRM portal helps manage customer relationships efficiently and comprehensively. Key features include:
#     - Accounts: Represents companies or organizations you do business with. An account typically holds information about the company's profile (industry, size), financial details, associated contacts, and all related deals/opportunities and activities. You can view account history, notes, and attachments.
#     - Sellers: Potential customers or prospects. Sellers are the initial entry point. Information captured includes source (e.g., website, referral), seller score, and initial contact details. How to convert a Seller: Once a seller is qualified (e.g., meets BANT criteria - Budget, Authority, Need, Timeline), it can be converted into a new Contact, Account, and potentially a new Deal, streamlining the sales process.
#     - Deals (Opportunities): Represents potential revenue-generating opportunities linked to Accounts or Contacts. Deals track the entire sales pipeline from qualification to closure. You can set deal stages (e.g., Prospecting, Qualification, Proposal, Negotiation, Closed Won/Lost), track estimated revenue, close dates, and competitor information. How to track deal progress: By updating stages, adding activities, and logging communications.
#     - Contacts: Individual people associated with Accounts or Sellers. Contacts store personal information (title, department), preferred communication methods, and a detailed history of interactions (calls, emails, meetings). Why are contacts important? They enable personalized communication and building long-term relationships.
#     - Tasks: Specific activities or to-dos related to any CRM record (sellers, accounts, deals, contacts). Tasks help users manage their workload, ensure follow-ups, and meet deadlines. You can assign tasks, set due dates, and mark completion. How to use tasks effectively: Assign clear descriptions, link to relevant CRM records, and utilize reminders.
#     - Meetings & Calls: Log and schedule all customer interactions directly within the CRM. This provides a complete communication history tied to each record.
#     - Reports & Dashboards: Generate insightful reports on all CRM data. Examples include: seller conversion rates (how many sellers convert to deals?), sales pipeline health, team performance, overdue tasks, and customer churn analysis. Dashboards provide a visual summary of key metrics. How to create custom reports: Navigate to the 'Reports' module, select desired data fields, apply filters, and choose visualization types.
#     - Projects: Manage complex client engagements. Projects can be linked to Accounts and Deals, allowing for the tracking of project phases, tasks, team assignments, and progress.
#     - Customization: The CRM is highly customizable, allowing administrators to add custom fields, create automated workflows, and design tailored layouts to fit specific business needs.

#     How to measure CRM effectiveness: Key metrics include Seller-to-Opportunity conversion rate, Sales Cycle Length, Customer Acquisition Cost (CAC), Customer Lifetime Value (CLTV), and Customer Retention Rate. You can generate reports within the CRM to track these.
#     """

#     # Combine instructions and knowledge
#     system_instruction = f"""
#     You are an AI assistant for Team1 Consulting's CRM portal.
#     Your purpose is to answer questions about Team1 Consulting's services and the features of the CRM portal.
#     Be helpful, informative, and concise. Provide specific details when available.

#     Here is information about Team1 Consulting:
#     {business_knowledge}

#     Here is information about the CRM Portal and its features:
#     {crm_knowledge}

#     If a question is outside the scope of Team1 Consulting's services or CRM features,
#     or if you cannot provide a numerical answer for something that is inherently dynamic (like exact sellers generated today)
#     politely state that you can only answer questions related to Team1 Consulting and its CRM portal based on its knowledge base.
#     Do not make up information or financial figures.
#     """

#     # Construct the payload for the Gemini API
#     chat_history = [
#         {"role": "user", "parts": [{"text": system_instruction}]},
#         {"role": "model", "parts": [{"text": "Hello! How can I assist you with Team1 Consulting or our CRM portal today?"}]},
#         {"role": "user", "parts": [{"text": user_message}]}
#     ]

#     payload = {
#         "contents": chat_history,
#         "generationConfig": {
#             "temperature": 0.7, # Adjust creativity
#             "topP": 0.9,
#             "topK": 40
#         }
#     }

#     # Gemini API endpoint
#     api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
#     app.logger.info(f"Attempting to call Gemini API at: {api_url}")

#     try:
#         response = requests.post(api_url, headers={'Content-Type': 'application/json'}, json=payload)
#         response.raise_for_status() # Raise an exception for HTTP errors (4xx or 5xx)
#         result = response.json()
#         app.logger.info(f"Gemini API response received: {result}")

#         if result.get("candidates") and result["candidates"][0].get("content") and result["candidates"][0]["content"].get("parts"):
#             # Extract the text from the response
#             assistant_response = result["candidates"][0]["content"].get("parts")[0].get("text", "") # Added .get("", "") for safety
#             app.logger.info(f"AI response: {assistant_response[:50]}...") # Log first 50 chars
#             return jsonify({"response": assistant_response})
#         else:
#             app.logger.error(f"Unexpected Gemini API response structure or empty content: {result}")
#             return jsonify({"error": "Failed to get a valid response from the AI. Unexpected structure."}), 500

#     except requests.exceptions.RequestException as e:
#         app.logger.error(f"Error calling Gemini API: {e}")
#         return jsonify({"error": f"Failed to connect to AI service: {e}"}), 500
#     except Exception as e:
#         app.logger.error(f"An unexpected error occurred in Flask app: {e}")
#         return jsonify({"error": f"An internal server error occurred: {e}"}), 500

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)

# app.py
# # app.py
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import requests
# import os
# import datetime
# from pymongo import MongoClient # Imported pymongo
# from dotenv import load_dotenv # For loading environment variables from .env

# # Load environment variables from .env file
# load_dotenv()

# app = Flask(__name__)
# CORS(app) # Enable CORS for all origins

# # IMPORTANT: If you are running this Flask app locally on your machine,
# # you MUST replace "YOUR_GEMINI_API_KEY_HERE" with your actual Gemini API key.
# # You can obtain a Gemini API key from Google AI Studio: https://aistudio.google.com/app/apikey
# # If running within the Canvas environment, the platform automatically injects the key.
# # For local testing, ensure your .env has MONGO_URL and uncomment the line below.
# GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "AIzaSyCN68_lXJVM06bEyZ8aIe9pmEOE3ByoNNk") # Fallback for local testing

# # --- MongoDB Connection ---
# def get_mongo_client():
#     """Establishes and returns a MongoDB client connection."""
#     # Using MONGO_URL from .env file (mongodb://localhost:27017/team1)
#     # Ensure this URL is correct and your MongoDB instance is running locally
#     mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/team1')
#     client = MongoClient(mongo_url)
#     app.logger.info(f"Attempting to connect to MongoDB at: {mongo_url}")
#     return client

# # --- Dynamic Data Retrieval Functions (Adjusted to your provided schema) ---

# def get_sales_data_last_week():
#     """
#     Retrieves sales data from the 'deals' collection for the last week.
#     Uses 'amount' and 'createdAt' fields from your 'deals' schema.
#     """
#     app.logger.info("Executing get_sales_data_last_week function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1 # Database name from your .env
#         deals_collection = db.deals # Using 'deals' collection for sales data

#         end_date = datetime.datetime.now()
#         start_date = end_date - datetime.timedelta(days=7)

#         # Filter deals created in the last week
#         sales_records = list(deals_collection.find(
#             {"createdAt": {"$gte": start_date, "$lt": end_date}}
#         ))

#         total_sales = sum(record.get('amount', 0) for record in sales_records)

#         # Calculate top products based on 'dealName' and 'amount'
#         product_sales = {}
#         for record in sales_records:
#             deal_name = record.get('dealName', 'Unknown Deal') # Using dealName as product/service
#             amount = record.get('amount', 0)
#             product_sales[deal_name] = product_sales.get(deal_name, 0) + amount

#         sorted_products = sorted(product_sales.items(), key=lambda item: item[1], reverse=True)
#         top_3_products = ", ".join([f"{name} (₹{value:,.2f})" for name, value in sorted_products[:3]])

#         client.close()
#         return f"Based on live data, total sales last week were: ₹{total_sales:,.2f}. Top performing deals/products: {top_3_products if top_3_products else 'No deal sales recorded.'}"
#     except Exception as e:
#         app.logger.error(f"Error fetching sales data from MongoDB: {e}")
#         return "I encountered an error trying to retrieve sales data from the database. Please check the backend logs for details."

# def get_top_performing_products_this_month():
#     """
#     Retrieves top 3 performing products/deals from the 'deals' collection for the current month.
#     Uses 'dealName' and 'amount' fields, with 'createdAt' for month filtering.
#     """
#     app.logger.info("Executing get_top_performing_products_this_month function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         today = datetime.datetime.now()
#         start_of_month = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
#         # End of month is start of next month
#         next_month = start_of_month + datetime.timedelta(days=32)
#         end_of_month = next_month.replace(day=1)

#         pipeline = [
#             {"$match": {"createdAt": {"$gte": start_of_month, "$lt": end_of_month}}},
#             {"$group": {"_id": "$dealName", "total_revenue": {"$sum": "$amount"}}},
#             {"$sort": {"total_revenue": -1}},
#             {"$limit": 3}
#         ]
#         top_products = list(deals_collection.aggregate(pipeline))

#         client.close()
#         if top_products:
#             formatted_products = ", ".join([f"{p['_id']} (₹{p['total_revenue']:,.2f})" for p in top_products])
#             return f"Based on live data, the top 3 performing products/deals this month are: {formatted_products}."
#         return "No top performing products/deals found for this month."
#     except Exception as e:
#         app.logger.error(f"Error fetching top products from MongoDB: {e}")
#         return "I encountered an error trying to retrieve top products. Please check the backend logs for details."

# def compare_quarterly_performance(q1_year=None, q2_year=None):
#     """
#     Compares Q1 vs Q2 performance from 'deals' data.
#     Uses 'amount' and 'createdAt' fields.
#     Default to current year if not specified.
#     """
#     app.logger.info(f"Executing compare_quarterly_performance function for {q1_year}, {q2_year}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         current_year = datetime.datetime.now().year
#         q1_year = q1_year if q1_year else current_year
#         q2_year = q2_year if q2_year else current_year

#         # Define quarter date ranges based on your 'createdAt' field
#         q1_start = datetime.datetime(q1_year, 1, 1)
#         q1_end = datetime.datetime(q1_year, 3, 31, 23, 59, 59)
#         q2_start = datetime.datetime(q2_year, 4, 1)
#         q2_end = datetime.datetime(q2_year, 6, 30, 23, 59, 59)

#         q1_sales = sum(record.get('amount', 0) for record in deals_collection.find(
#             {"createdAt": {"$gte": q1_start, "$lte": q1_end}}
#         ))
#         q2_sales = sum(record.get('amount', 0) for record in deals_collection.find(
#             {"createdAt": {"$gte": q2_start, "$lte": q2_end}}
#         ))

#         client.close()
#         comparison_text = f"Q1 {q1_year} sales: ₹{q1_sales:,.2f}. Q2 {q2_year} sales: ₹{q2_sales:,.2f}. "
#         if q1_sales > q2_sales:
#             comparison_text += f"Q1 performed better than Q2 by ₹{(q1_sales - q2_sales):,.2f}."
#         elif q2_sales > q1_sales:
#             comparison_text += f"Q2 performed better than Q1 by ₹{(q2_sales - q1_sales):,.2f}."
#         else:
#             comparison_text += "Q1 and Q2 performance were similar."
#         return comparison_text
#     except Exception as e:
#         app.logger.error(f"Error comparing quarterly performance from MongoDB: {e}")
#         return "I encountered an error trying to compare quarterly performance. Please check the backend logs for details."

# def get_total_sellers_count():
#     """
#     Retrieves the total count of sellers from the 'sellers' collection.
#     """
#     app.logger.info("Executing get_total_sellers_count function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         sellers_collection = db.sellers
#         total_sellers = sellers_collection.count_documents({})
#         client.close()
#         return f"Based on live data, you currently have {total_sellers} sellers in your CRM."
#     except Exception as e:
#         app.logger.error(f"Error fetching total sellers count from MongoDB: {e}")
#         return "I encountered an error trying to retrieve the total sellers count. Please check the backend logs for details."

# def get_seller_score_for_seller(first_name, last_name):
#     """
#     Retrieves seller information (score/status if available) from the 'sellers' collection.
#     Uses 'firstName' and 'lastName' for lookup.
#     NOTE: Your provided schema for 'sellers' does NOT have 'score' or 'status' fields.
#     You will need to add these fields to your MongoDB 'sellers' collection for meaningful output.
#     """
#     app.logger.info(f"Executing get_seller_score_for_seller for {first_name} {last_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         sellers_collection = db.sellers # Using 'sellers' collection

#         seller_record = sellers_collection.find_one({"firstName": first_name, "lastName": last_name})
#         client.close()

#         if seller_record:
#             # Placeholder for 'score' and 'status' - will be None if not in your schema
#             score = seller_record.get('score', 'N/A (field not in schema)')
#             status = seller_record.get('status', 'Unknown (field not in schema)')
#             company = seller_record.get('company', 'Unknown Company')
#             return f"Based on live data, for {first_name} {last_name} ({company}): Seller score is {score}. Current status: {status}."
#         return f"I could not find a seller named '{first_name} {last_name}' in the database."
#     except Exception as e:
#         app.logger.error(f"Error fetching seller score from MongoDB: {e}")
#         return "I encountered an error trying to retrieve seller score data. Please check the backend logs for details."

# def get_high_priority_sellers_today():
#     """
#     Retrieves sellers created today from the 'sellers' collection as a proxy for 'high priority'
#     since your schema doesn't have a 'priority' field.
#     CONSIDER ADDING A 'priority' FIELD (e.g., 'High', 'Medium', 'Low') to your 'sellers' collection.
#     """
#     app.logger.info("Executing get_high_priority_sellers_today function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         sellers_collection = db.sellers

#         today_start = datetime.datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
#         today_end = today_start + datetime.timedelta(days=1)

#         # Finding sellers created today as a proxy for "high priority today"
#         high_priority_sellers = list(sellers_collection.find(
#             {"createdAt": {"$gte": today_start, "$lt": today_end}}
#         ))
#         client.close()

#         if high_priority_sellers:
#             seller_names = ", ".join([
#                 f"{seller.get('firstName', '')} {seller.get('lastName', '')} ({seller.get('company', 'Unknown')})"
#                 for seller in high_priority_sellers
#             ])
#             return f"Based on live data, you have {len(high_priority_sellers)} newly created sellers today. They include: {seller_names}."
#         return "No new sellers created today."
#     except Exception as e:
#         app.logger.error(f"Error fetching high-priority sellers from MongoDB: {e}")
#         return "I encountered an error trying to retrieve high-priority sellers. Please check the backend logs for details."

# def get_client_status_from_db(client_name):
#     """
#     Retrieves the status of a specific client from the 'accounts' collection.
#     Uses 'accountName' for lookup.
#     NOTE: Your provided 'accounts' schema does NOT have a dedicated 'status' field.
#     I'm using 'accountType' as a proxy. Consider adding a 'status' field if needed.
#     """
#     app.logger.info(f"Executing get_client_status_from_db for {client_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         accounts_collection = db.accounts # Using 'accounts' collection

#         client_record = accounts_collection.find_one({"accountName": client_name})
#         client.close()

#         if client_record:
#             status_proxy = client_record.get('accountType', 'N/A (type not found)')
#             industry = client_record.get('industry', 'Unknown Industry')
#             return f"Based on live data, client '{client_name}' is an '{status_proxy}' type account in the '{industry}' industry."
#         return f"I could not find client '{client_name}' in the database."
#     except Exception as e:
#         app.logger.error(f"Error fetching client status from MongoDB: {e}")
#         return "I encountered an error trying to retrieve client status. Please check the backend logs for details."

# def get_last_contact_date_from_db(contact_name):
#     """
#     Retrieves the last contact date by looking at tasks associated with the contact.
#     ASSUMPTIONS: 'tasks' collection, 'contact' field (string name), 'dueDate' or 'createdAt' for date.
#     NOTE: Your 'contacts' schema doesn't have a 'last_contact_date'.
#     This function attempts to find the most recent task for the given contact.
#     """
#     app.logger.info(f"Executing get_last_contact_date_from_db for {contact_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks # Assuming contact interactions are logged as tasks

#         # Try to find tasks associated with the contact name
#         # This assumes the 'contact' field in 'tasks' stores the contact's full name as a string.
#         # If it stores an ObjectId, this query will need to change to join with contacts collection.
#         related_tasks = list(tasks_collection.find(
#             {"contact": contact_name}
#         ).sort("dueDate", -1).limit(1)) # Sort by dueDate descending, get most recent

#         client.close()

#         if related_tasks:
#             most_recent_task = related_tasks[0]
#             due_date = most_recent_task.get('dueDate')
#             subject = most_recent_task.get('subject', 'a task')

#             # Convert dueDate string to datetime for better formatting
#             try:
#                 # Assuming dueDate is "YYYY-MM-DD"
#                 last_contact_date = datetime.datetime.strptime(due_date, "%Y-%m-%d")
#                 return f"Based on live data, the last recorded interaction with '{contact_name}' was a task ('{subject}') due on: {last_contact_date.strftime('%Y-%m-%d')}."
#             except (ValueError, TypeError):
#                 return f"Based on live data, the last recorded interaction with '{contact_name}' was a task ('{subject}'), but the date format was unexpected."
#         return f"No recent tasks or direct contact records found for '{contact_name}'."
#     except Exception as e:
#         app.logger.error(f"Error fetching last contact date from MongoDB: {e}")
#         return "I encountered an error trying to retrieve last contact date. Please check the backend logs for details."


# @app.route('/chat', methods=['POST'])
# def chat():
#     app.logger.info("Received /chat request.")
#     user_message = request.json.get('message')
#     if not user_message:
#         app.logger.error("No message provided in request.")
#         return jsonify({"error": "No message provided"}), 400

#     # Define the core knowledge base for the chatbot - EXPANDED CONTENT
#     business_knowledge = """
#     Team1 Consulting offers a wide range of services to help businesses thrive through digital transformation.
#     Our core services include:
#     - Cloud Services: We assist with cloud migration (e.g., from on-prem to AWS, Azure, Google Cloud), optimization of cloud resources, cost management, and robust cloud security. We handle IaaS, PaaS, and SaaS implementations. Our approach is phased: assessment, planning, migration, and ongoing management.
#     - Cyber Security: We provide comprehensive solutions including vulnerability assessments, penetration testing, security audits, managed security services (SOC-as-a-Service), incident response planning, and data protection strategies. We focus on protecting sensitive data, intellectual property, and ensuring business continuity against evolving threats. Our solutions comply with industry standards like ISO 27001 and GDPR.
#     - Consulting: We offer strategic IT consulting, digital transformation roadmapping, process optimization (e.g., Lean Six Sigma principles applied to IT workflows), IT governance, and technology advisory services. We help clients align IT strategy with business goals to drive efficiency and innovation.
#     - IT Infrastructure: Our services cover network design and implementation, server management (physical and virtual), data center solutions, virtualization, and infrastructure monitoring. We ensure your foundational IT systems are robust, scalable, and highly available.
#     - Data Analytics and AI: We help businesses leverage their data for actionable insights. This includes data warehousing, ETL processes, business intelligence (BI) dashboarding (using tools like Tableau, Power BI), predictive analytics, and custom AI/ML model development for tasks like customer segmentation, demand forecasting, and automation. We focus on turning raw data into strategic assets.
#     - Managed Services: We provide ongoing monitoring, maintenance, and support for your IT infrastructure and applications. This includes 24/7 helpdesk support, proactive problem resolution, patch management, backup and disaster recovery, and IT asset management, ensuring smooth operations and minimal downtime.

#     Why choose Team1 Consulting? We emphasize a client-centric approach, deep industry expertise, proven methodologies, and a strong track record of delivering measurable ROI. We focus on tailored solutions, not one-size-fits-all.

#     How we deliver solutions: Our typical project lifecycle involves discovery and assessment, solution design, agile development/implementation, rigorous testing, deployment, and post-implementation support. We use project management methodologies like Agile and Scrum.

#     How much does it cost? Our pricing varies based on the scope, complexity, and duration of the project. We typically offer project-based fixed fees, time-and-materials, or managed service subscriptions. We conduct a detailed needs assessment to provide a tailored proposal.
#     """

#     crm_knowledge = """
#     Our CRM portal helps manage customer relationships efficiently and comprehensively. Key features include:
#     - Accounts: Represents companies or organizations you do business with. An account typically holds information about the company's profile (industry, size), financial details, associated contacts, and all related deals/opportunities and activities. You can view account history, notes, and attachments.
#     - Sellers: Potential customers or prospects. Sellers are the initial entry point. Information captured includes source (e.g., website, referral), seller score, and initial contact details. How to convert a Seller: Once a seller is qualified (e.g., meets BANT criteria - Budget, Authority, Need, Timeline), it can be converted into a new Contact, Account, and potentially a new Deal, streamlining the sales process.
#     - Deals (Opportunities): Represents potential revenue-generating opportunities linked to Accounts or Contacts. Deals track the entire sales pipeline from qualification to closure. You can set deal stages (e.g., Prospecting, Qualification, Proposal, Negotiation, Closed Won/Lost), track estimated revenue, close dates, and competitor information. How to track deal progress: By updating stages, adding activities, and logging communications.
#     - Contacts: Individual people associated with Accounts or Sellers. Contacts store personal information (title, department), preferred communication methods, and a detailed history of interactions (calls, emails, meetings). Why are contacts important? They enable personalized communication and building long-term relationships.
#     - Tasks: Specific activities or to-dos related to any CRM record (sellers, accounts, deals, contacts). Tasks help users manage their workload, ensure follow-ups, and meet deadlines. You can assign tasks, set due dates, and mark completion. How to use tasks effectively: Assign clear descriptions, link to relevant CRM records, and utilize reminders.
#     - Meetings & Calls: Log and schedule all customer interactions directly within the CRM. This provides a complete communication history tied to each record.
#     - Reports & Dashboards: Generate insightful reports on all CRM data. Examples include: seller conversion rates (how many sellers convert to deals?), sales pipeline health, team performance, overdue tasks, and customer churn analysis. Dashboards provide a visual summary of key metrics. How to create custom reports: Navigate to the 'Reports' module, select desired data fields, apply filters, and choose visualization types.
#     - Projects: Manage complex client engagements. Projects can be linked to Accounts and Deals, allowing for the tracking of project phases, tasks, team assignments, and progress.
#     - Customization: The CRM is highly customizable, allowing administrators to add custom fields, create automated workflows, and design tailored layouts to fit specific business needs.

#     How to measure CRM effectiveness: Key metrics include Seller-to-Opportunity conversion rate, Sales Cycle Length, Customer Acquisition Cost (CAC), Customer Lifetime Value (CLTV), and Customer Retention Rate. You can generate reports within the CRM to track these.
#     """

#     # --- Intent Recognition and Dynamic Data Injection ---
#     dynamic_data_context = ""
#     lower_user_message = user_message.lower()

#     # Sales & Performance Queries
#     if "sales last week" in lower_user_message or "weekly sales" in lower_user_message:
#         dynamic_data_context = get_sales_data_last_week()
#     elif "top" in lower_user_message and "performing products" in lower_user_message and "month" in lower_user_message:
#         dynamic_data_context = get_top_performing_products_this_month()
#     elif "compare" in lower_user_message and ("q1 vs q2" in lower_user_message or "q2 vs q1" in lower_user_message):
#         # Could parse years from message, e.g., "compare q1 2023 vs q2 2024"
#         dynamic_data_context = compare_quarterly_performance() # Default to current year
#     # Seller Prediction Insights
#     elif "how much seller" in lower_user_message or "total sellers" in lower_user_message or "number of sellers" in lower_user_message:
#         dynamic_data_context = get_total_sellers_count()
#     elif "seller score for" in lower_user_message:
#         # Improved extraction for seller name (simple regex could be more robust)
#         try:
#             # Extracting potential full name
#             name_parts = lower_user_message.split("seller score for ")[1].split("?")[0].strip().split()
#             first_name = name_parts[0].title() if name_parts else ""
#             last_name = name_parts[1].title() if len(name_parts) > 1 else ""
#             dynamic_data_context = get_seller_score_for_seller(first_name, last_name)
#         except IndexError:
#             dynamic_data_context = "Please specify a seller's full name, e.g., 'What's the seller score for John Doe?'"
#     elif "high-priority sellers today" in lower_user_message or "high priority sellers" in lower_user_message or "urgent sellers" in lower_user_message:
#         dynamic_data_context = get_high_priority_sellers_today()
#     # CRM Data Lookup
#     elif "status of" in lower_user_message and "client" in lower_user_message:
#         try:
#             client_name = lower_user_message.split("status of ")[1].split("?")[0].strip().title()
#             dynamic_data_context = get_client_status_from_db(client_name)
#         except IndexError:
#             dynamic_data_context = "Please specify a client name, e.g., 'What's the status of Havells India?'"
#     elif "last contact" in lower_user_message:
#         try:
#             # Assumes format "last contact [Contact Name]"
#             contact_name = lower_user_message.split("last contact ")[1].split("?")[0].strip().title()
#             dynamic_data_context = get_last_contact_date_from_db(contact_name)
#         except IndexError:
#             dynamic_data_context = "Please specify a contact's full name, e.g., 'When did I last contact Parth Sarthi?'"
#     # Goal Tracking & Forecasting - These would require more complex DB models/ML
#     elif "monthly goal" in lower_user_message or "sales for next week" in lower_user_message or "forecast" in lower_user_message:
#          dynamic_data_context = "I can provide general information about goal tracking and forecasting within the CRM, but I cannot access real-time goal progress or generate specific forecasts from your live data at this moment. This functionality requires advanced data integration and potentially predictive models."


#     # Combine instructions and knowledge
#     # The `dynamic_data_context` is added to the system instruction
#     system_instruction = f"""
#     You are an AI assistant for Team1 Consulting's CRM portal.
#     Your purpose is to answer questions about Team1 Consulting's services and the features of the CRM portal.
#     You can also provide real-time insights by querying the company's internal MongoDB database for sales, sellers, accounts, contacts, and task information.
#     Be helpful, informative, and concise. Provide specific details from the database when available.

#     Here is general information about Team1 Consulting:
#     {business_knowledge}

#     Here is general information about the CRM Portal and its features:
#     {crm_knowledge}

#     Here is specific real-time data retrieved based on the user's current query from the MongoDB database:
#     {dynamic_data_context}

#     If a question cannot be answered by the provided general knowledge or the specific real-time data (e.g., if the data is missing for a requested item, or the query is too complex for current tools),
#     politely state that you can only answer questions based on the available information and tools.
#     Do not make up information or financial figures.
#     """

#     # Construct the payload for the Gemini API
#     chat_history = [
#         {"role": "user", "parts": [{"text": system_instruction}]},
#         {"role": "model", "parts": [{"text": "Hello! How can I assist you with Team1 Consulting or our CRM portal today?"}]},
#         {"role": "user", "parts": [{"text": user_message}]}
#     ]

#     payload = {
#         "contents": chat_history,
#         "generationConfig": {
#             "temperature": 0.7, # Adjust creativity
#             "topP": 0.9,
#             "topK": 40
#         }
#     }

#     # Gemini API endpoint
#     api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
#     app.logger.info(f"Attempting to call Gemini API at: {api_url}")

#     try:
#         response = requests.post(api_url, headers={'Content-Type': 'application/json'}, json=payload)
#         response.raise_for_status() # Raise an exception for HTTP errors (4xx or 5xx)
#         result = response.json()
#         app.logger.info(f"Gemini API response received: {result}")

#         if result.get("candidates") and result["candidates"][0].get("content") and result["candidates"][0]["content"].get("parts"):
#             assistant_response = result["candidates"][0]["content"].get("parts")[0].get("text", "")
#             app.logger.info(f"AI response: {assistant_response[:50]}...")
#             return jsonify({"response": assistant_response})
#         else:
#             app.logger.error(f"Unexpected Gemini API response structure or empty content: {result}")
#             return jsonify({"error": "Failed to get a valid response from the AI. Unexpected structure."}), 500

#     except requests.exceptions.RequestException as e:
#         app.logger.error(f"Error calling Gemini API: {e}")
#         return jsonify({"error": f"Failed to connect to AI service: {e}"}), 500
#     except Exception as e:
#         app.logger.error(f"An unexpected error occurred in Flask app: {e}")
#         return jsonify({"error": f"An internal server error occurred: {e}"}), 500

# if __name__ == '__main__':
#     # Load MONGO_URL from .env during local development
#     # In Canvas environment, this might be handled differently, but os.environ.get is robust.
#     app.run(host='0.0.0.0', port=5000, debug=True)


# # app.py
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import requests
# import os
# import datetime
# from pymongo import MongoClient
# from dotenv import load_dotenv
# from collections import defaultdict

# load_dotenv()

# app = Flask(__name__)
# CORS(app)

# GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "AIzaSyCN68_lXJVM06bEyZ8aIe9pmEOE3ByoNNk")

# # --- Define Global Knowledge Bases (Moved here to be accessible) ---
# business_knowledge = """
# Team1 Consulting offers a wide range of services to help businesses thrive through digital transformation.
# Our core services include:
# - Cloud Services: We assist with cloud migration (e.g., from on-prem to AWS, Azure, Google Cloud), optimization of cloud resources, cost management, and robust cloud security. We handle IaaS, PaaS, and SaaS implementations. Our approach is phased: assessment, planning, migration, and ongoing management.
# - Cyber Security: We provide comprehensive solutions including vulnerability assessments, penetration testing, security audits, managed security services (SOC-as-a-Service), incident response planning, and data protection strategies. We focus on protecting sensitive data, intellectual property, and ensuring business continuity against evolving threats. Our solutions comply with industry standards like ISO 27001 and GDPR.
# - Consulting: We offer strategic IT consulting, digital transformation roadmapping, process optimization (e.g., Lean Six Sigma principles applied to IT workflows), IT governance, and technology advisory services. We help clients align IT strategy with business goals to drive efficiency and innovation.
# - IT Infrastructure: Our services cover network design and implementation, server management (physical and virtual), data center solutions, virtualization, and infrastructure monitoring. We ensure your foundational IT systems are robust, scalable, and highly available.
# - Data Analytics and AI: We help businesses leverage their data for actionable insights. This includes data warehousing, ETL processes, business intelligence (BI) dashboarding (using tools like Tableau, Power BI), predictive analytics, and custom AI/ML model development for tasks like customer segmentation, demand forecasting, and automation. We focus on turning raw data into strategic assets.
# - Managed Services: We provide ongoing monitoring, maintenance, and support for your IT infrastructure and applications. This includes 24/7 helpdesk support, proactive problem resolution, patch management, backup and disaster recovery, and IT asset management, ensuring smooth operations and minimal downtime.

# Why choose Team1 Consulting? We emphasize a client-centric approach, deep industry expertise, proven methodologies, and a strong track record of delivering measurable ROI. We focus on tailored solutions, not one-size-fits-all.

# How we deliver solutions: Our typical project lifecycle involves discovery and assessment, solution design, agile development/implementation, rigorous testing, deployment, and post-implementation support. We use project management methodologies like Agile and Scrum.

# How much does it cost? Our pricing varies based on the scope, complexity, and duration of the project. We typically offer project-based fixed fees, time-and-materials, or managed service subscriptions. We conduct a detailed needs assessment to provide a tailored proposal.
# """

# crm_knowledge = """
# Our CRM portal helps manage customer relationships efficiently and comprehensively. Key features include:
# - Accounts: Represents companies or organizations you do business with. An account typically holds information about the company's profile (industry, size), financial details, associated contacts, and all related deals/opportunities and activities. You can view account history, notes, and attachments.
# - Sellers: Potential customers or prospects. Sellers are the initial entry point. Information captured includes source (e.g., website, referral), seller score, and initial contact details. How to convert a Seller: Once a seller is qualified (e.g., meets BANT criteria - Budget, Authority, Need, Timeline), it can be converted into a new Contact, Account, and potentially a new Deal, streamlining the sales process.
# - Deals (Opportunities): Represents potential revenue-generating opportunities linked to Accounts or Contacts. Deals track the entire sales pipeline from qualification to closure. You can set deal stages (e.g., Prospecting, Qualification, Proposal, Negotiation, Closed Won/Lost), track estimated revenue, close dates, and competitor information. How to track deal progress: By updating stages, adding activities, and logging communications.
# - Contacts: Individual people associated with Accounts or Sellers. Contacts store personal information (title, department), preferred communication methods, and a detailed history of interactions (calls, emails, meetings). Why are contacts important? They enable personalized communication and building long-term relationships.
# - Tasks: Specific activities or to-dos related to any CRM record (sellers, accounts, deals, contacts). Tasks help users manage their workload, ensure follow-ups, and meet deadlines. You can assign tasks, set due dates, and mark completion. How to use tasks effectively: Assign clear descriptions, link to relevant CRM records, and utilize reminders.
# - Meetings & Calls: Log and schedule all customer interactions directly within the CRM. This provides a complete communication history tied to each record.
# - Reports & Dashboards: Generate insightful reports on all CRM data. Examples include: seller conversion rates (how many sellers convert to deals?), sales pipeline health, team performance, overdue tasks, and customer churn analysis. Dashboards provide a visual summary of key metrics. How to create custom reports: Navigate to the 'Reports' module, select desired data fields, apply filters, and choose visualization types.
# - Projects: Manage complex client engagements, breaking them down into manageable phases and tasks.
# - Customization: The CRM is highly customizable, allowing administrators to add custom fields, create automated workflows, and design tailored layouts to fit specific business needs.

# How to measure CRM effectiveness: Key metrics include Seller-to-Opportunity conversion rate, Sales Cycle Length, Customer Acquisition Cost (CAC), Customer Lifetime Value (CLTV), and Customer Retention Rate. You can generate reports within the CRM to track these.
# """


# # --- MongoDB Connection ---
# def get_mongo_client():
#     mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/team1')
#     client = MongoClient(mongo_url)
#     app.logger.info(f"Attempting to connect to MongoDB at: {mongo_url}")
#     return client

# # --- Helper to parse date from string fields like 'dueDate' ---
# def parse_date_from_str(date_str):
#     if not date_str:
#         return None
#     for fmt in ("%Y-%m-%d", "%Y/%m/%d", "%m-%d-%Y", "%m/%d/%Y"): # Add other formats if needed
#         try:
#             return datetime.datetime.strptime(date_str, fmt)
#         except ValueError:
#             continue
#     return None

# # --- Dynamic Data Retrieval Functions (You MUST customize queries to your schema and logic) ---

# def get_total_sales_last_week():
#     app.logger.info("Executing get_total_sales_last_week function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         end_date = datetime.datetime.now()
#         start_date = end_date - datetime.timedelta(days=7)

#         sales_records = list(deals_collection.find(
#             {"createdAt": {"$gte": start_date, "$lt": end_date}, "amount": {"$exists": True, "$ne": None}}
#         ))
#         total_sales = sum(record.get('amount', 0) for record in sales_records)

#         client.close()
#         return f"Total sales for the last 7 days: ₹{total_sales:,.2f}."
#     except Exception as e:
#         app.logger.error(f"Error fetching total sales last week from MongoDB: {e}")
#         return "I encountered an error trying to retrieve total sales for last week."

# def get_monthly_revenue(month_offset=0):
#     """month_offset: 0 for current month, 1 for last month, etc."""
#     app.logger.info(f"Executing get_monthly_revenue function for offset {month_offset}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         today = datetime.datetime.now()
#         target_month_start = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
#         for _ in range(month_offset):
#             target_month_start = (target_month_start - datetime.timedelta(days=1)).replace(day=1)
        
#         target_month_end = (target_month_start + datetime.timedelta(days=32)).replace(day=1)

#         sales_records = list(deals_collection.find(
#             {"createdAt": {"$gte": target_month_start, "$lt": target_month_end}, "amount": {"$exists": True, "$ne": None}}
#         ))
#         total_revenue = sum(record.get('amount', 0) for record in sales_records)

#         client.close()
#         month_name = (target_month_start).strftime('%B %Y')
#         return f"Total revenue for {month_name}: ₹{total_revenue:,.2f}."
#     except Exception as e:
#         app.logger.error(f"Error fetching monthly revenue from MongoDB: {e}")
#         return "I encountered an error trying to retrieve monthly revenue."

# def compare_monthly_sales():
#     app.logger.info("Executing compare_monthly_sales function.")
#     current_month_revenue_str = get_monthly_revenue(month_offset=0)
#     last_month_revenue_str = get_monthly_revenue(month_offset=1)

#     # Extract numerical values for comparison
#     current_revenue = float(current_month_revenue_str.split('₹')[1].split('.')[0].replace(',', '')) if '₹' in current_month_revenue_str else 0
#     last_revenue = float(last_month_revenue_str.split('₹')[1].split('.')[0].replace(',', '')) if '₹' in last_month_revenue_str else 0

#     comparison = ""
#     if current_revenue > last_revenue:
#         diff = current_revenue - last_revenue
#         comparison = f"This month's sales are ₹{diff:,.2f} higher than last month's."
#     elif last_revenue > current_revenue:
#         diff = last_revenue - current_revenue
#         comparison = f"This month's sales are ₹{diff:,.2f} lower than last month's."
#     else:
#         comparison = "This month's sales are similar to last month's."
    
#     return f"{current_month_revenue_str}\n{last_month_revenue_str}\n{comparison}"


# def get_revenue_trend_last_n_months(n=6):
#     app.logger.info(f"Executing get_revenue_trend_last_n_months function for {n} months.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         monthly_revenues = []
#         for i in range(n -1, -1, -1): # Iterate from n months ago to current month
#             today = datetime.datetime.now()
#             target_month_start = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
#             for _ in range(i):
#                 target_month_start = (target_month_start - datetime.timedelta(days=1)).replace(day=1)
            
#             target_month_end = (target_month_start + datetime.timedelta(days=32)).replace(day=1)

#             pipeline = [
#                 {"$match": {"createdAt": {"$gte": target_month_start, "$lt": target_month_end}, "amount": {"$exists": True, "$ne": None}}},
#                 {"$group": {"_id": None, "total_revenue": {"$sum": "$amount"}}}
#             ]
#             result = list(deals_collection.aggregate(pipeline))
            
#             month_name = target_month_start.strftime('%b %Y')
#             revenue = result[0]['total_revenue'] if result else 0
#             monthly_revenues.append(f"{month_name}: ₹{revenue:,.2f}")
        
#         client.close()
#         return "Revenue trend for the last {} months:\n{}".format(n, "\n".join(monthly_revenues))
#     except Exception as e:
#         app.logger.error(f"Error fetching revenue trend from MongoDB: {e}")
#         return "I encountered an error trying to retrieve the revenue trend."

# def get_average_deal_size_this_quarter():
#     app.logger.info("Executing get_average_deal_size_this_quarter function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         # Determine current quarter
#         today = datetime.datetime.now()
#         current_quarter = (today.month - 1) // 3 + 1
#         q_start_month = (current_quarter - 1) * 3 + 1
#         q_start = datetime.datetime(today.year, q_start_month, 1)
#         q_end = datetime.datetime(today.year, q_start_month + 3, 1) - datetime.timedelta(microseconds=1) # End of quarter

#         pipeline = [
#             {"$match": {"createdAt": {"$gte": q_start, "$lt": q_end}, "amount": {"$exists": True, "$ne": None}}},
#             {"$group": {"_id": None, "total_amount": {"$sum": "$amount"}, "count": {"$sum": 1}}}
#         ]
#         result = list(deals_collection.aggregate(pipeline))

#         client.close()
#         if result and result[0]['count'] > 0:
#             avg_size = result[0]['total_amount'] / result[0]['count']
#             return f"The average deal size this quarter is ₹{avg_size:,.2f}."
#         return "No deals found this quarter to calculate average size."
#     except Exception as e:
#         app.logger.error(f"Error fetching average deal size from MongoDB: {e}")
#         return "I encountered an error trying to retrieve average deal size."

# def get_daily_sales_last_week():
#     app.logger.info("Executing get_daily_sales_last_week function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         today = datetime.datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
#         daily_sales = defaultdict(float)

#         for i in range(7):
#             day_start = today - datetime.timedelta(days=i)
#             day_end = day_start + datetime.timedelta(days=1)
            
#             sales_for_day = list(deals_collection.find(
#                 {"createdAt": {"$gte": day_start, "$lt": day_end}, "amount": {"$exists": True, "$ne": None}}
#             ))
#             daily_sales[day_start.strftime('%Y-%m-%d')] = sum(record.get('amount', 0) for record in sales_for_day)
        
#         client.close()
#         report = ["Daily sales for the past week:"]
#         for date_str in sorted(daily_sales.keys()):
#             report.append(f"{date_str}: ₹{daily_sales[date_str]:,.2f}")
#         return "\n".join(report)
#     except Exception as e:
#         app.logger.error(f"Error fetching daily sales from MongoDB: {e}")
#         return "I encountered an error trying to retrieve daily sales."

# def get_top_revenue_sources_this_year():
#     app.logger.info("Executing get_top_revenue_sources_this_year function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         current_year_start = datetime.datetime(datetime.datetime.now().year, 1, 1)
#         next_year_start = datetime.datetime(datetime.datetime.now().year + 1, 1, 1)

#         pipeline = [
#             {"$match": {"createdAt": {"$gte": current_year_start, "$lt": next_year_start}, "amount": {"$exists": True, "$ne": None}}},
#             {"$group": {"_id": "$dealOwner", "total_revenue": {"$sum": "$amount"}}}, # Group by dealOwner, or could be by accountName
#             {"$sort": {"total_revenue": -1}},
#             {"$limit": 5}
#         ]
#         top_sources = list(deals_collection.aggregate(pipeline))

#         client.close()
#         if top_sources:
#             formatted_sources = ", ".join([f"{s['_id']} (₹{s['total_revenue']:,.2f})" for s in top_sources])
#             return f"Top 5 revenue sources this year (by Deal Owner): {formatted_sources}."
#         return "No top revenue sources found for this year."
#     except Exception as e:
#         app.logger.error(f"Error fetching top revenue sources from MongoDB: {e}")
#         return "I encountered an error trying to retrieve top revenue sources."

# def get_biggest_deal_in_quarter(quarter=None, year=None):
#     app.logger.info(f"Executing get_biggest_deal_in_quarter function for Q{quarter} {year}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         target_year = year if year else datetime.datetime.now().year
#         target_quarter = quarter if quarter else (datetime.datetime.now().month - 1) // 3 + 1

#         q_start_month = (target_quarter - 1) * 3 + 1
#         q_start = datetime.datetime(target_year, q_start_month, 1)
#         q_end = datetime.datetime(target_year, q_start_month + 3, 1) - datetime.timedelta(microseconds=1)

#         pipeline = [
#             {"$match": {"createdAt": {"$gte": q_start, "$lt": q_end}, "amount": {"$exists": True, "$ne": None}}},
#             {"$sort": {"amount": -1}},
#             {"$limit": 1}
#         ]
#         biggest_deal = list(deals_collection.aggregate(pipeline))

#         client.close()
#         if biggest_deal:
#             deal = biggest_deal[0]
#             return f"The biggest deal in Q{target_quarter} {target_year} was '{deal.get('dealName', 'Unnamed Deal')}' for ₹{deal.get('amount', 0):,.2f}, closed by {deal.get('dealOwner', 'Unknown Owner')}."
#         return f"No deals found in Q{target_quarter} {target_year} to determine the biggest."
#     except Exception as e:
#         app.logger.error(f"Error fetching biggest deal from MongoDB: {e}")
#         return "I encountered an error trying to retrieve the biggest deal."

# # --- Seller Prediction & Scoring (Placeholders for ML/complex logic) ---
# def get_sellers_likely_to_convert_this_week():
#     app.logger.info("Executing get_sellers_likely_to_convert_this_week function (placeholder).")
#     # This would require a predictive model (ML) and a 'conversion_likelihood' field
#     return "Predicting seller conversion likelihood requires a trained machine learning model. I can highlight sellers with high engagement or recent activity if you have those metrics."

# def get_sellers_by_score_above(min_score):
#     app.logger.info(f"Executing get_sellers_by_score_above function (placeholder for score field).")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         sellers_collection = db.sellers
#         # This assumes a 'score' field exists in your sellers collection
#         high_score_sellers = list(sellers_collection.find({"score": {"$gte": min_score}}))
#         client.close()
#         if high_score_sellers:
#             names = ", ".join([f"{l.get('firstName', '')} {l.get('lastName', '')} (Score: {l.get('score')})" for l in high_score_sellers])
#             return f"Sellers with a score above {min_score}: {names}."
#         return f"No sellers found with a score above {min_score}."
#     except Exception as e:
#         app.logger.error(f"Error fetching sellers by score from MongoDB: {e}")
#         return "I encountered an error trying to retrieve sellers by score. Make sure 'score' field exists in your sellers collection."

# def get_conversion_probability_for_seller(first_name, last_name):
#     app.logger.info(f"Executing get_conversion_probability_for_seller for {first_name} {last_name} (placeholder).")
#     # This would require a predictive model and potentially a 'probability' field
#     return f"To predict the conversion probability for {first_name} {last_name}, I would need access to a seller scoring model. Based on static info, if {first_name} {last_name} exists, I can tell you their known attributes."

# def get_coldest_sellers():
#     app.logger.info("Executing get_coldest_sellers function (placeholder).")
#     # Define "coldest" (e.g., last_contacted_date, no activity in X days)
#     # Requires a 'last_contacted_date' field in sellers or contacts
#     return "Identifying the 'coldest' sellers requires tracking recent engagement or last contact dates. Can you define what 'cold' means in terms of days since last contact or activity?"

# def get_sellers_needing_immediate_attention():
#     app.logger.info("Executing get_sellers_needing_immediate_attention function (placeholder).")
#     # This could be high score, recent activity, nearing due date for a task, etc.
#     return "Sellers needing immediate attention often have high engagement scores, upcoming key milestones, or specific flags. I can show newly created sellers or high-priority tasks linked to sellers if you clarify what defines 'immediate attention'."


# # --- Smart Alerts & Suggestions (Placeholders for complex logic/pre-set thresholds) ---
# def check_weekly_goal_track():
#     app.logger.info("Executing check_weekly_goal_track function (placeholder).")
#     return "Tracking weekly goals requires knowing your defined weekly target and accessing real-time sales data. If you tell me your weekly sales target, I can compare it to your current weekly sales."

# def suggest_sellers_for_follow_up():
#     app.logger.info("Executing suggest_sellers_for_follow_up function (placeholder).")
#     # Could be based on last contact date, seller score, recent activity
#     return "Suggesting sellers for follow-up requires a strategy, such as sellers not contacted in a while, or sellers with recent engagement. What criteria would you like to use?"

# def alert_deal_stalling(deal_name=None):
#     app.logger.info(f"Executing alert_deal_stalling function for {deal_name} (placeholder).")
#     # Requires tracking deal stage duration.
#     return "Alerting on stalling deals requires tracking the time spent in each sales stage and comparing it to predefined benchmarks. I can show you all deals currently in the 'Negotiation' stage if that helps."

# def highlight_overdue_tasks():
#     app.logger.info("Executing highlight_overdue_tasks function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks

#         # Find tasks where status is not 'Completed' and dueDate is in the past
#         today = datetime.datetime.now().strftime("%Y-%m-%d")
#         overdue_tasks = list(tasks_collection.find(
#             {"status": {"$ne": "Completed"}, "dueDate": {"$lt": today}}
#         ))
#         client.close()

#         if overdue_tasks:
#             task_details = "\n".join([f"- '{t.get('subject', 'Unnamed Task')}' for {t.get('contact', 'Unknown Contact')} (Due: {t.get('dueDate')}, Priority: {t.get('priority', 'N/A')})" for t in overdue_tasks])
#             return f"You have {len(overdue_tasks)} overdue tasks:\n{task_details}"
#         return "You have no overdue tasks."
#     except Exception as e:
#         app.logger.error(f"Error fetching overdue tasks from MongoDB: {e}")
#         return "I encountered an error trying to retrieve overdue tasks."

# def get_deals_nearing_close_dates():
#     app.logger.info("Executing get_deals_nearing_close_dates function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         today = datetime.datetime.now()
#         # Deals closing in the next 7 days, and not yet Closed Won/Lost
#         next_7_days = today + datetime.timedelta(days=7)

#         # Assuming closeDate is a string in "YYYY-MM-DD" format
#         nearing_close_deals = list(deals_collection.find({
#             "closeDate": {"$lte": next_7_days.strftime("%Y-%m-%d")}, # Convert datetime to string for comparison
#             "salesStage": {"$nin": ["Closed Won", "Closed Lost"]} # Not already closed
#         }))
#         client.close()

#         if nearing_close_deals:
#             deal_info = "\n".join([f"- '{d.get('dealName', 'Unnamed Deal')}' with {d.get('contactName', 'Unknown Contact')} (Stage: {d.get('salesStage')}, Close Date: {d.get('closeDate')})" for d in nearing_close_deals])
#             return f"Deals nearing close dates in the next 7 days:\n{deal_info}"
#         return "No deals are nearing their close dates this week."
#     except Exception as e:
#         app.logger.error(f"Error fetching deals nearing close dates from MongoDB: {e}")
#         return "I encountered an error trying to retrieve deals nearing close dates."

# # --- CRM Data Lookup ---

# def get_client_status_from_db(client_name):
#     app.logger.info(f"Executing get_client_status_from_db for {client_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         accounts_collection = db.accounts

#         client_record = accounts_collection.find_one({"accountName": client_name})
#         client.close()

#         if client_record:
#             status_proxy = client_record.get('accountType', 'N/A (type not found)')
#             industry = client_record.get('industry', 'Unknown Industry')
#             billing_address = client_record.get('billingAddress', 'N/A')
#             phone = client_record.get('phone', 'N/A')
#             email = client_record.get('email', 'N/A')
#             return f"Based on live data, client '{client_name}' is an '{status_proxy}' type account in the '{industry}' industry. Billing Address: {billing_address}, Phone: {phone}, Email: {email}."
#         return f"I could not find client '{client_name}' in the database."
#     except Exception as e:
#         app.logger.error(f"Error fetching client status from MongoDB: {e}")
#         return "I encountered an error trying to retrieve client status. Please check the backend logs for details."

# def get_last_contact_date_from_db(contact_name):
#     app.logger.info(f"Executing get_last_contact_date_from_db for {contact_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks

#         # Try to find tasks associated with the contact name
#         related_tasks = list(tasks_collection.find(
#             {"contact": contact_name}
#         ).sort("dueDate", -1).limit(1)) # Sort by dueDate descending, get most recent

#         client.close()

#         if related_tasks:
#             most_recent_task = related_tasks[0]
#             due_date_str = most_recent_task.get('dueDate')
#             subject = most_recent_task.get('subject', 'a task')

#             last_contact_date = parse_date_from_str(due_date_str)
#             if last_contact_date:
#                 return f"Based on live data, the last recorded interaction with '{contact_name}' was a task ('{subject}') due on: {last_contact_date.strftime('%Y-%m-%d')}."
#             return f"Based on live data, the last recorded interaction with '{contact_name}' was a task ('{subject}'), but the date format was unexpected."
#         return f"No recent tasks or direct contact records found for '{contact_name}'."
#     except Exception as e:
#         app.logger.error(f"Error fetching last contact date from MongoDB: {e}")
#         return "I encountered an error trying to retrieve last contact date. Please check the backend logs for details."

# def get_owner_of_deal(deal_name):
#     app.logger.info(f"Executing get_owner_of_deal for {deal_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         deal_record = deals_collection.find_one({"dealName": deal_name})
#         client.close()

#         if deal_record:
#             owner = deal_record.get('dealOwner', 'N/A')
#             return f"The owner of the deal '{deal_name}' is {owner}."
#         return f"Deal '{deal_name}' not found."
#     except Exception as e:
#         app.logger.error(f"Error fetching deal owner from MongoDB: {e}")
#         return "I encountered an error trying to retrieve the deal owner."

# def get_deal_value(deal_name):
#     app.logger.info(f"Executing get_deal_value for {deal_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         deal_record = deals_collection.find_one({"dealName": deal_name})
#         client.close()

#         if deal_record:
#             amount = deal_record.get('amount', 0)
#             return f"The deal value for '{deal_name}' is ₹{amount:,.2f}."
#         return f"Deal '{deal_name}' not found."
#     except Exception as e:
#         app.logger.error(f"Error fetching deal value from MongoDB: {e}")
#         return "I encountered an error trying to retrieve the deal value."

# def get_expected_close_date_of_deal(deal_name):
#     app.logger.info(f"Executing get_expected_close_date_of_deal for {deal_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         deal_record = deals_collection.find_one({"dealName": deal_name})
#         client.close()

#         if deal_record:
#             close_date = deal_record.get('closeDate', 'N/A')
#             return f"The expected close date for '{deal_name}' is {close_date}."
#         return f"Deal '{deal_name}' not found."
#     except Exception as e:
#         app.logger.error(f"Error fetching expected close date from MongoDB: {e}")
#         return "I encountered an error trying to retrieve the expected close date."

# def get_notes_for_seller(first_name, last_name):
#     app.logger.info(f"Executing get_notes_for_seller for {first_name} {last_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         sellers_collection = db.sellers

#         seller_record = sellers_collection.find_one({"firstName": first_name, "lastName": last_name})
#         client.close()

#         if seller_record:
#             description = seller_record.get('description', 'No specific notes found.')
#             return f"Notes for seller {first_name} {last_name}: {description}"
#         return f"Seller '{first_name} {last_name}' not found."
#     except Exception as e:
#         app.logger.error(f"Error fetching notes for seller from MongoDB: {e}")
#         return "I encountered an error trying to retrieve notes for the seller."

# def get_communication_history_with_client(client_name):
#     app.logger.info(f"Executing get_communication_history_with_client for {client_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks # Assuming tasks capture communication (meetings, calls)

#         # Find tasks related to the client (by account name in task)
#         # This is a simplification; a full communication history would need dedicated 'interactions'
#         # collection linked to accounts/contacts.
#         client_tasks = list(tasks_collection.find(
#             {"account": client_name}
#         ).sort("createdAt", -1).limit(5)) # Get last 5 tasks for this account

#         client.close()

#         if client_tasks:
#             history_items = "\n".join([
#                 f"- {t.get('subject')} with {t.get('contact', 'N/A')} (Due: {t.get('dueDate')}, Created: {t.get('createdAt').strftime('%Y-%m-%d')})"
#                 for t in client_tasks
#             ])
#             return f"Recent communication history with {client_name} (based on tasks):\n{history_items}"
#         return f"No recent communication history found for {client_name} based on tasks."
#     except Exception as e:
#         app.logger.error(f"Error fetching communication history from MongoDB: {e}")
#         return "I encountered an error trying to retrieve communication history."

# # --- Deals & Pipelines ---
# def get_all_open_deals():
#     app.logger.info("Executing get_all_open_deals function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         # Deals not in 'Closed Won' or 'Closed Lost' stages
#         open_deals = list(deals_collection.find(
#             {"salesStage": {"$nin": ["Closed Won", "Closed Lost"]}}
#         ))
#         client.close()

#         if open_deals:
#             deal_info = "\n".join([f"- '{d.get('dealName')}' (Stage: {d.get('salesStage')}, Amount: ₹{d.get('amount', 0):,.2f})" for d in open_deals])
#             return f"You have {len(open_deals)} open deals:\n{deal_info}"
#         return "You have no open deals at the moment."
#     except Exception as e:
#         app.logger.error(f"Error fetching open deals from MongoDB: {e}")
#         return "I encountered an error trying to retrieve open deals."

# def get_deals_in_negotiation_stage():
#     app.logger.info("Executing get_deals_in_negotiation_stage function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         negotiation_deals = list(deals_collection.find(
#             {"salesStage": "Negotiation"}
#         ))
#         client.close()

#         if negotiation_deals:
#             deal_info = "\n".join([f"- '{d.get('dealName')}' (Amount: ₹{d.get('amount', 0):,.2f}, Close Date: {d.get('closeDate')})" for d in negotiation_deals])
#             return f"You have {len(negotiation_deals)} deals in the negotiation stage:\n{deal_info}"
#         return "No deals are currently in the negotiation stage."
#     except Exception as e:
#         app.logger.error(f"Error fetching deals in negotiation stage from MongoDB: {e}")
#         return "I encountered an error trying to retrieve deals in negotiation stage."

# def get_deals_closed_this_month():
#     app.logger.info("Executing get_deals_closed_this_month function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         today = datetime.datetime.now()
#         start_of_month = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
#         next_month = start_of_month + datetime.timedelta(days=32)
#         end_of_month = next_month.replace(day=1)

#         closed_deals = list(deals_collection.find(
#             {"salesStage": {"$in": ["Closed Won", "Closed Lost"]},
#              "createdAt": {"$gte": start_of_month, "$lt": end_of_month}}
#         ))
#         client.close()

#         if closed_deals:
#             won_deals = [d for d in closed_deals if d.get('salesStage') == "Closed Won"]
#             lost_deals = [d for d in closed_deals if d.get('salesStage') == "Closed Lost"]
            
#             won_revenue = sum(d.get('amount', 0) for d in won_deals)
#             lost_revenue = sum(d.get('amount', 0) for d in lost_deals)

#             return (f"This month, {len(closed_deals)} deals closed:\n"
#                     f"- Won: {len(won_deals)} deals (₹{won_revenue:,.2f})\n"
#                     f"- Lost: {len(lost_deals)} deals (₹{lost_revenue:,.2f})")
#         return "No deals closed this month."
#     except Exception as e:
#         app.logger.error(f"Error fetching closed deals this month from MongoDB: {e}")
#         return "I encountered an error trying to retrieve closed deals this month."

# def get_deals_closing_this_week():
#     app.logger.info("Executing get_deals_closing_this_week function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         today = datetime.datetime.now()
#         end_of_week = today + datetime.timedelta(days=(6 - today.weekday())) # Sunday end of week
#         start_of_week = today - datetime.timedelta(days=today.weekday()) # Monday start of week

#         # Assuming closeDate is a string in "YYYY-MM-DD" format
#         closing_deals = list(deals_collection.find({
#             "closeDate": {"$gte": start_of_week.strftime("%Y-%m-%d"), "$lte": end_of_week.strftime("%Y-%m-%d")},
#             "salesStage": {"$nin": ["Closed Won", "Closed Lost"]}
#         }))
#         client.close()

#         if closing_deals:
#             deal_info = "\n".join([f"- '{d.get('dealName')}' (Stage: {d.get('salesStage')}, Amount: ₹{d.get('amount', 0):,.2f})" for d in closing_deals])
#             return f"You have {len(closing_deals)} deals expected to close this week:\n{deal_info}"
#         return "No deals are expected to close this week."
#     except Exception as e:
#         app.logger.error(f"Error fetching deals closing this week from MongoDB: {e}")
#         return "I encountered an error trying to retrieve deals closing this week."

# def get_average_time_to_close_deal():
#     app.logger.info("Executing get_average_time_to_close_deal function (placeholder).")
#     # This requires 'createdAt' and 'closedDate' fields, and deals marked as 'Closed Won'
#     # 'closedDate' would need to be added to your schema if not there, or inferred from last status update.
#     return "Calculating average time to close a deal requires 'createdAt' and 'closedDate' (or inferred closed date) for deals marked as 'Closed Won'. This functionality is not yet fully implemented."

# def get_overdue_deals():
#     app.logger.info("Executing get_overdue_deals function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         today_str = datetime.datetime.now().strftime("%Y-%m-%d")

#         # Overdue deals are those with a closeDate in the past and not yet won/lost
#         overdue_deals = list(deals_collection.find({
#             "closeDate": {"$lt": today_str},
#             "salesStage": {"$nin": ["Closed Won", "Closed Lost"]}
#         }))
#         client.close()

#         if overdue_deals:
#             deal_info = "\n".join([f"- '{d.get('dealName')}' (Stage: {d.get('salesStage')}, Due: {d.get('closeDate')})" for d in overdue_deals])
#             return f"You have {len(overdue_deals)} overdue deals:\n{deal_info}"
#         return "You have no overdue deals."
#     except Exception as e:
#         app.logger.error(f"Error fetching overdue deals from MongoDB: {e}")
#         return "I encountered an error trying to retrieve overdue deals."

# def get_top_deal_closer_this_month():
#     app.logger.info("Executing get_top_deal_closer_this_month function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         today = datetime.datetime.now()
#         start_of_month = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
#         next_month = start_of_month + datetime.timedelta(days=32)
#         end_of_month = next_month.replace(day=1)

#         pipeline = [
#             {"$match": {"createdAt": {"$gte": start_of_month, "$lt": end_of_month}, "salesStage": "Closed Won"}},
#             {"$group": {"_id": "$dealOwner", "total_won_amount": {"$sum": "$amount"}, "deals_won_count": {"$sum": 1}}},
#             {"$sort": {"total_won_amount": -1}},
#             {"$limit": 1}
#         ]
#         top_closer = list(deals_collection.aggregate(pipeline))

#         client.close()
#         if top_closer:
#             closer = top_closer[0]
#             return (f"The top deal closer this month is {closer['_id']} with {closer['deals_won_count']} "
#                     f"deals won totaling ₹{closer['total_won_amount']:,.2f}.")
#         return "No deals closed and won this month yet."
#     except Exception as e:
#         app.logger.error(f"Error fetching top deal closer from MongoDB: {e}")
#         return "I encountered an error trying to retrieve the top deal closer."

# # --- Contacts & Accounts ---
# def get_contacts_by_city_region(city_region):
#     app.logger.info(f"Executing get_contacts_by_city_region for {city_region}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         accounts_collection = db.accounts # Assuming contacts are linked via billing state/country

#         # This is an indirect approach. Ideally, contacts would have a city/region field.
#         # Here we find accounts in the region, then list contacts linked to those accounts.
#         # This would be more robust with a direct city/region field on contacts.
#         matching_accounts = list(accounts_collection.find(
#             {"$or": [{"billingState": city_region}, {"billingCountry": city_region}]}
#         ))
#         account_ids = [str(acc['_id']) for acc in matching_accounts] # Assuming a link to contacts via account ID if it exists

#         contacts_collection = db.contacts
#         # If contacts have an 'accountId' field
#         # contacts_in_region = list(contacts_collection.find({"accountId": {"$in": account_ids}}))
        
#         # For now, list contacts if their company matches an account name (less reliable)
#         matching_company_names = [acc.get('accountName') for acc in matching_accounts if acc.get('accountName')]
#         contacts_in_region = list(contacts_collection.find({"company": {"$in": matching_company_names}}))


#         client.close()
#         if contacts_in_region:
#             contact_names = ", ".join([f"{c.get('firstName')} {c.get('lastName')} ({c.get('company')})" for c in contacts_in_region])
#             return f"Contacts in {city_region}: {contact_names}."
#         return f"No contacts found linked to accounts in {city_region}."
#     except Exception as e:
#         app.logger.error(f"Error fetching contacts by city/region from MongoDB: {e}")
#         return "I encountered an error trying to retrieve contacts by region."

# def get_contacts_unresponsive_in_weeks(weeks=2):
#     app.logger.info(f"Executing get_contacts_unresponsive_in_weeks for {weeks} weeks.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks
#         contacts_collection = db.contacts

#         # Find contacts that have no tasks (or no tasks within X weeks)
#         # This is a complex query to do accurately without a dedicated 'last_contact_date' on contacts
#         # or a robust interactions collection.
#         # This will return contacts for whom the most recent task is older than 'weeks'
        
#         # Aggregate tasks to find latest contact date for each contact
#         pipeline = [
#             {"$group": {
#                 "_id": "$contact",
#                 "latest_interaction": {"$max": "$createdAt"} # Assuming createdAt is interaction date
#             }}
#         ]
#         latest_interactions = list(tasks_collection.aggregate(pipeline))
        
#         unresponsive_contact_names = []
#         threshold_date = datetime.datetime.now() - datetime.timedelta(weeks=weeks)

#         for interaction in latest_interactions:
#             if interaction["latest_interaction"] < threshold_date:
#                 unresponsive_contact_names.append(interaction["_id"])
        
#         # Now get details for these contacts
#         unresponsive_contacts_details = list(contacts_collection.find(
#             {"$or": [
#                 {"firstName": {"$in": unresponsive_contact_names}}, # Simple matching by first name or full name from task
#                 {"lastName": {"$in": unresponsive_contact_names}},
#                 {"$expr": {"$in": [{"$concat": ["$firstName", " ", "$lastName"]}, unresponsive_contact_names]}}
#             ]}
#         ))
        
#         client.close()
#         if unresponsive_contact_names:
#             names = ", ".join(unresponsive_contact_names)
#             return f"Contacts who haven't had a task-based interaction in over {weeks} weeks: {names}."
#         return f"No contacts found who haven't responded in over {weeks} weeks based on task history."
#     except Exception as e:
#         app.logger.error(f"Error fetching unresponsive contacts from MongoDB: {e}")
#         return "I encountered an error trying to retrieve unresponsive contacts."

# def get_job_title_of_contact(first_name, last_name):
#     app.logger.info(f"Executing get_job_title_of_contact for {first_name} {last_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         contacts_collection = db.contacts

#         contact_record = contacts_collection.find_one({"firstName": first_name, "lastName": last_name})
#         client.close()

#         if contact_record:
#             title = contact_record.get('title', 'N/A') # Assuming 'title' is job title
#             return f"The job title for {first_name} {last_name} is: {title}."
#         return f"Contact '{first_name} {last_name}' not found."
#     except Exception as e:
#         app.logger.error(f"Error fetching job title from MongoDB: {e}")
#         return "I encountered an error trying to retrieve the job title."

# def get_clients_contacted_last_week():
#     app.logger.info("Executing get_clients_contacted_last_week function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks

#         end_date = datetime.datetime.now()
#         start_date = end_date - datetime.timedelta(days=7)

#         # Assuming 'createdAt' of tasks indicates contact
#         contacted_tasks = list(tasks_collection.find(
#             {"createdAt": {"$gte": start_date, "$lt": end_date}, "contact": {"$exists": True, "$ne": ""}}
#         ))
        
#         client.close()
        
#         contacted_names = set()
#         for task in contacted_tasks:
#             contacted_names.add(task.get('contact'))

#         if contacted_names:
#             return f"Clients contacted last week (based on tasks): {', '.join(sorted(list(contacted_names)))}."
#         return "No clients were contacted last week (based on tasks)."
#     except Exception as e:
#         app.logger.error(f"Error fetching clients contacted last week from MongoDB: {e}")
#         return "I encountered an error trying to retrieve clients contacted last week."

# # --- Tasks & Follow-ups ---
# def get_tasks_due_today():
#     app.logger.info("Executing get_tasks_due_today function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks

#         today_str = datetime.datetime.now().strftime("%Y-%m-%d")
        
#         tasks_today = list(tasks_collection.find(
#             {"dueDate": today_str, "status": {"$ne": "Completed"}}
#         ))
#         client.close()

#         if tasks_today:
#             task_info = "\n".join([f"- '{t.get('subject')}' for {t.get('contact', 'N/A')} (Priority: {t.get('priority', 'N/A')})" for t in tasks_today])
#             return f"You have {len(tasks_today)} tasks due today:\n{task_info}"
#         return "You have no tasks due today."
#     except Exception as e:
#         app.logger.error(f"Error fetching tasks due today from MongoDB: {e}")
#         return "I encountered an error trying to retrieve tasks due today."

# def get_completed_tasks_this_week():
#     app.logger.info("Executing get_completed_tasks_this_week function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks

#         today = datetime.datetime.now()
#         start_of_week = today - datetime.timedelta(days=today.weekday()) # Monday
#         end_of_week = start_of_week + datetime.timedelta(days=7) # End of Sunday

#         completed_tasks = list(tasks_collection.find(
#             {"status": "Completed", "createdAt": {"$gte": start_of_week, "$lt": end_of_week}} # Assuming 'createdAt' is when task was entered, ideally need a 'completedAt'
#         ))
#         client.close()

#         if completed_tasks:
#             task_info = "\n".join([f"- '{t.get('subject')}' for {t.get('contact', 'N/A')}" for t in completed_tasks])
#             return f"You have completed {len(completed_tasks)} tasks this week:\n{task_info}"
#         return "No tasks completed this week."
#     except Exception as e:
#         app.logger.error(f"Error fetching completed tasks this week from MongoDB: {e}")
#         return "I encountered an error trying to retrieve completed tasks this week."

# def get_tasks_assigned_to_user(user_name):
#     app.logger.info(f"Executing get_tasks_assigned_to_user for {user_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks

#         assigned_tasks = list(tasks_collection.find({"taskOwner": user_name}))
#         client.close()

#         if assigned_tasks:
#             task_info = "\n".join([f"- '{t.get('subject')}' (Due: {t.get('dueDate')}, Status: {t.get('status')})" for t in assigned_tasks])
#             return f"{user_name} has {len(assigned_tasks)} tasks assigned:\n{task_info}"
#         return f"No tasks found assigned to {user_name}."
#     except Exception as e:
#         app.logger.error(f"Error fetching tasks assigned to user from MongoDB: {e}")
#         return "I encountered an error trying to retrieve tasks assigned to the user."

# def get_tasks_linked_to_deal(deal_name):
#     app.logger.info(f"Executing get_tasks_linked_to_deal for {deal_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks
#         deals_collection = db.deals

#         # First, find the deal's _id if dealName is used for linking
#         # This assumes 'account' field in tasks refers to dealName
#         # If tasks link directly to deal _id, this would be different
#         linked_tasks = list(tasks_collection.find({"account": deal_name})) # Assuming 'account' field stores deal name
#         client.close()

#         if linked_tasks:
#             task_info = "\n".join([f"- '{t.get('subject')}' (Due: {t.get('dueDate')}, Status: {t.get('status')})" for t in linked_tasks])
#             return f"Tasks linked to deal '{deal_name}':\n{task_info}"
#         return f"No tasks found linked to deal '{deal_name}'."
#     except Exception as e:
#         app.logger.error(f"Error fetching tasks linked to deal from MongoDB: {e}")
#         return "I encountered an error trying to retrieve tasks linked to the deal."

# def get_meetings_scheduled_this_week():
#     app.logger.info("Executing get_meetings_scheduled_this_week function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks

#         today = datetime.datetime.now()
#         start_of_week = today - datetime.timedelta(days=today.weekday()) # Monday
#         end_of_week = start_of_week + datetime.timedelta(days=7) # End of Sunday

#         # Assuming 'Meeting' is in the subject or a dedicated type field
#         meetings = list(tasks_collection.find({
#             "subject": {"$regex": "Meeting", "$options": "i"},
#             "dueDate": {"$gte": start_of_week.strftime("%Y-%m-%d"), "$lte": end_of_week.strftime("%Y-%m-%d")}
#         }))
#         client.close()

#         if meetings:
#             meeting_info = "\n".join([f"- '{m.get('subject')}' with {m.get('contact', 'N/A')} (Due: {m.get('dueDate')})" for m in meetings])
#             return f"You have {len(meetings)} meetings scheduled this week:\n{meeting_info}"
#         return "No meetings scheduled this week."
#     except Exception as e:
#         app.logger.error(f"Error fetching meetings scheduled this week from MongoDB: {e}")
#         return "I encountered an error trying to retrieve scheduled meetings."

# def get_calls_made_this_month():
#     app.logger.info("Executing get_calls_made_this_month function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks

#         today = datetime.datetime.now()
#         start_of_month = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
#         next_month = start_of_month + datetime.timedelta(days=32)
#         end_of_month = next_month.replace(day=1)

#         # Assuming 'Call' is in the subject or a dedicated type field, and status is 'Completed'
#         calls_made = list(tasks_collection.find({
#             "subject": {"$regex": "Call", "$options": "i"},
#             "status": "Completed", # Assuming completed calls are recorded as such
#             "createdAt": {"$gte": start_of_month, "$lt": end_of_month}
#         }))
#         client.close()

#         if calls_made:
#             call_info = "\n".join([f"- '{c.get('subject')}' with {c.get('contact', 'N/A')} (Completed: {c.get('createdAt').strftime('%Y-%m-%d')})" for c in calls_made])
#             return f"You have recorded {len(calls_made)} calls made this month:\n{call_info}"
#         return "No calls recorded as completed this month."
#     except Exception as e:
#         app.logger.error(f"Error fetching calls made this month from MongoDB: {e}")
#         return "I encountered an error trying to retrieve calls made this month."

# def get_total_acquired_deals_revenue_by_timeframe(timeframe_unit='all_time'):
#     """
#     Calculates the total revenue from deals marked as 'Closed Won' for a given timeframe.
#     timeframe_unit can be 'this_week', 'this_month', 'this_quarter', 'this_year', or 'all_time'.
#     """
#     app.logger.info(f"Executing get_total_acquired_deals_revenue_by_timeframe function for {timeframe_unit}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         query_filter = {"salesStage": {"$regex": "Closed Won", "$options": "i"}, "amount": {"$exists": True, "$ne": None}}

#         today = datetime.datetime.now()
#         start_date = None
#         end_date = None

#         if timeframe_unit == 'this_week':
#             start_date = today - datetime.timedelta(days=today.weekday()) # Monday
#             end_date = start_date + datetime.timedelta(days=7) # End of Sunday
#         elif timeframe_unit == 'this_month':
#             start_date = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
#             end_date = (start_date + datetime.timedelta(days=32)).replace(day=1) # Start of next month
#         elif timeframe_unit == 'this_quarter':
#             current_quarter = (today.month - 1) // 3 + 1
#             q_start_month = (current_quarter - 1) * 3 + 1
#             start_date = datetime.datetime(today.year, q_start_month, 1)
#             end_date = datetime.datetime(today.year, q_start_month + 3, 1) - datetime.timedelta(microseconds=1)
#         elif timeframe_unit == 'this_year':
#             start_date = datetime.datetime(today.year, 1, 1)
#             end_date = datetime.datetime(today.year + 1, 1, 1) - datetime.timedelta(microseconds=1)
#         # If 'all_time' or no timeframe, no date filter is added.

#         if start_date and end_date:
#             query_filter["createdAt"] = {"$gte": start_date, "$lt": end_date}
        
#         acquired_deals = list(deals_collection.find(query_filter))
        
#         total_revenue = sum(deal.get('amount', 0) for deal in acquired_deals)
#         num_deals = len(acquired_deals)

#         client.close()
        
#         timeframe_text = timeframe_unit.replace('_', ' ') # Format for display
#         return f"Based on live data, the total revenue from '{timeframe_text}' acquired deals ('Closed Won') is ₹{total_revenue:,.2f} from {num_deals} deals."
#     except Exception as e:
#         app.logger.error(f"Error fetching acquired deals revenue for {timeframe_unit} from MongoDB: {e}")
#         return f"I encountered an error trying to retrieve revenue from acquired deals for {timeframe_unit}. Please check the backend logs for details."

# def get_total_acquired_deals_revenue():
#     """Defaults to all_time revenue for acquired deals."""
#     return get_total_acquired_deals_revenue_by_timeframe('all_time')


# # --- API Routes ---
# @app.route('/chat', methods=['POST'])
# def chat():
#     app.logger.info("Received /chat request.")
#     user_message = request.json.get('message')
#     chat_history_from_frontend = request.json.get('history', [])

#     if not user_message:
#         app.logger.error("No message provided in request.")
#         return jsonify({"error": "No message provided"}), 400

#     # Initialize dynamic_data_context
#     dynamic_data_context = ""
#     lower_user_message = user_message.lower()

#     # --- Pre-process for "yes" or short answers based on last bot question ---
#     # This block aims to immediately resolve the intent if it's a direct follow-up
#     if len(chat_history_from_frontend) >= 2:
#         last_bot_message_parts = chat_history_from_frontend[-2]['parts']
#         last_bot_message_text = last_bot_message_parts[0]['text'].lower() if last_bot_message_parts else ""

#         # Specific handling for "yes" after revenue clarification
#         if lower_user_message == "yes":
#             if "potential revenue from deals within the crm?" in last_bot_message_text or \
#                "would you like to know the total revenue from all \"closed won\" deals, or would you like to specify a time frame?" in last_bot_message_text or \
#                "i can provide the total revenue from all 'closed won' deals. would you like me to proceed?" in last_bot_message_text: # Added this specific check
#                 dynamic_data_context = get_total_acquired_deals_revenue_by_timeframe('all_time')
#                 user_message = ""
#                 lower_user_message = ""
#             elif "specify the time frame you're interested in" in last_bot_message_text:
#                  dynamic_data_context = get_total_sales_last_week() # Using this as a proxy for "deals acquired this week" revenue
#                  user_message = ""
#                  lower_user_message = ""


#     # --- Standard Intent Recognition for Dynamic Data Injection (only if not already handled by "yes") ---
#     if user_message: # Only proceed if user_message hasn't been "consumed" by a direct "yes"
#         # Sales & Performance Queries
#         if "total sales last week" in lower_user_message or "sales last week" in lower_user_message:
#             dynamic_data_context = get_total_sales_last_week()
#         elif "revenue this month" in lower_user_message:
#             dynamic_data_context = get_monthly_revenue(month_offset=0)
#         elif "compare this month sales with last month" in lower_user_message or "compare this month's sales with last month's" in lower_user_message:
#             dynamic_data_context = compare_monthly_sales()
#         elif "revenue trend for the last 6 months" in lower_user_message:
#             dynamic_data_context = get_revenue_trend_last_n_months(n=6)
#         elif "average deal size this quarter" in lower_user_message:
#             dynamic_data_context = get_average_deal_size_this_quarter()
#         elif "daily sales for the past week" in lower_user_message:
#             dynamic_data_context = get_daily_sales_last_week()
#         elif "top revenue sources this year" in lower_user_message:
#             dynamic_data_context = get_top_revenue_sources_this_year()
#         elif "biggest deal in q2" in lower_user_message:
#             dynamic_data_context = get_biggest_deal_in_quarter(quarter=2)
#         elif "potential revenue this week" in lower_user_message or "deals acquired this week" in lower_user_message or ("amount of deals acquired" in lower_user_message and "this week" in lower_user_message):
#             dynamic_data_context = get_total_acquired_deals_revenue_by_timeframe('this_week')
#         elif "potential revenue this month" in lower_user_message or "deals acquired this month" in lower_user_message or ("amount of deals acquired" in lower_user_message and "this month" in lower_user_message):
#             dynamic_data_context = get_total_acquired_deals_revenue_by_timeframe('this_month')
#         elif "potential revenue this quarter" in lower_user_message or "deals acquired this quarter" in lower_user_message or ("amount of deals acquired" in lower_user_message and "this quarter" in lower_user_message):
#             dynamic_data_context = get_total_acquired_deals_revenue_by_timeframe('this_quarter')
#         elif "potential revenue this year" in lower_user_message or "deals acquired this year" in lower_user_message or ("amount of deals acquired" in lower_user_message and "this year" in lower_user_message):
#             dynamic_data_context = get_total_acquired_deals_revenue_by_timeframe('this_year')
#         elif "amount of closed win" in lower_user_message or "potential revenue" in lower_user_message or "deals won revenue" in lower_user_message or "revenue from acquired deals" in lower_user_message or "amount of deals acquired" in lower_user_message:
#             dynamic_data_context = get_total_acquired_deals_revenue_by_timeframe('all_time')
            
#         # Seller Prediction & Scoring
#         elif "how much seller" in lower_user_message or "total sellers" in lower_user_message or "number of sellers" in lower_user_message or "count of sellers" in lower_user_message:
#             dynamic_data_context = get_total_sellers_count()
#         elif "sellers most likely to convert this week" in lower_user_message or "sellers have the highest chance of converting" in lower_user_message:
#             dynamic_data_context = get_sellers_likely_to_convert_this_week()
#         elif "sellers with a score above" in lower_user_message:
#             try:
#                 score_str = lower_user_message.split("sellers with a score above ")[1].split("?")[0].strip()
#                 min_score = int(score_str.split()[0])
#                 dynamic_data_context = get_sellers_by_score_above(min_score)
#             except (ValueError, IndexError):
#                 dynamic_data_context = "Please specify a valid score, e.g., 'Show me sellers with a score above 80'."
#         elif "conversion probability for" in lower_user_message:
#             try:
#                 name_parts = lower_user_message.split("conversion probability for ")[1].split("?")[0].strip().split()
#                 first_name = name_parts[0].title() if name_parts else ""
#                 last_name = name_parts[1].title() if len(name_parts) > 1 else ""
#                 dynamic_data_context = get_conversion_probability_for_seller(first_name, last_name)
#             except IndexError:
#                 dynamic_data_context = "Please specify a seller's full name, e.g., 'What’s the conversion probability for John Doe?'"
#         elif "coldest sellers" in lower_user_message:
#             dynamic_data_context = get_coldest_sellers()
#         elif "sellers need immediate attention" in lower_user_message or "high-priority sellers today" in lower_user_message or "top 5 high-priority sellers today" in lower_user_message or "urgent sellers" in lower_user_message:
#             dynamic_data_context = get_high_priority_sellers_today()
        
#         # Smart Alerts & Suggestions - Mostly placeholders for complex logic
#         elif "on track to hit my weekly goal" in lower_user_message or "hit my monthly target" in lower_user_message or "reach my quarterly goal" in lower_user_message or "falling behind on any targets" in lower_user_message:
#             dynamic_data_context = check_weekly_goal_track()
#         elif "task should i prioritize today" in lower_user_message:
#             dynamic_data_context = "Prioritizing tasks requires a system for task importance and due dates. I can show you tasks due today or overdue tasks."
#         elif "suggest sellers i should follow up with" in lower_user_message:
#             dynamic_data_context = suggest_sellers_for_follow_up()
#         elif "alert me if any deal is stalling" in lower_user_message:
#             dynamic_data_context = alert_deal_stalling()
#         elif "highlight any overdue tasks" in lower_user_message:
#             dynamic_data_context = highlight_overdue_tasks()
#         elif "deals are nearing close dates" in lower_user_message:
#             dynamic_data_context = get_deals_nearing_close_dates()

#         # CRM Data Lookup
#         elif "status of" in lower_user_message and "client" in lower_user_message:
#             try:
#                 client_name = lower_user_message.split("status of ")[1].split("?")[0].strip().title()
#                 dynamic_data_context = get_client_status_from_db(client_name)
#             except IndexError:
#                 dynamic_data_context = "Please specify a client name, e.g., 'What's the status of Havells India?'"
#         elif "last speak with" in lower_user_message or "last contact with" in lower_user_message:
#             try:
#                 contact_name = lower_user_message.split("last speak with ")[1].split("?")[0].strip().title() if "last speak with" in lower_user_message else \
#                                lower_user_message.split("last contact with ")[1].split("?")[0].strip().title()
#                 dynamic_data_context = get_last_contact_date_from_db(contact_name)
#             except IndexError:
#                 dynamic_data_context = "Please specify a contact's full name, e.g., 'When did I last speak with Parth Sarthi?'"
#         elif "who's assigned to the" in lower_user_message and "deal" in lower_user_message:
#             try:
#                 deal_name = lower_user_message.split("who's assigned to the ")[1].split(" deal")[0].strip().title()
#                 dynamic_data_context = get_owner_of_deal(deal_name)
#             except IndexError:
#                 dynamic_data_context = "Please specify a deal name, e.g., 'Who's assigned to the HCL AppScan deal?'"
#         elif "deal value for" in lower_user_message:
#             try:
#                 deal_name = lower_user_message.split("deal value for ")[1].split("?")[0].strip().title()
#                 dynamic_data_context = get_deal_value(deal_name)
#             except IndexError:
#                 dynamic_data_context = "Please specify a deal name, e.g., 'What's the deal value for HCL AppScan?'"
#         elif "expected to close" in lower_user_message and "deal" in lower_user_message:
#             try:
#                 deal_name = lower_user_message.split("when is ")[1].split(" expected to close")[0].strip().title()
#                 dynamic_data_context = get_expected_close_date_of_deal(deal_name)
#             except IndexError:
#                 dynamic_data_context = "Please specify a deal name, e.g., 'When is HCL AppScan expected to close?'"
#         elif "show all notes for" in lower_user_message and "seller" in lower_user_message:
#             try:
#                 name_parts = lower_user_message.split("show all notes for ")[1].split(" seller")[0].strip().split()
#                 first_name = name_parts[0].title() if name_parts else ""
#                 last_name = name_parts[1].title() if len(name_parts) > 1 else ""
#                 dynamic_data_context = get_notes_for_seller(first_name, last_name)
#             except IndexError:
#                 dynamic_data_context = "Please specify a seller's full name, e.g., 'Show all notes for Amit Seth seller.'"
#         elif "communication history with" in lower_user_message and "client" in lower_user_message:
#             try:
#                 client_name = lower_user_message.split("communication history with ")[1].split("client")[0].strip().title()
#                 dynamic_data_context = get_communication_history_with_client(client_name)
#             except IndexError:
#                 dynamic_data_context = "Please specify a client name, e.g., 'Show communication history with Havells India.'"

#         # Deals & Pipelines
#         elif "show all open deals" in lower_user_message:
#             dynamic_data_context = get_all_open_deals()
#         elif "deals are in the negotiation stage" in lower_user_message:
#             dynamic_data_context = get_deals_in_negotiation_stage()
#         elif "how many deals closed this month" in lower_user_message:
#             dynamic_data_context = get_deals_closed_this_month()
#         elif "deals are expected to close this week" in lower_user_message:
#             dynamic_data_context = get_deals_closing_this_week()
#         elif "average time to close a deal" in lower_user_message:
#             dynamic_data_context = get_average_time_to_close_deal()
#         elif "how many deals are overdue" in lower_user_message:
#             dynamic_data_context = get_overdue_deals()
#         elif "who’s the top deal closer this month" in lower_user_message:
#             dynamic_data_context = get_top_deal_closer_this_month()
        
#         # Tasks & Follow-ups
#         elif "what tasks are due today" in lower_user_message:
#             dynamic_data_context = get_tasks_due_today()
#         elif "show all completed tasks this week" in lower_user_message:
#             dynamic_data_context = get_completed_tasks_this_week()
#         elif "what tasks are assigned to" in lower_user_message:
#             try:
#                 user_name = lower_user_message.split("what tasks are assigned to ")[1].split("?")[0].strip().title()
#                 dynamic_data_context = get_tasks_assigned_to_user(user_name)
#             except IndexError:
#                 dynamic_data_context = "Please specify a user name, e.g., 'What tasks are assigned to Amit Seth?'"
#         elif "what tasks are linked to" in lower_user_message and "deal" in lower_user_message:
#             try:
#                 deal_name = lower_user_message.split("what tasks are linked to ")[1].split(" deal")[0].strip().title()
#                 dynamic_data_context = get_tasks_linked_to_deal(deal_name)
#             except IndexError:
#                 dynamic_data_context = "Please specify a deal name, e.g., 'What tasks are linked to HCL AppScan deal?'"
#         elif "how many meetings are scheduled this week" in lower_user_message:
#             dynamic_data_context = get_meetings_scheduled_this_week()
#         elif "show calls made this month" in lower_user_message:
#             dynamic_data_context = get_calls_made_this_month()

#         # Generic or complex queries not fully implemented dynamically
#         else:
#             dynamic_data_context = "" # Reset context if no direct match for dynamic data


#     # Construct the base system instruction
#     base_system_instruction = f"""
#     You are an AI assistant for Team1 Consulting's CRM portal.
#     Your purpose is to answer questions about Team1 Consulting's services and the features of the CRM portal.
#     You can also provide real-time insights by querying the company's internal MongoDB database for sales, sellers, accounts, contacts, and task information.
#     Be helpful, informative, and concise. Provide specific details from the database when available.

#     Here is general information about Team1 Consulting:
#     {business_knowledge}

#     Here is general information about the CRM Portal and its features:
#     {crm_knowledge}

#     Here is specific real-time data retrieved based on the user's current query from the MongoDB database:
#     {dynamic_data_context}

#     IMPORTANT CONTEXT GUIDELINES FOR RESPONDING:
#     - If a user asks for "amount of seller generated" or "how much seller", always interpret this as a request for the *total count of sellers*.
#     - If the user asks for "potential revenue from deals" or "amount of deals acquired" (including "amount of closed win"), and no specific timeframe is given, default to providing the *total revenue from all 'Closed Won' deals (all time)*.
#     - If the user provides a timeframe after asking about "potential revenue" or "deals acquired" (e.g., "this week"), provide the revenue for 'Closed Won' deals within that specific timeframe.
#     - If a question cannot be answered by the provided general knowledge or the specific real-time data (e.g., if the data is missing for a requested item, or the query is too complex for current tools, or requires a predictive model),
#       politely state that you can only answer questions based on the available information and tools. Do NOT ask clarifying questions if the answer can be inferred from the current conversation history and available tools.
#     - Do not make up information or financial figures.
#     """

#     # Construct the final chat history for the LLM
#     llm_chat_history = [
#         {"role": "user", "parts": [{"text": base_system_instruction}]},
#         {"role": "model", "parts": [{"text": "Hello! How can I assist you with Team1 Consulting or our CRM portal today?"}]}
#     ]

#     # Append actual conversation history from frontend, skipping redundant initial greeting
#     for msg in chat_history_from_frontend:
#         if msg['role'] == 'user' or (msg['role'] == 'model' and msg['parts'][0]['text'] != "Hello! How can I assist you with Team1 Consulting or our CRM portal today?"):
#             llm_chat_history.append(msg)
    
#     # Ensure the current user message is always the very last message in the history for the LLM
#     if not llm_chat_history or llm_chat_history[-1]['parts'][0]['text'] != user_message:
#         llm_chat_history.append({"role": "user", "parts": [{"text": user_message}]})


#     payload = {
#         "contents": llm_chat_history, # Sending full history for context
#         "generationConfig": {
#             "temperature": 0.7,
#             "topP": 0.9,
#             "topK": 40
#         }
#     }

#     # Gemini API endpoint
#     api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
#     app.logger.info(f"Attempting to call Gemini API at: {api_url}")

#     try:
#         response = requests.post(api_url, headers={'Content-Type': 'application/json'}, json=payload)
#         response.raise_for_status()
#         result = response.json()
#         app.logger.info(f"Gemini API response received: {result}")

#         if result.get("candidates") and result["candidates"][0].get("content") and result["candidates"][0]["content"].get("parts"):
#             assistant_response = result["candidates"][0]["content"].get("parts")[0].get("text", "")
#             app.logger.info(f"AI response: {assistant_response[:50]}...")
#             return jsonify({"response": assistant_response})
#         else:
#             app.logger.error(f"Unexpected Gemini API response structure or empty content: {result}")
#             return jsonify({"error": "Failed to get a valid response from the AI. Unexpected structure."}), 500

#     except requests.exceptions.RequestException as e:
#         app.logger.error(f"Error calling Gemini API: {e}")
#         return jsonify({"error": f"Failed to connect to AI service: {e}"}), 500
#     except Exception as e:
#         app.logger.error(f"An unexpected error occurred in Flask app: {e}")
#         return jsonify({"error": f"An internal server error occurred: {e}"}), 500

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)

# # app.py
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import requests
# import os
# import datetime
# from pymongo import MongoClient
# from dotenv import load_dotenv
# from collections import defaultdict

# # Load environment variables from .env file
# load_dotenv()

# app = Flask(__name__)
# # Enable CORS for all routes, allowing frontend to communicate
# CORS(app)

# # Retrieve Gemini API Key from environment variables
# # IMPORTANT: Replace "YOUR_GEMINI_API_KEY_HERE" with your actual key if not using .env
# GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "AIzaSyCN68_lXJVM06bEyZ8aIe9pmEOE3ByoNNk")

# # --- Define Global Knowledge Bases for the Chatbot Context ---
# # This information provides the foundational knowledge about Team1 Consulting's services
# # and the CRM portal features, regardless of specific user queries.
# business_knowledge = """
# Team1 Consulting offers a wide range of services to help businesses thrive through digital transformation.
# Our core services include:
# - Cloud Services: We assist with cloud migration (e.g., from on-prem to AWS, Azure, Google Cloud), optimization of cloud resources, cost management, and robust cloud security. We handle IaaS, PaaS, and SaaS implementations. Our approach is phased: assessment, planning, migration, and ongoing management.
# - Cyber Security: We provide comprehensive solutions including vulnerability assessments, penetration testing, security audits, managed security services (SOC-as-a-Service), incident response planning, and data protection strategies. We focus on protecting sensitive data, intellectual property, and ensuring business continuity against evolving threats. Our solutions comply with industry standards like ISO 27001 and GDPR.
# - Consulting: We offer strategic IT consulting, digital transformation roadmapping, process optimization (e.g., Lean Six Sigma principles applied to IT workflows), IT governance, and technology advisory services. We help clients align IT strategy with business goals to drive efficiency and innovation.
# - IT Infrastructure: Our services cover network design and implementation, server management (physical and virtual), data center solutions, virtualization, and infrastructure monitoring. We ensure your foundational IT systems are robust, scalable, and highly available.
# - Data Analytics and AI: We help businesses leverage their data for actionable insights. This includes data warehousing, ETL processes, business intelligence (BI) dashboarding (using tools like Tableau, Power BI), predictive analytics, and custom AI/ML model development for tasks like customer segmentation, demand forecasting, and automation. We focus on turning raw data into strategic assets.
# - Managed Services: We provide ongoing monitoring, maintenance, and support for your IT infrastructure and applications. This includes 24/7 helpdesk support, proactive problem resolution, patch management, backup and disaster recovery, and IT asset management, ensuring smooth operations and minimal downtime.

# Why choose Team1 Consulting? We emphasize a client-centric approach, deep industry expertise, proven methodologies, and a strong track record of delivering measurable ROI. We focus on tailored solutions, not one-size-all.

# How we deliver solutions: Our typical project lifecycle involves discovery and assessment, solution design, agile development/implementation, rigorous testing, deployment, and post-implementation support. We use project management methodologies like Agile and Scrum.

# How much does it cost? Our pricing varies based on the scope, complexity, and duration of the project. We typically offer project-based fixed fees, time-and-materials, or managed service subscriptions. We conduct a detailed needs assessment to provide a tailored proposal.
# """

# crm_knowledge = """
# Our CRM portal helps manage customer relationships efficiently and comprehensively. Key features include:
# - Accounts: Represents companies or organizations you do business with. An account typically holds information about the company's profile (industry, size), financial details, associated contacts, and all related deals/opportunities and activities. You can view account history, notes, and attachments.
# - Sellers: Potential customers or prospects. Sellers are the initial entry point. Information captured includes source (e.g., website, referral), seller score, and initial contact details. How to convert a Seller: Once a seller is qualified (e.g., meets BANT criteria - Budget, Authority, Need, Timeline), it can be converted into a new Contact, Account, and potentially a new Deal, streamlining the sales process.
# - Deals (Opportunities): Represents potential revenue-generating opportunities linked to Accounts or Contacts. Deals track the entire sales pipeline from qualification to closure. You can set deal stages (e.g., Prospecting, Qualification, Proposal, Negotiation, Closed Won/Lost), track estimated revenue, close dates, and competitor information. How to track deal progress: By updating stages, adding activities, and logging communications.
# - Contacts: Individual people associated with Accounts or Sellers. Contacts store personal information (title, department), preferred communication methods, and a detailed history of interactions (calls, emails, meetings). Why are contacts important? They enable personalized communication and building long-term relationships.
# - Tasks: Specific activities or to-dos related to any CRM record (sellers, accounts, deals, contacts). Tasks help users manage their workload, ensure follow-ups, and meet deadlines. You can assign tasks, set due dates, and mark completion. How to use tasks effectively: Assign clear descriptions, link to relevant CRM records, and utilize reminders.
# - Meetings & Calls: Log and and schedule all customer interactions directly within the CRM. This provides a complete communication history tied to each record.
# - Reports & Dashboards: Generate insightful reports on all CRM data. Examples include: seller conversion rates (how many sellers convert to deals?), sales pipeline health, team performance, overdue tasks, and customer churn analysis. Dashboards provide a visual summary of key metrics. How to create custom reports: Navigate to the 'Reports' module, select desired data fields, apply filters, and choose visualization types.
# - Projects: Manage complex client engagements, breaking them down into manageable phases and tasks.
# - Customization: The CRM is highly customizable, allowing administrators to add custom fields, create automated workflows, and design tailored layouts to fit specific business needs.

# How to measure CRM effectiveness: Key metrics include Seller-to-Opportunity conversion rate, Sales Cycle Length, Customer Acquisition Cost (CAC), Customer Lifetime Value (CLTV), and Customer Retention Rate. You can generate reports within the CRM to track these.
# """

# # --- MongoDB Connection Setup ---
# # Function to get a MongoDB client instance. This ensures that a new connection is
# # established for each request, or an existing one is reused from the pool.
# def get_mongo_client():
#     # Retrieve MongoDB URL from environment variables, default to localhost if not set
#     mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/team1')
#     client = MongoClient(mongo_url)
#     app.logger.info(f"Attempting to connect to MongoDB at: {mongo_url}")
#     return client

# # --- Helper Function for Date Parsing ---
# # Attempts to parse a date string into a datetime object using common formats.
# def parse_date_from_str(date_str):
#     if not date_str:
#         return None
#     # List of date formats to try
#     for fmt in ("%Y-%m-%d", "%Y/%m/%d", "%m-%d-%Y", "%m/%d/%Y", "%Y-%m-%dT%H:%M:%S.%f%z"):
#         try:
#             return datetime.datetime.strptime(date_str, fmt)
#         except ValueError:
#             continue
#     return None # Return None if no format matches

# # --- Dynamic Data Retrieval Functions from MongoDB ---
# # These functions query the MongoDB database to retrieve real-time CRM data.
# # Each function is designed to answer a specific type of query from the chatbot.

# def get_total_sales_last_week():
#     """Calculates total sales from deals created in the last 7 days."""
#     app.logger.info("Executing get_total_sales_last_week function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1 # Access the 'team1' database
#         deals_collection = db.deals # Access the 'deals' collection

#         end_date = datetime.datetime.now()
#         start_date = end_date - datetime.timedelta(days=7)

#         # Query for deals created within the last 7 days with an 'amount' field
#         sales_records = list(deals_collection.find(
#             {"createdAt": {"$gte": start_date, "$lt": end_date}, "amount": {"$exists": True, "$ne": None}}
#         ))
        
#         total_sales = 0
#         for record in sales_records:
#             amount_value = record.get('amount')
#             if isinstance(amount_value, str):
#                 # Clean string: remove currency symbols and commas before conversion
#                 cleaned_amount_str = amount_value.replace('₹', '').replace('$', '').replace(',', '').strip()
#                 try:
#                     total_sales += float(cleaned_amount_str)
#                 except ValueError:
#                     app.logger.warning(f"Could not convert amount '{amount_value}' to float for deal: {record.get('dealName', 'Unnamed')}")
#             elif isinstance(amount_value, (int, float)):
#                 total_sales += amount_value

#         client.close()
#         return f"Total sales for the last 7 days: ₹{total_sales:,.2f}."
#     except Exception as e:
#         app.logger.error(f"Error fetching total sales last week from MongoDB: {e}")
#         return "I encountered an error trying to retrieve total sales for last week."

# def get_monthly_revenue(month_offset=0):
#     """
#     Calculates total revenue for a specific month.
#     month_offset: 0 for current month, 1 for last month, etc.
#     """
#     app.logger.info(f"Executing get_monthly_revenue function for offset {month_offset}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         today = datetime.datetime.now()
#         # Calculate the start of the target month
#         target_month_start = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
#         for _ in range(month_offset):
#             # Move to the beginning of the previous month
#             target_month_start = (target_month_start - datetime.timedelta(days=1)).replace(day=1)
        
#         # Calculate the start of the next month (to define the end of the target month)
#         target_month_end = (target_month_start + datetime.timedelta(days=32)).replace(day=1)

#         sales_records = list(deals_collection.find(
#             {"createdAt": {"$gte": target_month_start, "$lt": target_month_end}, "amount": {"$exists": True, "$ne": None}}
#         ))
        
#         total_revenue = 0
#         for record in sales_records:
#             amount_value = record.get('amount')
#             if isinstance(amount_value, str):
#                 cleaned_amount_str = amount_value.replace('₹', '').replace('$', '').replace(',', '').strip()
#                 try:
#                     total_revenue += float(cleaned_amount_str)
#                 except ValueError:
#                     app.logger.warning(f"Could not convert amount '{amount_value}' to float for deal: {record.get('dealName', 'Unnamed')}")
#             elif isinstance(amount_value, (int, float)):
#                 total_revenue += amount_value

#         client.close()
#         month_name = (target_month_start).strftime('%B %Y')
#         return f"Total revenue for {month_name}: ₹{total_revenue:,.2f}."
#     except Exception as e:
#         app.logger.error(f"Error fetching monthly revenue from MongoDB: {e}")
#         return "I encountered an error trying to retrieve monthly revenue."

# def compare_monthly_sales():
#     """Compares current month's sales with last month's sales."""
#     app.logger.info("Executing compare_monthly_sales function.")
#     current_month_revenue_str = get_monthly_revenue(month_offset=0)
#     last_month_revenue_str = get_monthly_revenue(month_offset=1)

#     # Extract numerical values for comparison, handling potential errors
#     current_revenue = 0
#     if '₹' in current_month_revenue_str:
#         try:
#             current_revenue = float(current_month_revenue_str.split('₹')[1].split('.')[0].replace(',', ''))
#         except ValueError:
#             pass # Handle case where conversion fails

#     last_revenue = 0
#     if '₹' in last_month_revenue_str:
#         try:
#             last_revenue = float(last_month_revenue_str.split('₹')[1].split('.')[0].replace(',', ''))
#         except ValueError:
#             pass # Handle case where conversion fails

#     comparison = ""
#     if current_revenue > last_revenue:
#         diff = current_revenue - last_revenue
#         comparison = f"This month's sales are ₹{diff:,.2f} higher than last month's."
#     elif last_revenue > current_revenue:
#         diff = last_revenue - current_revenue
#         comparison = f"This month's sales are ₹{diff:,.2f} lower than last month's."
#     else:
#         comparison = "This month's sales are similar to last month's."
    
#     return f"{current_month_revenue_str}\n{last_month_revenue_str}\n{comparison}"


# def get_revenue_trend_last_n_months(n=6):
#     """Retrieves revenue trend for the last N months."""
#     app.logger.info(f"Executing get_revenue_trend_last_n_months function for {n} months.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         monthly_revenues = []
#         # Iterate from n months ago to the current month
#         for i in range(n -1, -1, -1): 
#             today = datetime.datetime.now()
#             target_month_start = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
#             for _ in range(i):
#                 target_month_start = (target_month_start - datetime.timedelta(days=1)).replace(day=1)
            
#             target_month_end = (target_month_start + datetime.timedelta(days=32)).replace(day=1)

#             pipeline = [
#                 {"$match": {"createdAt": {"$gte": target_month_start, "$lt": target_month_end}, "amount": {"$exists": True, "$ne": None}}},
#                 # Sum amounts, cleaning string values if necessary
#                 {"$addFields": {
#                     "parsedAmount": {
#                         "$cond": {
#                             "if": {"$and": [{"$ne": [{"$type": "$amount"}, "double"]}, {"$ne": [{"$type": "$amount"}, "int"]}]},
#                             "then": {"$toDouble": {"$replaceAll": {"input": {"$replaceAll": {"input": "$amount", "find": "₹", "replacement": ""}}, "find": ",", "replacement": ""}}},
#                             "else": "$amount"
#                         }
#                     }
#                 }},
#                 {"$group": {"_id": None, "total_revenue": {"$sum": "$parsedAmount"}}}
#             ]
#             result = list(deals_collection.aggregate(pipeline))
            
#             month_name = target_month_start.strftime('%b %Y')
#             revenue = result[0]['total_revenue'] if result else 0
#             monthly_revenues.append(f"{month_name}: ₹{revenue:,.2f}")
        
#         client.close()
#         return "Revenue trend for the last {} months:\n{}".format(n, "\n".join(monthly_revenues))
#     except Exception as e:
#         app.logger.error(f"Error fetching revenue trend from MongoDB: {e}")
#         return "I encountered an error trying to retrieve the revenue trend."

# def get_average_deal_size_this_quarter():
#     """Calculates the average deal size for the current quarter."""
#     app.logger.info("Executing get_average_deal_size_this_quarter function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         # Determine current quarter
#         today = datetime.datetime.now()
#         current_quarter = (today.month - 1) // 3 + 1
#         q_start_month = (current_quarter - 1) * 3 + 1
#         q_start = datetime.datetime(today.year, q_start_month, 1)
#         # End of quarter is beginning of next quarter
#         q_end = datetime.datetime(today.year, q_start_month + 3, 1) if q_start_month + 3 <= 12 else datetime.datetime(today.year + 1, 1, 1)

#         pipeline = [
#             {"$match": {"createdAt": {"$gte": q_start, "$lt": q_end}, "amount": {"$exists": True, "$ne": None}}},
#             {"$addFields": {
#                 "parsedAmount": {
#                     "$cond": {
#                         "if": {"$and": [{"$ne": [{"$type": "$amount"}, "double"]}, {"$ne": [{"$type": "$amount"}, "int"]}]},
#                         "then": {"$toDouble": {"$replaceAll": {"input": {"$replaceAll": {"input": "$amount", "find": "₹", "replacement": ""}}, "find": ",", "replacement": ""}}},
#                         "else": "$amount"
#                     }
#                 }
#             }},
#             {"$group": {"_id": None, "total_amount": {"$sum": "$parsedAmount"}, "count": {"$sum": 1}}}
#         ]
#         result = list(deals_collection.aggregate(pipeline))

#         client.close()
#         if result and result[0]['count'] > 0:
#             avg_size = result[0]['total_amount'] / result[0]['count']
#             return f"The average deal size this quarter is ₹{avg_size:,.2f}."
#         return "No deals found this quarter to calculate average size."
#     except Exception as e:
#         app.logger.error(f"Error fetching average deal size from MongoDB: {e}")
#         return "I encountered an error trying to retrieve average deal size."

# def get_daily_sales_last_week():
#     """Retrieves daily sales figures for the past 7 days."""
#     app.logger.info("Executing get_daily_sales_last_week function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         today = datetime.datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
#         daily_sales = defaultdict(float)

#         for i in range(7):
#             day_start = today - datetime.timedelta(days=i)
#             day_end = day_start + datetime.timedelta(days=1)
            
#             sales_for_day = list(deals_collection.find(
#                 {"createdAt": {"$gte": day_start, "$lt": day_end}, "amount": {"$exists": True, "$ne": None}}
#             ))

#             for record in sales_for_day:
#                 amount_value = record.get('amount')
#                 if isinstance(amount_value, str):
#                     cleaned_amount_str = amount_value.replace('₹', '').replace('$', '').replace(',', '').strip()
#                     try:
#                         daily_sales[day_start.strftime('%Y-%m-%d')] += float(cleaned_amount_str)
#                     except ValueError:
#                         app.logger.warning(f"Could not convert amount '{amount_value}' to float for deal: {record.get('dealName', 'Unnamed')}")
#                 elif isinstance(amount_value, (int, float)):
#                     daily_sales[day_start.strftime('%Y-%m-%d')] += amount_value
        
#         client.close()
#         report = ["Daily sales for the past week:"]
#         for date_str in sorted(daily_sales.keys()):
#             report.append(f"{date_str}: ₹{daily_sales[date_str]:,.2f}")
#         return "\n".join(report)
#     except Exception as e:
#         app.logger.error(f"Error fetching daily sales from MongoDB: {e}")
#         return "I encountered an error trying to retrieve daily sales."

# def get_top_revenue_sources_this_year():
#     """Identifies the top 5 revenue sources (by deal owner) for the current year."""
#     app.logger.info("Executing get_top_revenue_sources_this_year function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         current_year_start = datetime.datetime(datetime.datetime.now().year, 1, 1)
#         next_year_start = datetime.datetime(datetime.datetime.now().year + 1, 1, 1)

#         pipeline = [
#             {"$match": {"createdAt": {"$gte": current_year_start, "$lt": next_year_start}, "amount": {"$exists": True, "$ne": None}}},
#             {"$addFields": {
#                 "parsedAmount": {
#                     "$cond": {
#                         "if": {"$and": [{"$ne": [{"$type": "$amount"}, "double"]}, {"$ne": [{"$type": "$amount"}, "int"]}]},
#                         "then": {"$toDouble": {"$replaceAll": {"input": {"$replaceAll": {"input": "$amount", "find": "₹", "replacement": ""}}, "find": ",", "replacement": ""}}},
#                         "else": "$amount"
#                     }
#                 }
#             }},
#             {"$group": {"_id": "$dealOwner", "total_revenue": {"$sum": "$parsedAmount"}}},
#             {"$sort": {"total_revenue": -1}},
#             {"$limit": 5}
#         ]
#         top_sources = list(deals_collection.aggregate(pipeline))

#         client.close()
#         if top_sources:
#             formatted_sources = ", ".join([f"{s['_id']} (₹{s['total_revenue']:,.2f})" for s in top_sources])
#             return f"Top 5 revenue sources this year (by Deal Owner): {formatted_sources}."
#         return "No top revenue sources found for this year."
#     except Exception as e:
#         app.logger.error(f"Error fetching top revenue sources from MongoDB: {e}")
#         return "I encountered an error trying to retrieve top revenue sources."

# def get_biggest_deal_in_quarter(quarter=None, year=None):
#     """Finds the biggest deal (by amount) in a specified quarter and year."""
#     app.logger.info(f"Executing get_biggest_deal_in_quarter function for Q{quarter} {year}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         target_year = year if year else datetime.datetime.now().year
#         target_quarter = quarter if quarter else (datetime.datetime.now().month - 1) // 3 + 1

#         q_start_month = (target_quarter - 1) * 3 + 1
#         q_start = datetime.datetime(target_year, q_start_month, 1)
#         q_end = datetime.datetime(target_year, q_start_month + 3, 1) if q_start_month + 3 <= 12 else datetime.datetime(target_year + 1, 1, 1)

#         pipeline = [
#             {"$match": {"createdAt": {"$gte": q_start, "$lt": q_end}, "amount": {"$exists": True, "$ne": None}}},
#             {"$addFields": {
#                 "parsedAmount": {
#                     "$cond": {
#                         "if": {"$and": [{"$ne": [{"$type": "$amount"}, "double"]}, {"$ne": [{"$type": "$amount"}, "int"]}]},
#                         "then": {"$toDouble": {"$replaceAll": {"input": {"$replaceAll": {"input": "$amount", "find": "₹", "replacement": ""}}, "find": ",", "replacement": ""}}},
#                         "else": "$amount"
#                     }
#                 }
#             }},
#             {"$sort": {"parsedAmount": -1}}, # Sort by the parsed amount
#             {"$limit": 1}
#         ]
#         biggest_deal = list(deals_collection.aggregate(pipeline))

#         client.close()
#         if biggest_deal:
#             deal = biggest_deal[0]
#             # Use the parsedAmount for display
#             return f"The biggest deal in Q{target_quarter} {target_year} was '{deal.get('dealName', 'Unnamed Deal')}' for ₹{deal.get('parsedAmount', 0):,.2f}, closed by {deal.get('dealOwner', 'Unknown Owner')}."
#         return f"No deals found in Q{target_quarter} {target_year} to determine the biggest."
#     except Exception as e:
#         app.logger.error(f"Error fetching biggest deal from MongoDB: {e}")
#         return "I encountered an error trying to retrieve the biggest deal."

# # --- Seller Prediction & Scoring (Placeholders for ML/complex logic) ---
# def get_sellers_likely_to_convert_this_week():
#     """Placeholder for advanced seller prediction based on ML."""
#     app.logger.info("Executing get_sellers_likely_to_convert_this_week function (placeholder).")
#     # This would require a predictive model (ML) and a 'conversion_likelihood' field
#     return "Predicting seller conversion likelihood requires a trained machine learning model. I can highlight sellers with high engagement or recent activity if you have those metrics."

# def get_sellers_by_score_above(min_score):
#     """Retrieves sellers with a seller score above a specified minimum."""
#     app.logger.info(f"Executing get_sellers_by_score_above function (placeholder for score field).")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         sellers_collection = db.sellers
#         # This assumes a 'score' field exists in your sellers collection as a number
#         high_score_sellers = list(sellers_collection.find({"score": {"$gte": min_score}}))
#         client.close()
#         if high_score_sellers:
#             names = ", ".join([f"{l.get('firstName', '')} {l.get('lastName', '')} (Score: {l.get('score')})" for l in high_score_sellers])
#             return f"Sellers with a score above {min_score}: {names}."
#         return f"No sellers found with a score above {min_score}."
#     except Exception as e:
#         app.logger.error(f"Error fetching sellers by score from MongoDB: {e}")
#         return "I encountered an error trying to retrieve sellers by score. Make sure 'score' field exists in your sellers collection and is a numerical type."

# def get_conversion_probability_for_seller(first_name, last_name):
#     """Placeholder for retrieving conversion probability of a specific seller."""
#     app.logger.info(f"Executing get_conversion_probability_for_seller for {first_name} {last_name} (placeholder).")
#     # This would require a predictive model and potentially a 'probability' field
#     return f"To predict the conversion probability for {first_name} {last_name}, I would need access to a seller scoring model. Based on static info, if {first_name} {last_name} exists, I can tell you their known attributes."

# def get_coldest_sellers():
#     """Placeholder for identifying sellers with least recent activity."""
#     app.logger.info("Executing get_coldest_sellers function (placeholder).")
#     # Define "coldest" (e.g., last_contacted_date, no activity in X days)
#     # Requires a 'last_contacted_date' field in sellers or contacts
#     return "Identifying the 'coldest' sellers requires tracking recent engagement or last contact dates. Can you define what 'cold' means in terms of days since last contact or activity?"

# def get_sellers_needing_immediate_attention():
#     """Placeholder for identifying high-priority sellers."""
#     app.logger.info("Executing get_sellers_needing_immediate_attention function (placeholder).")
#     # This could be high score, recent activity, nearing due date for a task, etc.
#     return "Sellers needing immediate attention often have high engagement scores, upcoming key milestones, or specific flags. I can show newly created sellers or high-priority tasks linked to sellers if you clarify what defines 'immediate attention'."


# # --- Smart Alerts & Suggestions (Placeholders for complex logic/pre-set thresholds) ---
# def check_weekly_goal_track():
#     """Placeholder for checking progress against weekly sales goals."""
#     app.logger.info("Executing check_weekly_goal_track function (placeholder).")
#     return "Tracking weekly goals requires knowing your defined weekly target and accessing real-time sales data. If you tell me your weekly sales target, I can compare it to your current weekly sales."

# def suggest_sellers_for_follow_up():
#     """Placeholder for suggesting sellers that require follow-up."""
#     app.logger.info("Executing suggest_sellers_for_follow_up function (placeholder).")
#     # Could be based on last contact date, seller score, recent activity
#     return "Suggesting sellers for follow-up requires a strategy, such as sellers not contacted in a while, or sellers with recent engagement. What criteria would you like to use?"

# def alert_deal_stalling(deal_name=None):
#     """Placeholder for alerting about deals that are stalled in the pipeline."""
#     app.logger.info(f"Executing alert_deal_stalling function for {deal_name} (placeholder).")
#     # Requires tracking deal stage duration.
#     return "Alerting on stalling deals requires tracking the time spent in each sales stage and comparing it to predefined benchmarks. I can show you all deals currently in the 'Negotiation' stage if that helps."

# def highlight_overdue_tasks():
#     """Highlights all tasks that are past their due date and not completed."""
#     app.logger.info("Executing highlight_overdue_tasks function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks

#         # Find tasks where status is not 'Completed' and dueDate is in the past (as YYYY-MM-DD string)
#         today = datetime.datetime.now().strftime("%Y-%m-%d")
#         overdue_tasks = list(tasks_collection.find(
#             {"status": {"$ne": "Completed"}, "dueDate": {"$lt": today}}
#         ))
#         client.close()

#         if overdue_tasks:
#             task_details = "\n".join([f"- '{t.get('subject', 'Unnamed Task')}' for {t.get('contact', 'Unknown Contact')} (Due: {t.get('dueDate')}, Priority: {t.get('priority', 'N/A')})" for t in overdue_tasks])
#             return f"You have {len(overdue_tasks)} overdue tasks:\n{task_details}"
#         return "You have no overdue tasks."
#     except Exception as e:
#         app.logger.error(f"Error fetching overdue tasks from MongoDB: {e}")
#         return "I encountered an error trying to retrieve overdue tasks."

# def get_deals_nearing_close_dates():
#     """Lists deals that are expected to close within the next 7 days and are not yet closed."""
#     app.logger.info("Executing get_deals_nearing_close_dates function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         today = datetime.datetime.now()
#         next_7_days = today + datetime.timedelta(days=7)

#         # Assuming closeDate is stored as a string in "YYYY-MM-DD" format
#         nearing_close_deals = list(deals_collection.find({
#             "closeDate": {"$lte": next_7_days.strftime("%Y-%m-%d")}, # Compare as strings
#             "salesStage": {"$nin": ["Closed Won", "Closed Lost"]} # Not already closed
#         }))
#         client.close()

#         if nearing_close_deals:
#             deal_info = "\n".join([f"- '{d.get('dealName', 'Unnamed Deal')}' with {d.get('contactName', 'Unknown Contact')} (Stage: {d.get('salesStage')}, Close Date: {d.get('closeDate')})" for d in nearing_close_deals])
#             return f"Deals nearing close dates in the next 7 days:\n{deal_info}"
#         return "No deals are nearing their close dates this week."
#     except Exception as e:
#         app.logger.error(f"Error fetching deals nearing close dates from MongoDB: {e}")
#         return "I encountered an error trying to retrieve deals nearing close dates."

# # --- CRM Data Lookup Functions ---
# # These functions retrieve specific details about CRM entities.

# def get_client_status_from_db(client_name):
#     """Retrieves basic status and industry information for a given client."""
#     app.logger.info(f"Executing get_client_status_from_db for {client_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         accounts_collection = db.accounts

#         client_record = accounts_collection.find_one({"accountName": client_name})
#         client.close()

#         if client_record:
#             status_proxy = client_record.get('accountType', 'N/A (type not found)')
#             industry = client_record.get('industry', 'Unknown Industry')
#             billing_address = client_record.get('billingAddress', 'N/A')
#             phone = client_record.get('phone', 'N/A')
#             email = client_record.get('email', 'N/A')
#             return f"Based on live data, client '{client_name}' is an '{status_proxy}' type account in the '{industry}' industry. Billing Address: {billing_address}, Phone: {phone}, Email: {email}."
#         return f"I could not find client '{client_name}' in the database."
#     except Exception as e:
#         app.logger.error(f"Error fetching client status from MongoDB: {e}")
#         return "I encountered an error trying to retrieve client status. Please check the backend logs for details."

# def get_last_contact_date_from_db(contact_name):
#     """Retrieves the most recent contact date for a given contact based on task due dates."""
#     app.logger.info(f"Executing get_last_contact_date_from_db for {contact_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks

#         # Find the most recent task associated with the contact name
#         related_tasks = list(tasks_collection.find(
#             {"contact": contact_name}
#         ).sort("dueDate", -1).limit(1)) # Sort by dueDate descending to get most recent

#         client.close()

#         if related_tasks:
#             most_recent_task = related_tasks[0]
#             due_date_str = most_recent_task.get('dueDate')
#             subject = most_recent_task.get('subject', 'a task')

#             last_contact_date = parse_date_from_str(due_date_str)
#             if last_contact_date:
#                 return f"Based on live data, the last recorded interaction with '{contact_name}' was a task ('{subject}') due on: {last_contact_date.strftime('%Y-%m-%d')}."
#             return f"Based on live data, the last recorded interaction with '{contact_name}' was a task ('{subject}'), but the date format was unexpected."
#         return f"No recent tasks or direct contact records found for '{contact_name}'."
#     except Exception as e:
#         app.logger.error(f"Error fetching last contact date from MongoDB: {e}")
#         return "I encountered an error trying to retrieve last contact date. Please check the backend logs for details."

# def get_owner_of_deal(deal_name):
#     """Retrieves the owner of a specific deal."""
#     app.logger.info(f"Executing get_owner_of_deal for {deal_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         deal_record = deals_collection.find_one({"dealName": deal_name})
#         client.close()

#         if deal_record:
#             owner = deal_record.get('dealOwner', 'N/A')
#             return f"The owner of the deal '{deal_name}' is {owner}."
#         return f"Deal '{deal_name}' not found."
#     except Exception as e:
#         app.logger.error(f"Error fetching deal owner from MongoDB: {e}")
#         return "I encountered an error trying to retrieve the deal owner."

# def get_deal_value(deal_name):
#     """Retrieves the value of a specific deal."""
#     app.logger.info(f"Executing get_deal_value for {deal_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         deal_record = deals_collection.find_one({"dealName": deal_name})
#         client.close()

#         if deal_record:
#             amount_value = deal_record.get('amount', 0)
#             # Ensure amount is a number for formatting
#             if isinstance(amount_value, str):
#                 cleaned_amount_str = amount_value.replace('₹', '').replace('$', '').replace(',', '').strip()
#                 try:
#                     amount_value = float(cleaned_amount_str)
#                 except ValueError:
#                     app.logger.warning(f"Could not convert amount '{amount_value}' to float for deal: {deal_name}")
#                     amount_value = 0 # Default to 0 if conversion fails

#             return f"The deal value for '{deal_name}' is ₹{amount_value:,.2f}."
#         return f"Deal '{deal_name}' not found."
#     except Exception as e:
#         app.logger.error(f"Error fetching deal value from MongoDB: {e}")
#         return "I encountered an error trying to retrieve the deal value."

# def get_expected_close_date_of_deal(deal_name):
#     """Retrieves the expected close date of a specific deal."""
#     app.logger.info(f"Executing get_expected_close_date_of_deal for {deal_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         deal_record = deals_collection.find_one({"dealName": deal_name})
#         client.close()

#         if deal_record:
#             close_date = deal_record.get('closeDate', 'N/A')
#             return f"The expected close date for '{deal_name}' is {close_date}."
#         return f"Deal '{deal_name}' not found."
#     except Exception as e:
#         app.logger.error(f"Error fetching expected close date from MongoDB: {e}")
#         return "I encountered an error trying to retrieve the expected close date."

# def get_notes_for_seller(first_name, last_name):
#     """Retrieves notes/description for a specific seller."""
#     app.logger.info(f"Executing get_notes_for_seller for {first_name} {last_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         sellers_collection = db.sellers

#         seller_record = sellers_collection.find_one({"firstName": first_name, "lastName": last_name})
#         client.close()

#         if seller_record:
#             description = seller_record.get('description', 'No specific notes found.')
#             return f"Notes for seller {first_name} {last_name}: {description}"
#         return f"Seller '{first_name} {last_name}' not found."
#     except Exception as e:
#         app.logger.error(f"Error fetching notes for seller from MongoDB: {e}")
#         return "I encountered an error trying to retrieve notes for the seller."

# def get_communication_history_with_client(client_name):
#     """Retrieves recent communication history for a client based on tasks."""
#     app.logger.info(f"Executing get_communication_history_with_client for {client_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks # Assuming tasks capture communication (meetings, calls)

#         # Find tasks related to the client (by account name in task's 'account' field)
#         # This is a simplification; a full communication history might need dedicated 'interactions'
#         # collection linked to accounts/contacts.
#         client_tasks = list(tasks_collection.find(
#             {"account": client_name}
#         ).sort("createdAt", -1).limit(5)) # Get last 5 tasks for this account

#         client.close()

#         if client_tasks:
#             history_items = "\n".join([
#                 f"- {t.get('subject')} with {t.get('contact', 'N/A')} (Due: {t.get('dueDate')}, Created: {t.get('createdAt').strftime('%Y-%m-%d')})"
#                 for t in client_tasks
#             ])
#             return f"Recent communication history with {client_name} (based on tasks):\n{history_items}"
#         return f"No recent communication history found for {client_name} based on tasks."
#     except Exception as e:
#         app.logger.error(f"Error fetching communication history from MongoDB: {e}")
#         return "I encountered an error trying to retrieve communication history."

# # --- Deals & Pipelines Functions ---

# def get_all_open_deals():
#     """Lists all deals that are not yet "Closed Won" or "Closed Lost"."""
#     app.logger.info("Executing get_all_open_deals function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         # Deals not in 'Closed Won' or 'Closed Lost' stages
#         open_deals = list(deals_collection.find(
#             {"salesStage": {"$nin": ["Closed Won", "Closed Lost"]}}
#         ))
#         client.close()

#         if open_deals:
#             deal_info = "\n".join([f"- '{d.get('dealName')}' (Stage: {d.get('salesStage')}, Amount: ₹{d.get('amount', 0):,.2f})" for d in open_deals])
#             return f"You have {len(open_deals)} open deals:\n{deal_info}"
#         return "You have no open deals at the moment."
#     except Exception as e:
#         app.logger.error(f"Error fetching open deals from MongoDB: {e}")
#         return "I encountered an error trying to retrieve open deals."

# def get_deals_in_negotiation_stage():
#     """Lists all deals currently in the "Negotiation" sales stage."""
#     app.logger.info("Executing get_deals_in_negotiation_stage function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         negotiation_deals = list(deals_collection.find(
#             {"salesStage": "Negotiation"}
#         ))
#         client.close()

#         if negotiation_deals:
#             deal_info = "\n".join([f"- '{d.get('dealName')}' (Amount: ₹{d.get('amount', 0):,.2f}, Close Date: {d.get('closeDate')})" for d in negotiation_deals])
#             return f"You have {len(negotiation_deals)} deals in the negotiation stage:\n{deal_info}"
#         return "No deals are currently in the negotiation stage."
#     except Exception as e:
#         app.logger.error(f"Error fetching deals in negotiation stage from MongoDB: {e}")
#         return "I encountered an error trying to retrieve deals in negotiation stage."

# def get_deals_closed_this_month():
#     """Provides a summary of deals closed (won and lost) this month."""
#     app.logger.info("Executing get_deals_closed_this_month function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         today = datetime.datetime.now()
#         start_of_month = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
#         next_month = start_of_month + datetime.timedelta(days=32)
#         end_of_month = next_month.replace(day=1)

#         closed_deals = list(deals_collection.find(
#             {"salesStage": {"$in": ["Closed Won", "Closed Lost"]},
#              # Assuming 'createdAt' marks the deal's entry, not necessarily its closure date.
#              # For accurate "closed this month", you'd need a 'closedAt' field updated upon closure.
#              "createdAt": {"$gte": start_of_month, "$lt": end_of_month}}
#         ))
#         client.close()

#         if closed_deals:
#             won_deals = [d for d in closed_deals if d.get('salesStage') == "Closed Won"]
#             lost_deals = [d for d in closed_deals if d.get('salesStage') == "Closed Lost"]
            
#             won_revenue = 0
#             for deal in won_deals:
#                 amount_value = deal.get('amount')
#                 if isinstance(amount_value, str):
#                     cleaned_amount_str = amount_value.replace('₹', '').replace('$', '').replace(',', '').strip()
#                     try:
#                         won_revenue += float(cleaned_amount_str)
#                     except ValueError:
#                         app.logger.warning(f"Could not convert amount '{amount_value}' to float for won deal: {deal.get('dealName', 'Unnamed')}")
#                 elif isinstance(amount_value, (int, float)):
#                     won_revenue += amount_value

#             lost_revenue = 0
#             for deal in lost_deals:
#                 amount_value = deal.get('amount')
#                 if isinstance(amount_value, str):
#                     cleaned_amount_str = amount_value.replace('₹', '').replace('$', '').replace(',', '').strip()
#                     try:
#                         lost_revenue += float(cleaned_amount_str)
#                     except ValueError:
#                         app.logger.warning(f"Could not convert amount '{amount_value}' to float for lost deal: {deal.get('dealName', 'Unnamed')}")
#                 elif isinstance(amount_value, (int, float)):
#                     lost_revenue += amount_value


#             return (f"This month, {len(closed_deals)} deals closed:\n"
#                     f"- Won: {len(won_deals)} deals (₹{won_revenue:,.2f})\n"
#                     f"- Lost: {len(lost_deals)} deals (₹{lost_revenue:,.2f})")
#         return "No deals closed this month."
#     except Exception as e:
#         app.logger.error(f"Error fetching closed deals this month from MongoDB: {e}")
#         return "I encountered an error trying to retrieve closed deals this month."

# def get_deals_closing_this_week():
#     """Lists deals expected to close this week that are not yet closed."""
#     app.logger.info("Executing get_deals_closing_this_week function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         today = datetime.datetime.now()
#         # Calculate start (Monday) and end (Sunday) of the current week
#         start_of_week = today - datetime.timedelta(days=today.weekday()) 
#         end_of_week = start_of_week + datetime.timedelta(days=7) 

#         # Assuming closeDate is a string in "YYYY-MM-DD" format
#         closing_deals = list(deals_collection.find({
#             "closeDate": {"$gte": start_of_week.strftime("%Y-%m-%d"), "$lte": end_of_week.strftime("%Y-%m-%d")},
#             "salesStage": {"$nin": ["Closed Won", "Closed Lost"]}
#         }))
#         client.close()

#         if closing_deals:
#             deal_info = "\n".join([f"- '{d.get('dealName')}' (Stage: {d.get('salesStage')}, Amount: ₹{d.get('amount', 0):,.2f})" for d in closing_deals])
#             return f"You have {len(closing_deals)} deals expected to close this week:\n{deal_info}"
#         return "No deals are expected to close this week."
#     except Exception as e:
#         app.logger.error(f"Error fetching deals closing this week from MongoDB: {e}")
#         return "I encountered an error trying to retrieve deals closing this week."

# def get_average_time_to_close_deal():
#     """Placeholder for calculating average deal closure time (requires specific date fields)."""
#     app.logger.info("Executing get_average_time_to_close_deal function (placeholder).")
#     # This requires 'createdAt' and 'closedDate' fields, and deals marked as 'Closed Won'
#     # 'closedDate' would need to be added to your schema if not there, or inferred from last status update.
#     return "Calculating average time to close a deal requires 'createdAt' and 'closedDate' (or inferred closed date) for deals marked as 'Closed Won'. This functionality is not yet fully implemented."

# def get_overdue_deals():
#     """Lists all deals that have passed their close date and are not yet closed."""
#     app.logger.info("Executing get_overdue_deals function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         today_str = datetime.datetime.now().strftime("%Y-%m-%d")

#         # Overdue deals are those with a closeDate in the past and not yet won/lost
#         overdue_deals = list(deals_collection.find({
#             "closeDate": {"$lt": today_str},
#             "salesStage": {"$nin": ["Closed Won", "Closed Lost"]}
#         }))
#         client.close()

#         if overdue_deals:
#             deal_info = "\n".join([f"- '{d.get('dealName')}' (Stage: {d.get('salesStage')}, Due: {d.get('closeDate')})" for d in overdue_deals])
#             return f"You have {len(overdue_deals)} overdue deals:\n{deal_info}"
#         return "You have no overdue deals."
#     except Exception as e:
#         app.logger.error(f"Error fetching overdue deals from MongoDB: {e}")
#         return "I encountered an error trying to retrieve overdue deals."

# def get_top_deal_closer_this_month():
#     """Identifies the top deal closer for the current month based on won deal amounts."""
#     app.logger.info("Executing get_top_deal_closer_this_month function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         today = datetime.datetime.now()
#         start_of_month = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
#         next_month = start_of_month + datetime.timedelta(days=32)
#         end_of_month = next_month.replace(day=1)

#         pipeline = [
#             {"$match": {"createdAt": {"$gte": start_of_month, "$lt": end_of_month}, "salesStage": "Closed Won"}},
#             {"$addFields": {
#                 "parsedAmount": {
#                     "$cond": {
#                         "if": {"$and": [{"$ne": [{"$type": "$amount"}, "double"]}, {"$ne": [{"$type": "$amount"}, "int"]}]},
#                         "then": {"$toDouble": {"$replaceAll": {"input": {"$replaceAll": {"input": "$amount", "find": "₹", "replacement": ""}}, "find": ",", "replacement": ""}}},
#                         "else": "$amount"
#                     }
#                 }
#             }},
#             {"$group": {"_id": "$dealOwner", "total_won_amount": {"$sum": "$parsedAmount"}, "deals_won_count": {"$sum": 1}}},
#             {"$sort": {"total_won_amount": -1}},
#             {"$limit": 1}
#         ]
#         top_closer = list(deals_collection.aggregate(pipeline))

#         client.close()
#         if top_closer:
#             closer = top_closer[0]
#             return (f"The top deal closer this month is {closer['_id']} with {closer['deals_won_count']} "
#                     f"deals won totaling ₹{closer['total_won_amount']:,.2f}.")
#         return "No deals closed and won this month yet."
#     except Exception as e:
#         app.logger.error(f"Error fetching top deal closer from MongoDB: {e}")
#         return "I encountered an error trying to retrieve the top deal closer."

# # --- Contacts & Accounts Functions ---

# def get_contacts_by_city_region(city_region):
#     """Retrieves contacts associated with accounts in a given city or region."""
#     app.logger.info(f"Executing get_contacts_by_city_region for {city_region}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         accounts_collection = db.accounts
#         contacts_collection = db.contacts

#         # Find accounts matching the city/region in billingState or billingCountry
#         matching_accounts = list(accounts_collection.find(
#             {"$or": [{"billingState": city_region}, {"billingCountry": city_region}]}
#         ))
        
#         # Get the names of these accounts to link to contacts
#         matching_company_names = [acc.get('accountName') for acc in matching_accounts if acc.get('accountName')]
        
#         # Find contacts associated with these company names
#         contacts_in_region = list(contacts_collection.find({"company": {"$in": matching_company_names}}))

#         client.close()
#         if contacts_in_region:
#             contact_names = ", ".join([f"{c.get('firstName', '')} {c.get('lastName', '')} ({c.get('company', 'Unknown Company')})" for c in contacts_in_region])
#             return f"Contacts in {city_region}: {contact_names}."
#         return f"No contacts found linked to accounts in {city_region}."
#     except Exception as e:
#         app.logger.error(f"Error fetching contacts by city/region from MongoDB: {e}")
#         return "I encountered an error trying to retrieve contacts by region."

# def get_contacts_unresponsive_in_weeks(weeks=2):
#     """Identifies contacts who haven't had a task-based interaction in a specified number of weeks."""
#     app.logger.info(f"Executing get_contacts_unresponsive_in_weeks for {weeks} weeks.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks
#         contacts_collection = db.contacts

#         # Aggregate tasks to find the latest interaction date for each contact
#         pipeline = [
#             {"$group": {
#                 "_id": "$contact", # Group by contact name
#                 "latest_interaction": {"$max": "$createdAt"} # Find the maximum (latest) creation date for tasks
#             }}
#         ]
#         latest_interactions = list(tasks_collection.aggregate(pipeline))
        
#         unresponsive_contact_names = []
#         threshold_date = datetime.datetime.now() - datetime.timedelta(weeks=weeks)

#         # Check which contacts' latest interaction is older than the threshold
#         for interaction in latest_interactions:
#             # Ensure 'latest_interaction' is a datetime object for comparison
#             if isinstance(interaction["latest_interaction"], datetime.datetime) and interaction["latest_interaction"] < threshold_date:
#                 unresponsive_contact_names.append(interaction["_id"])
        
#         client.close()
#         if unresponsive_contact_names:
#             names = ", ".join(unresponsive_contact_names)
#             return f"Contacts who haven't had a task-based interaction in over {weeks} weeks: {names}."
#         return f"No contacts found who haven't responded in over {weeks} weeks based on task history."
#     except Exception as e:
#         app.logger.error(f"Error fetching unresponsive contacts from MongoDB: {e}")
#         return "I encountered an error trying to retrieve unresponsive contacts."

# def get_job_title_of_contact(first_name, last_name):
#     """Retrieves the job title for a specific contact."""
#     app.logger.info(f"Executing get_job_title_of_contact for {first_name} {last_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         contacts_collection = db.contacts

#         contact_record = contacts_collection.find_one({"firstName": first_name, "lastName": last_name})
#         client.close()

#         if contact_record:
#             title = contact_record.get('title', 'N/A') # Assuming 'title' is the job title field
#             return f"The job title for {first_name} {last_name} is: {title}."
#         return f"Contact '{first_name} {last_name}' not found."
#     except Exception as e:
#         app.logger.error(f"Error fetching job title from MongoDB: {e}")
#         return "I encountered an error trying to retrieve the job title."

# def get_clients_contacted_last_week():
#     """Lists clients who had tasks created in the last week."""
#     app.logger.info("Executing get_clients_contacted_last_week function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks

#         end_date = datetime.datetime.now()
#         start_date = end_date - datetime.timedelta(days=7)

#         # Assuming 'createdAt' of tasks indicates when a contact interaction (task) was logged
#         contacted_tasks = list(tasks_collection.find(
#             {"createdAt": {"$gte": start_date, "$lt": end_date}, "contact": {"$exists": True, "$ne": ""}}
#         ))
        
#         client.close()
        
#         contacted_names = set() # Use a set to avoid duplicate client names
#         for task in contacted_tasks:
#             contacted_names.add(task.get('contact'))

#         if contacted_names:
#             return f"Clients contacted last week (based on tasks): {', '.join(sorted(list(contacted_names)))}."
#         return "No clients were contacted last week (based on tasks)."
#     except Exception as e:
#         app.logger.error(f"Error fetching clients contacted last week from MongoDB: {e}")
#         return "I encountered an error trying to retrieve clients contacted last week."

# # --- Tasks & Follow-ups Functions ---
# def get_tasks_due_today():
#     """Lists all tasks that are due today and are not yet completed."""
#     app.logger.info("Executing get_tasks_due_today function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks

#         today_str = datetime.datetime.now().strftime("%Y-%m-%d")
        
#         tasks_today = list(tasks_collection.find(
#             {"dueDate": today_str, "status": {"$ne": "Completed"}}
#         ))
#         client.close()

#         if tasks_today:
#             task_info = "\n".join([f"- '{t.get('subject')}' for {t.get('contact', 'N/A')} (Priority: {t.get('priority', 'N/A')})" for t in tasks_today])
#             return f"You have {len(tasks_today)} tasks due today:\n{task_info}"
#         return "You have no tasks due today."
#     except Exception as e:
#         app.logger.error(f"Error fetching tasks due today from MongoDB: {e}")
#         return "I encountered an error trying to retrieve tasks due today."

# def get_completed_tasks_this_week():
#     """Lists tasks marked as 'Completed' within the current week."""
#     app.logger.info("Executing get_completed_tasks_this_week function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks

#         today = datetime.datetime.now()
#         start_of_week = today - datetime.timedelta(days=today.weekday()) # Monday of current week
#         end_of_week = start_of_week + datetime.timedelta(days=7) # End of Sunday of current week

#         # Query for tasks completed within the current week
#         # Assuming 'createdAt' is when the task was created/logged.
#         # For actual completion, you'd ideally need a 'completedAt' timestamp.
#         completed_tasks = list(tasks_collection.find(
#             {"status": "Completed", "createdAt": {"$gte": start_of_week, "$lt": end_of_week}}
#         ))
#         client.close()

#         if completed_tasks:
#             task_info = "\n".join([f"- '{t.get('subject')}' for {t.get('contact', 'N/A')}" for t in completed_tasks])
#             return f"You have completed {len(completed_tasks)} tasks this week:\n{task_info}"
#         return "No tasks completed this week."
#     except Exception as e:
#         app.logger.error(f"Error fetching completed tasks this week from MongoDB: {e}")
#         return "I encountered an error trying to retrieve completed tasks this week."

# def get_tasks_assigned_to_user(user_name):
#     """Lists tasks assigned to a specific user."""
#     app.logger.info(f"Executing get_tasks_assigned_to_user for {user_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks

#         assigned_tasks = list(tasks_collection.find({"taskOwner": user_name})) # Assuming 'taskOwner' field exists
#         client.close()

#         if assigned_tasks:
#             task_info = "\n".join([f"- '{t.get('subject')}' (Due: {t.get('dueDate')}, Status: {t.get('status')})" for t in assigned_tasks])
#             return f"{user_name} has {len(assigned_tasks)} tasks assigned:\n{task_info}"
#         return f"No tasks found assigned to {user_name}."
#     except Exception as e:
#         app.logger.error(f"Error fetching tasks assigned to user from MongoDB: {e}")
#         return "I encountered an error trying to retrieve tasks assigned to the user."

# def get_tasks_linked_to_deal(deal_name):
#     """Lists tasks that are linked to a specific deal."""
#     app.logger.info(f"Executing get_tasks_linked_to_deal for {deal_name}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks
        
#         # Assuming tasks are linked to deals via an 'account' or 'dealName' field in the task document
#         linked_tasks = list(tasks_collection.find({"account": deal_name})) 
#         client.close()

#         if linked_tasks:
#             task_info = "\n".join([f"- '{t.get('subject')}' (Due: {t.get('dueDate')}, Status: {t.get('status')})" for t in linked_tasks])
#             return f"Tasks linked to deal '{deal_name}':\n{task_info}"
#         return f"No tasks found linked to deal '{deal_name}'."
#     except Exception as e:
#         app.logger.error(f"Error fetching tasks linked to deal from MongoDB: {e}")
#         return "I encountered an error trying to retrieve tasks linked to the deal."

# def get_meetings_scheduled_this_week():
#     """Lists meetings scheduled for the current week."""
#     app.logger.info("Executing get_meetings_scheduled_this_week function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks

#         today = datetime.datetime.now()
#         start_of_week = today - datetime.timedelta(days=today.weekday())
#         end_of_week = start_of_week + datetime.timedelta(days=7)

#         # Assuming tasks with 'Meeting' in the subject or a dedicated 'type' field are meetings
#         meetings = list(tasks_collection.find({
#             "subject": {"$regex": "Meeting", "$options": "i"}, # Case-insensitive search for "Meeting"
#             "dueDate": {"$gte": start_of_week.strftime("%Y-%m-%d"), "$lte": end_of_week.strftime("%Y-%m-%d")}
#         }))
#         client.close()

#         if meetings:
#             meeting_info = "\n".join([f"- '{m.get('subject')}' with {m.get('contact', 'N/A')} (Due: {m.get('dueDate')})" for m in meetings])
#             return f"You have {len(meetings)} meetings scheduled this week:\n{meeting_info}"
#         return "No meetings scheduled this week."
#     except Exception as e:
#         app.logger.error(f"Error fetching meetings scheduled this week from MongoDB: {e}")
#         return "I encountered an error trying to retrieve scheduled meetings."

# def get_calls_made_this_month():
#     """Counts and lists calls made this month (assuming 'Call' in subject and 'Completed' status)."""
#     app.logger.info("Executing get_calls_made_this_month function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks

#         today = datetime.datetime.now()
#         start_of_month = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
#         next_month = start_of_month + datetime.timedelta(days=32)
#         end_of_month = next_month.replace(day=1)

#         # Assuming tasks with 'Call' in subject and 'Completed' status are recorded calls
#         calls_made = list(tasks_collection.find({
#             "subject": {"$regex": "Call", "$options": "i"},
#             "status": "Completed", # Assuming completed calls are marked as such
#             "createdAt": {"$gte": start_of_month, "$lt": end_of_month}
#         }))
#         client.close()

#         if calls_made:
#             call_info = "\n".join([f"- '{c.get('subject')}' with {c.get('contact', 'N/A')} (Completed: {c.get('createdAt').strftime('%Y-%m-%d')})" for c in calls_made])
#             return f"You have recorded {len(calls_made)} calls made this month:\n{call_info}"
#         return "No calls recorded as completed this month."
#     except Exception as e:
#         app.logger.error(f"Error fetching calls made this month from MongoDB: {e}")
#         return "I encountered an error trying to retrieve calls made this month."

# def get_total_acquired_deals_revenue_by_timeframe(timeframe_unit='all_time'):
#     """
#     Calculates the total revenue from deals marked as 'Closed Won' for a given timeframe.
#     timeframe_unit can be 'this_week', 'this_month', 'this_quarter', 'this_year', or 'all_time'.
#     """
#     app.logger.info(f"Executing get_total_acquired_deals_revenue_by_timeframe function for {timeframe_unit}.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         deals_collection = db.deals

#         # Base query to find 'Closed Won' deals with an existing amount
#         query_filter = {"salesStage": {"$regex": "Closed Won", "$options": "i"}, "amount": {"$exists": True, "$ne": None}}

#         today = datetime.datetime.now()
#         start_date = None
#         end_date = None

#         # Add date filtering based on timeframe_unit
#         if timeframe_unit == 'this_week':
#             start_date = today - datetime.timedelta(days=today.weekday()) # Monday
#             end_date = start_date + datetime.timedelta(days=7) # End of Sunday
#         elif timeframe_unit == 'this_month':
#             start_date = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
#             end_date = (start_date + datetime.timedelta(days=32)).replace(day=1) # Start of next month
#         elif timeframe_unit == 'this_quarter':
#             current_quarter = (today.month - 1) // 3 + 1
#             q_start_month = (current_quarter - 1) * 3 + 1
#             start_date = datetime.datetime(today.year, q_start_month, 1)
#             q_end_month = q_start_month + 3
#             q_end_year = today.year
#             if q_end_month > 12:
#                 q_end_month -= 12
#                 q_end_year += 1
#             end_date = datetime.datetime(q_end_year, q_end_month, 1) # Start of next quarter
#         elif timeframe_unit == 'this_year':
#             start_date = datetime.datetime(today.year, 1, 1)
#             end_date = datetime.datetime(today.year + 1, 1, 1)
#         # If 'all_time' or no timeframe, no date filter is added to the query_filter.

#         if start_date and end_date:
#             query_filter["createdAt"] = {"$gte": start_date, "$lt": end_date}
        
#         acquired_deals = list(deals_collection.find(query_filter))
        
#         total_revenue = 0
#         for deal in acquired_deals:
#             amount_value = deal.get('amount')
#             if isinstance(amount_value, str):
#                 # Clean the string: remove currency symbols (₹, $) and commas
#                 cleaned_amount_str = amount_value.replace('₹', '').replace('$', '').replace(',', '').strip()
#                 try:
#                     total_revenue += float(cleaned_amount_str)
#                 except ValueError:
#                     app.logger.warning(f"Could not convert amount '{amount_value}' to float for deal: {deal.get('dealName', 'Unnamed')}")
#             elif isinstance(amount_value, (int, float)):
#                 total_revenue += amount_value
#             # If amount_value is None or another unexpected type, it's ignored due to initial 0 value.

#         num_deals = len(acquired_deals)

#         client.close()
        
#         timeframe_text = timeframe_unit.replace('_', ' ') # Format for display
#         return f"Based on live data, the total revenue from '{timeframe_text}' acquired deals ('Closed Won') is ₹{total_revenue:,.2f} from {num_deals} deals."
#     except Exception as e:
#         app.logger.error(f"Error fetching acquired deals revenue for {timeframe_unit} from MongoDB: {e}")
#         return f"I encountered an error trying to retrieve revenue from acquired deals for {timeframe_unit}. Please check the backend logs for details."

# def get_total_acquired_deals_revenue():
#     """Defaults to all_time revenue for acquired deals."""
#     return get_total_acquired_deals_revenue_by_timeframe('all_time')

# def get_high_priority_tasks_count():
#     """
#     Retrieves the count of high-priority tasks that are not yet completed.
#     Assumes 'priority' field in tasks can be 'High'.
#     """
#     app.logger.info("Executing get_high_priority_tasks_count function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         tasks_collection = db.tasks

#         high_priority_tasks = list(tasks_collection.find({
#             "priority": {"$regex": "High", "$options": "i"}, # Case-insensitive "High"
#             "status": {"$ne": "Completed"} # Tasks that are not yet completed
#         }))
        
#         count = len(high_priority_tasks)
#         client.close()
        
#         if count > 0:
#             task_details = "\n".join([f"- '{t.get('subject')}' for {t.get('contact', 'N/A')} (Due: {t.get('dueDate')})" for t in high_priority_tasks])
#             return f"You have {count} high-priority tasks that are not yet completed:\n{task_details}"
#         return "You have no high-priority tasks that are not yet completed."
#     except Exception as e:
#         app.logger.error(f"Error fetching high priority tasks count from MongoDB: {e}")
#         return "I encountered an error trying to retrieve the high priority tasks count. Please check the backend logs for details."

# def get_total_sellers_count():
#     """
#     Retrieves the total count of sellers in the sellers collection.
#     """
#     app.logger.info("Executing get_total_sellers_count function.")
#     try:
#         client = get_mongo_client()
#         db = client.team1
#         sellers_collection = db.sellers

#         count = sellers_collection.count_documents({}) # Count all documents in the sellers collection
#         client.close()
        
#         return f"You have a total of {count} sellers in your system."
#     except Exception as e:
#         app.logger.error(f"Error fetching total sellers count from MongoDB: {e}")
#         return "I encountered an error trying to retrieve the total sellers count. Please check the backend logs for details."


# # --- API Route for Chatbot Interaction ---
# @app.route('/chat', methods=['POST'])
# def chat():
#     app.logger.info("Received /chat request.")
#     user_message = request.json.get('message')
#     chat_history_from_frontend = request.json.get('history', [])

#     if not user_message:
#         app.logger.error("No message provided in request.")
#         return jsonify({"error": "No message provided"}), 400

#     # Initialize dynamic_data_context, which will hold the data retrieved from MongoDB
#     dynamic_data_context = ""
#     lower_user_message = user_message.lower()

#     # --- Intent Recognition and Dynamic Data Injection ---
#     # This section tries to identify the user's intent and call the appropriate backend function
#     # to retrieve relevant data from MongoDB. This data is then injected into the LLM's context.

#     # Pre-process for "yes" or short answers based on the last bot question
#     if len(chat_history_from_frontend) >= 2:
#         last_bot_message_parts = chat_history_from_frontend[-2]['parts']
#         last_bot_message_text = last_bot_message_parts[0]['text'].lower() if last_bot_message_parts else ""

#         if lower_user_message == "yes":
#             # Specific handling for "yes" after revenue clarification
#             if "potential revenue from deals within the crm?" in last_bot_message_text or \
#                "would you like to know the total revenue from all \"closed won\" deals, or would you like to specify a time frame?" in last_bot_message_text or \
#                "i can provide the total revenue from all 'closed won' deals. would you like me to proceed?" in last_bot_message_text:
#                 dynamic_data_context = get_total_acquired_deals_revenue_by_timeframe('all_time')
#                 user_message = "" # Consume the user message as it's a direct follow-up
#                 lower_user_message = ""
#             elif "specify the time frame you're interested in" in last_bot_message_text:
#                  # This is a placeholder; you might need to infer the timeframe from previous conversation
#                  dynamic_data_context = get_total_sales_last_week() 
#                  user_message = ""
#                  lower_user_message = ""


#     # Standard Intent Recognition for Dynamic Data Injection (only if not already handled by "yes")
#     # This block is executed only if the user_message was not a simple "yes" follow-up
#     if user_message: 
#         # Sales & Performance Queries
#         if "total sales last week" in lower_user_message or "sales last week" in lower_user_message:
#             dynamic_data_context = get_total_sales_last_week()
#         elif "revenue this month" in lower_user_message:
#             dynamic_data_context = get_monthly_revenue(month_offset=0)
#         elif "compare this month sales with last month" in lower_user_message or "compare this month's sales with last month's" in lower_user_message:
#             dynamic_data_context = compare_monthly_sales()
#         elif "revenue trend for the last 6 months" in lower_user_message:
#             dynamic_data_context = get_revenue_trend_last_n_months(n=6)
#         elif "average deal size this quarter" in lower_user_message:
#             dynamic_data_context = get_average_deal_size_this_quarter()
#         elif "daily sales for the past week" in lower_user_message:
#             dynamic_data_context = get_daily_sales_last_week()
#         elif "top revenue sources this year" in lower_user_message:
#             dynamic_data_context = get_top_revenue_sources_this_year()
#         elif "biggest deal in q2" in lower_user_message:
#             dynamic_data_context = get_biggest_deal_in_quarter(quarter=2)
#         elif "potential revenue this week" in lower_user_message or "deals acquired this week" in lower_user_message or ("amount of deals acquired" in lower_user_message and "this week" in lower_user_message):
#             dynamic_data_context = get_total_acquired_deals_revenue_by_timeframe('this_week')
#         elif "potential revenue this month" in lower_user_message or "deals acquired this month" in lower_user_message or ("amount of deals acquired" in lower_user_message and "this month" in lower_user_message):
#             dynamic_data_context = get_total_acquired_deals_revenue_by_timeframe('this_month')
#         elif "potential revenue this quarter" in lower_user_message or "deals acquired this quarter" in lower_user_message or ("amount of deals acquired" in lower_user_message and "this quarter" in lower_user_message):
#             dynamic_data_context = get_total_acquired_deals_revenue_by_timeframe('this_quarter')
#         elif "potential revenue this year" in lower_user_message or "deals acquired this year" in lower_user_message or ("amount of deals acquired" in lower_user_message and "this year" in lower_user_message):
#             dynamic_data_context = get_total_acquired_deals_revenue_by_timeframe('this_year')
#         elif "amount of closed win" in lower_user_message or "potential revenue" in lower_user_message or "deals won revenue" in lower_user_message or "revenue from acquired deals" in lower_user_message or "amount of deals acquired" in lower_user_message:
#             dynamic_data_context = get_total_acquired_deals_revenue_by_timeframe('all_time')
            
#         # Seller Prediction & Scoring
#         elif "how much seller" in lower_user_message or "total sellers" in lower_user_message or "number of sellers" in lower_user_message or "count of sellers" in lower_user_message:
#             dynamic_data_context = get_total_sellers_count()
#         elif "sellers most likely to convert this week" in lower_user_message or "sellers have the highest chance of converting" in lower_user_message:
#             dynamic_data_context = get_sellers_likely_to_convert_this_week()
#         elif "sellers with a score above" in lower_user_message:
#             try:
#                 # Extract score from message (e.g., "above 80?")
#                 score_str = lower_user_message.split("sellers with a score above ")[1].split("?")[0].strip()
#                 min_score = int(score_str.split()[0])
#                 dynamic_data_context = get_sellers_by_score_above(min_score)
#             except (ValueError, IndexError):
#                 dynamic_data_context = "Please specify a valid score, e.g., 'Show me sellers with a score above 80'."
#         elif "conversion probability for" in lower_user_message:
#             try:
#                 name_parts = lower_user_message.split("conversion probability for ")[1].split("?")[0].strip().split()
#                 first_name = name_parts[0].title() if name_parts else ""
#                 last_name = name_parts[1].title() if len(name_parts) > 1 else ""
#                 dynamic_data_context = get_conversion_probability_for_seller(first_name, last_name)
#             except IndexError:
#                 dynamic_data_context = "Please specify a seller's full name, e.g., 'What’s the conversion probability for John Doe?'"
#         elif "coldest sellers" in lower_user_message:
#             dynamic_data_context = get_coldest_sellers()
#         elif "sellers need immediate attention" in lower_user_message or "high-priority sellers today" in lower_user_message or "top 5 high-priority sellers today" in lower_user_message or "urgent sellers" in lower_user_message:
#             dynamic_data_context = get_sellers_needing_immediate_attention()
        
#         # Smart Alerts & Suggestions - Mostly placeholders for complex logic that might need ML or more data
#         elif "on track to hit my weekly goal" in lower_user_message or "hit my monthly target" in lower_user_message or "reach my quarterly goal" in lower_user_message or "falling behind on any targets" in lower_user_message:
#             dynamic_data_context = check_weekly_goal_track()
#         elif "task should i prioritize today" in lower_user_message:
#             dynamic_data_context = "Prioritizing tasks requires a system for task importance and due dates. I can show you tasks due today or overdue tasks."
#         elif "suggest sellers i should follow up with" in lower_user_message:
#             dynamic_data_context = suggest_sellers_for_follow_up()
#         elif "alert me if any deal is stalling" in lower_user_message:
#             dynamic_data_context = alert_deal_stalling()
#         elif "highlight any overdue tasks" in lower_user_message:
#             dynamic_data_context = highlight_overdue_tasks()
#         elif "deals are nearing close dates" in lower_user_message:
#             dynamic_data_context = get_deals_nearing_close_dates()

#         # CRM Data Lookup
#         elif "status of" in lower_user_message and "client" in lower_user_message:
#             try:
#                 client_name = lower_user_message.split("status of ")[1].split("?")[0].strip().title()
#                 dynamic_data_context = get_client_status_from_db(client_name)
#             except IndexError:
#                 dynamic_data_context = "Please specify a client name, e.g., 'What's the status of Havells India?'"
#         elif "last speak with" in lower_user_message or "last contact with" in lower_user_message:
#             try:
#                 contact_name = lower_user_message.split("last speak with ")[1].split("?")[0].strip().title() if "last speak with" in lower_user_message else \
#                                lower_user_message.split("last contact with ")[1].split("?")[0].strip().title()
#                 dynamic_data_context = get_last_contact_date_from_db(contact_name)
#             except IndexError:
#                 dynamic_data_context = "Please specify a contact's full name, e.g., 'When did I last speak with Parth Sarthi?'"
#         elif "who's assigned to the" in lower_user_message and "deal" in lower_user_message:
#             try:
#                 deal_name = lower_user_message.split("who's assigned to the ")[1].split(" deal")[0].strip().title()
#                 dynamic_data_context = get_owner_of_deal(deal_name)
#             except IndexError:
#                 dynamic_data_context = "Please specify a deal name, e.g., 'Who's assigned to the HCL AppScan deal?'"
#         elif "deal value for" in lower_user_message:
#             try:
#                 deal_name = lower_user_message.split("deal value for ")[1].split("?")[0].strip().title()
#                 dynamic_data_context = get_deal_value(deal_name)
#             except IndexError:
#                 dynamic_data_context = "Please specify a deal name, e.g., 'What's the deal value for HCL AppScan?'"
#         elif "expected to close" in lower_user_message and "deal" in lower_user_message:
#             try:
#                 deal_name = lower_user_message.split("when is ")[1].split(" expected to close")[0].strip().title()
#                 dynamic_data_context = get_expected_close_date_of_deal(deal_name)
#             except IndexError:
#                 dynamic_data_context = "Please specify a deal name, e.g., 'When is HCL AppScan expected to close?'"
#         elif "show all notes for" in lower_user_message and "seller" in lower_user_message:
#             try:
#                 name_parts = lower_user_message.split("show all notes for ")[1].split(" seller")[0].strip().split()
#                 first_name = name_parts[0].title() if name_parts else ""
#                 last_name = name_parts[1].title() if len(name_parts) > 1 else ""
#                 dynamic_data_context = get_notes_for_seller(first_name, last_name)
#             except IndexError:
#                 dynamic_data_context = "Please specify a seller's full name, e.g., 'Show all notes for Amit Seth seller.'"
#         elif "communication history with" in lower_user_message and "client" in lower_user_message:
#             try:
#                 client_name = lower_user_message.split("communication history with ")[1].split("client")[0].strip().title()
#                 dynamic_data_context = get_communication_history_with_client(client_name)
#             except IndexError:
#                 dynamic_data_context = "Please specify a client name, e.g., 'Show communication history with Havells India.'"

#         # Deals & Pipelines
#         elif "show all open deals" in lower_user_message:
#             dynamic_data_context = get_all_open_deals()
#         elif "deals are in the negotiation stage" in lower_user_message:
#             dynamic_data_context = get_deals_in_negotiation_stage()
#         elif "how many deals closed this month" in lower_user_message:
#             dynamic_data_context = get_deals_closed_this_month()
#         elif "deals are expected to close this week" in lower_user_message:
#             dynamic_data_context = get_deals_closing_this_week()
#         elif "average time to close a deal" in lower_user_message:
#             dynamic_data_context = get_average_time_to_close_deal()
#         elif "how many deals are overdue" in lower_user_message:
#             dynamic_data_context = get_overdue_deals()
#         elif "who’s the top deal closer this month" in lower_user_message:
#             dynamic_data_context = get_top_deal_closer_this_month()
        
#         # Tasks & Follow-ups
#         elif "what tasks are due today" in lower_user_message:
#             dynamic_data_context = get_tasks_due_today()
#         elif "show all completed tasks this week" in lower_user_message:
#             dynamic_data_context = get_completed_tasks_this_week()
#         elif "what tasks are assigned to" in lower_user_message:
#             try:
#                 user_name = lower_user_message.split("what tasks are assigned to ")[1].split("?")[0].strip().title()
#                 dynamic_data_context = get_tasks_assigned_to_user(user_name)
#             except IndexError:
#                 dynamic_data_context = "Please specify a user name, e.g., 'What tasks are assigned to Amit Seth?'"
#         elif "what tasks are linked to" in lower_user_message and "deal" in lower_user_message:
#             try:
#                 deal_name = lower_user_message.split("what tasks are linked to ")[1].split(" deal")[0].strip().title()
#                 dynamic_data_context = get_tasks_linked_to_deal(deal_name)
#             except IndexError:
#                 dynamic_data_context = "Please specify a deal name, e.g., 'What tasks are linked to HCL AppScan deal?'"
#         elif "how many meetings are scheduled this week" in lower_user_message:
#             dynamic_data_context = get_meetings_scheduled_this_week()
#         elif "show calls made this month" in lower_user_message:
#             dynamic_data_context = get_calls_made_this_month()
#         elif "number of high priority tasks" in lower_user_message:
#             dynamic_data_context = get_high_priority_tasks_count()
#         # If no specific dynamic data query matches, dynamic_data_context remains empty
#         else:
#             dynamic_data_context = "" 


#     # Construct the base system instruction for the Large Language Model (LLM)
#     base_system_instruction = f"""
#     You are an AI assistant for Team1 Consulting's CRM portal.
#     Your purpose is to answer questions about Team1 Consulting's services and the features of the CRM portal.
#     You can also provide real-time insights by querying the company's internal MongoDB database for sales, sellers, accounts, contacts, and task information.
#     Be helpful, informative, and concise.

#     IMPORTANT: ALWAYS present all monetary values in Indian Rupees (₹) format. For example, use '₹12,34,567.89' instead of '$1,234,567.89' or '1,234,567.89 USD'. This is a strict requirement for all currency outputs.

#     Here is general information about Team1 Consulting:
#     {business_knowledge}

#     Here is general information about the CRM Portal and its features:
#     {crm_knowledge}

#     Here is specific real-time data retrieved based on the user's current query from the MongoDB database:
#     {dynamic_data_context}

#     IMPORTANT CONTEXT GUIDELINES FOR RESPONDING:
#     - If a user asks for "amount of seller generated" or "how much seller", always interpret this as a request for the *total count of sellers*.
#     - If the user asks for "potential revenue from deals" or "amount of deals acquired" (including "amount of closed win"), and no specific timeframe is given, default to providing the *total revenue from all 'Closed Won' deals (all time)*.
#     - If the user provides a timeframe after asking about "potential revenue" or "deals acquired" (e.g., "this week"), provide the revenue for 'Closed Won' deals within that specific timeframe.
#     - If a question cannot be answered by the provided general knowledge or the specific real-time data (e.g., if the data is missing for a requested item, or the query is too complex for current tools, or requires a predictive model),
#       politely state that you can only answer questions based on the available information and tools. Do NOT ask clarifying questions if the answer can be inferred from the current conversation history and available tools.
#     - Do not make up information or financial figures.
#     """

#     # Construct the final chat history for the LLM, including the system instruction and conversation turns
#     llm_chat_history = [
#         {"role": "user", "parts": [{"text": base_system_instruction}]}, # System instruction is the first user message
#         {"role": "model", "parts": [{"text": "Hello! How can I assist you with Team1 Consulting or our CRM portal today?"}]} # Initial bot greeting
#     ]

#     # Append actual conversation history from frontend, ensuring no duplicate initial greeting
#     for msg in chat_history_from_frontend:
#         if msg['role'] == 'user' or (msg['role'] == 'model' and msg['parts'][0]['text'] != "Hello! How can I assist you with Team1 Consulting or our CRM portal today?"):
#             llm_chat_history.append(msg)
    
#     # Ensure the current user message is always the very last message in the history for the LLM
#     # This prevents the current message from being duplicated if it's already in history due to frontend state management
#     if not llm_chat_history or llm_chat_history[-1]['parts'][0]['text'] != user_message:
#         llm_chat_history.append({"role": "user", "parts": [{"text": user_message}]})


#     payload = {
#         "contents": llm_chat_history, # Send the full conversation history for context
#         "generationConfig": {
#             "temperature": 0.7, # Controls randomness. Lower values are more deterministic.
#             "topP": 0.9,      # Nucleus sampling. Limits tokens to those with cumulative probability up to topP.
#             "topK": 40        # Top-K sampling. Limits tokens to the top K most likely options.
#         }
#     }

#     # Gemini API endpoint for text generation
#     api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
#     app.logger.info(f"Attempting to call Gemini API at: {api_url}")

#     try:
#         # Make the POST request to the Gemini API
#         response = requests.post(api_url, headers={'Content-Type': 'application/json'}, json=payload)
#         response.raise_for_status() # Raise an HTTPError for bad responses (4xx or 5xx)
#         result = response.json()
#         app.logger.info(f"Gemini API response received: {result}")

#         # Extract the assistant's response from the Gemini API result
#         if result.get("candidates") and result["candidates"][0].get("content") and result["candidates"][0]["content"].get("parts"):
#             assistant_response = result["candidates"][0]["content"].get("parts")[0].get("text", "")
#             app.logger.info(f"AI response: {assistant_response[:100]}...") # Log first 100 chars of response
#             return jsonify({"response": assistant_response})
#         else:
#             app.logger.error(f"Unexpected Gemini API response structure or empty content: {result}")
#             return jsonify({"error": "Failed to get a valid response from the AI. Unexpected structure."}), 500

#     except requests.exceptions.RequestException as e:
#         app.logger.error(f"Error calling Gemini API: {e}")
#         return jsonify({"error": f"Failed to connect to AI service: {e}"}), 500
#     except Exception as e:
#         app.logger.error(f"An unexpected error occurred in Flask app: {e}")
#         return jsonify({"error": f"An internal server error occurred: {e}"}), 500

# if __name__ == '__main__':
#     # Run the Flask app
#     # host='0.0.0.0' makes the server accessible externally (e.g., from your frontend)
#     # port=5000 is the port for the Flask backend
#     # debug=True enables debug mode (reloads on code changes, provides debugger)
#     app.run(host='0.0.0.0', port=5000, debug=True)

# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import datetime
from pymongo import MongoClient
from dotenv import load_dotenv
from collections import defaultdict

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
# Enable CORS for all routes, allowing frontend to communicate
CORS(app)

# Retrieve Gemini API Key from environment variables
# IMPORTANT: Replace "YOUR_GEMINI_API_KEY_HERE" with your actual key if not using .env
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "AIzaSyCN68_lXJVM06bEyZ8aIe9pmEOE3ByoNNk")

# --- Define Global Knowledge Bases for the Chatbot Context ---
# This information provides the foundational knowledge about Team1 Consulting's services
# and the CRM portal features, regardless of specific user queries.
business_knowledge = """
Team1 Consulting offers a wide range of services to help businesses thrive through digital transformation.
Our core services include:
- Cloud Services: We assist with cloud migration (e.g., from on-prem to AWS, Azure, Google Cloud), optimization of cloud resources, cost management, and robust cloud security. We handle IaaS, PaaS, and SaaS implementations. Our approach is phased: assessment, planning, migration, and ongoing management.
- Cyber Security: We provide comprehensive solutions including vulnerability assessments, penetration testing, security audits, managed security services (SOC-as-a-Service), incident response planning, and data protection strategies. We focus on protecting sensitive data, intellectual property, and ensuring business continuity against evolving threats. Our solutions comply with industry standards like ISO 27001 and GDPR.
- Consulting: We offer strategic IT consulting, digital transformation roadmapping, process optimization (e.g., Lean Six Sigma principles applied to IT workflows), IT governance, and technology advisory services. We help clients align IT strategy with business goals to drive efficiency and innovation.
- IT Infrastructure: Our services cover network design and implementation, server management (physical and virtual), data center solutions, virtualization, and infrastructure monitoring. We ensure your foundational IT systems are robust, scalable, and highly available.
- Data Analytics and AI: We help businesses leverage their data for actionable insights. This includes data warehousing, ETL processes, business intelligence (BI) dashboarding (using tools like Tableau, Power BI), predictive analytics, and custom AI/ML model development for tasks like customer segmentation, demand forecasting, and automation. We focus on turning raw data into strategic assets.
- Managed Services: We provide ongoing monitoring, maintenance, and support for your IT infrastructure and applications. This includes 24/7 helpdesk support, proactive problem resolution, patch management, backup and disaster recovery, and IT asset management, ensuring smooth operations and minimal downtime.

Why choose Team1 Consulting? We emphasize a client-centric approach, deep industry expertise, proven methodologies, and a strong track record of delivering measurable ROI. We focus on tailored solutions, not one-size-all.

How we deliver solutions: Our typical project lifecycle involves discovery and assessment, solution design, agile development/implementation, rigorous testing, deployment, and post-implementation support. We use project management methodologies like Agile and Scrum.

How much does it cost? Our pricing varies based on the scope, complexity, and duration of the project. We typically offer project-based fixed fees, time-and-materials, or managed service subscriptions. We conduct a detailed needs assessment to provide a tailored proposal.
"""

crm_knowledge = """
Our CRM portal helps manage customer relationships efficiently and comprehensively. Key features include:
- Accounts: Represents companies or organizations you do business with. An account typically holds information about the company's profile (industry, size), financial details, associated contacts, and all related deals/opportunities and activities. You can view account history, notes, and attachments.
- Sellers: Potential customers or prospects. Sellers are the initial entry point. Information captured includes source (e.g., website, referral), seller score, and initial contact details. How to convert a Seller: Once a seller is qualified (e.g., meets BANT criteria - Budget, Authority, Need, Timeline), it can be converted into a new Contact, Account, and potentially a new Deal, streamlining the sales process.
- Deals (Opportunities): Represents potential revenue-generating opportunities linked to Accounts or Contacts. Deals track the entire sales pipeline from qualification to closure. You can set deal stages (e.g., Prospecting, Qualification, Proposal, Negotiation, Closed Won/Lost), track estimated revenue, close dates, and competitor information. How to track deal progress: By updating stages, adding activities, and logging communications.
- Contacts: Individual people associated with Accounts or Sellers. Contacts store personal information (title, department), preferred communication methods, and a detailed history of interactions (calls, emails, meetings). Why are contacts important? They enable personalized communication and building long-term relationships.
- Tasks: Specific activities or to-dos related to any CRM record (sellers, accounts, deals, contacts). Tasks help users manage their workload, ensure follow-ups, and meet deadlines. You can assign tasks, set due dates, and mark completion. How to use tasks effectively: Assign clear descriptions, link to relevant CRM records, and utilize reminders.
- Meetings & Calls: Log and and schedule all customer interactions directly within the CRM. This provides a complete communication history tied to each record.
- Reports & Dashboards: Generate insightful reports on all CRM data. Examples include: seller conversion rates (how many sellers convert to deals?), sales pipeline health, team performance, overdue tasks, and customer churn analysis. Dashboards provide a visual summary of key metrics. How to create custom reports: Navigate to the 'Reports' module, select desired data fields, apply filters, and choose visualization types.
- Projects: Manage complex client engagements, breaking them down into manageable phases and tasks.
- Customization: The CRM is highly customizable, allowing administrators to add custom fields, create automated workflows, and design tailored layouts to fit specific business needs.

How to measure CRM effectiveness: Key metrics include Seller-to-Opportunity conversion rate, Sales Cycle Length, Customer Acquisition Cost (CAC), Customer Lifetime Value (CLTV), and Customer Retention Rate. You can generate reports within the CRM to track these.
"""

# --- MongoDB Connection Setup ---
# Function to get a MongoDB client instance. This ensures that a new connection is
# established for each request, or an existing one is reused from the pool.
def get_mongo_client():
    # Retrieve MongoDB URL from environment variables, default to localhost if not set
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/team1')
    client = MongoClient(mongo_url)
    app.logger.info(f"Attempting to connect to MongoDB at: {mongo_url}")
    return client

# --- Helper Function for Date Parsing ---
# Attempts to parse a date string into a datetime object using common formats.
def parse_date_from_str(date_str):
    if not date_str:
        return None
    # List of date formats to try
    for fmt in ("%Y-%m-%d", "%Y/%m/%d", "%m-%d-%Y", "%m/%d/%Y", "%Y-%m-%dT%H:%M:%S.%f%z"):
        try:
            return datetime.datetime.strptime(date_str, fmt)
        except ValueError:
            continue
    return None # Return None if no format matches

# --- Dynamic Data Retrieval Functions from MongoDB ---
# These functions query the MongoDB database to retrieve real-time CRM data.
# Each function is designed to answer a specific type of query from the chatbot.

def get_total_sales_last_week():
    """Calculates total sales from deals created in the last 7 days."""
    app.logger.info("Executing get_total_sales_last_week function.")
    try:
        client = get_mongo_client()
        db = client.team1 # Access the 'team1' database
        deals_collection = db.deals # Access the 'deals' collection

        end_date = datetime.datetime.now()
        start_date = end_date - datetime.timedelta(days=7)

        # Query for deals created within the last 7 days with an 'amount' field
        sales_records = list(deals_collection.find(
            {"createdAt": {"$gte": start_date, "$lt": end_date}, "amount": {"$exists": True, "$ne": None}}
        ))
        
        total_sales = 0
        for record in sales_records:
            amount_value = record.get('amount')
            if isinstance(amount_value, str):
                # Clean string: remove currency symbols and commas before conversion
                cleaned_amount_str = amount_value.replace('₹', '').replace('$', '').replace(',', '').strip()
                try:
                    total_sales += float(cleaned_amount_str)
                except ValueError:
                    app.logger.warning(f"Could not convert amount '{amount_value}' to float for deal: {record.get('dealName', 'Unnamed')}")
            elif isinstance(amount_value, (int, float)):
                total_sales += amount_value

        client.close()
        return f"Total sales for the last 7 days: ₹{total_sales:,.2f}."
    except Exception as e:
        app.logger.error(f"Error fetching total sales last week from MongoDB: {e}")
        return "I encountered an error trying to retrieve total sales for last week."

def get_monthly_revenue(month_offset=0):
    """
    Calculates total revenue for a specific month.
    month_offset: 0 for current month, 1 for last month, etc.
    """
    app.logger.info(f"Executing get_monthly_revenue function for offset {month_offset}.")
    try:
        client = get_mongo_client()
        db = client.team1
        deals_collection = db.deals

        today = datetime.datetime.now()
        # Calculate the start of the target month
        target_month_start = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        for _ in range(month_offset):
            # Move to the beginning of the previous month
            target_month_start = (target_month_start - datetime.timedelta(days=1)).replace(day=1)
        
        # Calculate the start of the next month (to define the end of the target month)
        target_month_end = (target_month_start + datetime.timedelta(days=32)).replace(day=1)

        sales_records = list(deals_collection.find(
            {"createdAt": {"$gte": target_month_start, "$lt": target_month_end}, "amount": {"$exists": True, "$ne": None}}
        ))
        
        total_revenue = 0
        for record in sales_records:
            amount_value = record.get('amount')
            if isinstance(amount_value, str):
                cleaned_amount_str = amount_value.replace('₹', '').replace('$', '').replace(',', '').strip()
                try:
                    total_revenue += float(cleaned_amount_str)
                except ValueError:
                    app.logger.warning(f"Could not convert amount '{amount_value}' to float for deal: {record.get('dealName', 'Unnamed')}")
            elif isinstance(amount_value, (int, float)):
                total_revenue += amount_value

        client.close()
        month_name = (target_month_start).strftime('%B %Y')
        return f"Total revenue for {month_name}: ₹{total_revenue:,.2f}."
    except Exception as e:
        app.logger.error(f"Error fetching monthly revenue from MongoDB: {e}")
        return "I encountered an error trying to retrieve monthly revenue."

def compare_monthly_sales():
    """Compares current month's sales with last month's sales."""
    app.logger.info("Executing compare_monthly_sales function.")
    current_month_revenue_str = get_monthly_revenue(month_offset=0)
    last_month_revenue_str = get_monthly_revenue(month_offset=1)

    # Extract numerical values for comparison, handling potential errors
    current_revenue = 0
    if '₹' in current_month_revenue_str:
        try:
            current_revenue = float(current_month_revenue_str.split('₹')[1].split('.')[0].replace(',', ''))
        except ValueError:
            pass # Handle case where conversion fails

    last_revenue = 0
    if '₹' in last_month_revenue_str:
        try:
            last_revenue = float(last_month_revenue_str.split('₹')[1].split('.')[0].replace(',', ''))
        except ValueError:
            pass # Handle case where conversion fails

    comparison = ""
    if current_revenue > last_revenue:
        diff = current_revenue - last_revenue
        comparison = f"This month's sales are ₹{diff:,.2f} higher than last month's."
    elif last_revenue > current_revenue:
        diff = last_revenue - current_revenue
        comparison = f"This month's sales are ₹{diff:,.2f} lower than last month's."
    else:
        comparison = "This month's sales are similar to last month's."
    
    return f"{current_month_revenue_str}\n{last_month_revenue_str}\n{comparison}"


def get_revenue_trend_last_n_months(n=6):
    """Retrieves revenue trend for the last N months."""
    app.logger.info(f"Executing get_revenue_trend_last_n_months function for {n} months.")
    try:
        client = get_mongo_client()
        db = client.team1
        deals_collection = db.deals

        monthly_revenues = []
        # Iterate from n months ago to the current month
        for i in range(n -1, -1, -1): 
            today = datetime.datetime.now()
            target_month_start = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            for _ in range(i):
                target_month_start = (target_month_start - datetime.timedelta(days=1)).replace(day=1)
            
            target_month_end = (target_month_start + datetime.timedelta(days=32)).replace(day=1)

            pipeline = [
                {"$match": {"createdAt": {"$gte": target_month_start, "$lt": target_month_end}, "amount": {"$exists": True, "$ne": None}}},
                # Sum amounts, cleaning string values if necessary
                {"$addFields": {
                    "parsedAmount": {
                        "$cond": {
                            "if": {"$and": [{"$ne": [{"$type": "$amount"}, "double"]}, {"$ne": [{"$type": "$amount"}, "int"]}]},
                            "then": {"$toDouble": {"$replaceAll": {"input": {"$replaceAll": {"input": "$amount", "find": "₹", "replacement": ""}}, "find": ",", "replacement": ""}}},
                            "else": "$amount"
                        }
                    }
                }},
                {"$group": {"_id": None, "total_revenue": {"$sum": "$parsedAmount"}}}
            ]
            result = list(deals_collection.aggregate(pipeline))
            
            month_name = target_month_start.strftime('%b %Y')
            revenue = result[0]['total_revenue'] if result else 0
            monthly_revenues.append(f"{month_name}: ₹{revenue:,.2f}")
        
        client.close()
        return "Revenue trend for the last {} months:\n{}".format(n, "\n".join(monthly_revenues))
    except Exception as e:
        app.logger.error(f"Error fetching revenue trend from MongoDB: {e}")
        return "I encountered an error trying to retrieve the revenue trend."

def get_average_deal_size_this_quarter():
    """Calculates the average deal size for the current quarter."""
    app.logger.info("Executing get_average_deal_size_this_quarter function.")
    try:
        client = get_mongo_client()
        db = client.team1
        deals_collection = db.deals

        # Determine current quarter
        today = datetime.datetime.now()
        current_quarter = (today.month - 1) // 3 + 1
        q_start_month = (current_quarter - 1) * 3 + 1
        q_start = datetime.datetime(today.year, q_start_month, 1)
        # End of quarter is beginning of next quarter
        q_end = datetime.datetime(today.year, q_start_month + 3, 1) if q_start_month + 3 <= 12 else datetime.datetime(today.year + 1, 1, 1)

        pipeline = [
            {"$match": {"createdAt": {"$gte": q_start, "$lt": q_end}, "amount": {"$exists": True, "$ne": None}}},
            {"$addFields": {
                "parsedAmount": {
                    "$cond": {
                        "if": {"$and": [{"$ne": [{"$type": "$amount"}, "double"]}, {"$ne": [{"$type": "$amount"}, "int"]}]},
                        "then": {"$toDouble": {"$replaceAll": {"input": {"$replaceAll": {"input": "$amount", "find": "₹", "replacement": ""}}, "find": ",", "replacement": ""}}},
                        "else": "$amount"
                    }
                }
            }},
            {"$group": {"_id": None, "total_amount": {"$sum": "$parsedAmount"}, "count": {"$sum": 1}}}
        ]
        result = list(deals_collection.aggregate(pipeline))

        client.close()
        if result and result[0]['count'] > 0:
            avg_size = result[0]['total_amount'] / result[0]['count']
            return f"The average deal size this quarter is ₹{avg_size:,.2f}."
        return "No deals found this quarter to calculate average size."
    except Exception as e:
        app.logger.error(f"Error fetching average deal size from MongoDB: {e}")
        return "I encountered an error trying to retrieve average deal size."

def get_daily_sales_last_week():
    """Retrieves daily sales figures for the past 7 days."""
    app.logger.info("Executing get_daily_sales_last_week function.")
    try:
        client = get_mongo_client()
        db = client.team1
        deals_collection = db.deals

        today = datetime.datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        daily_sales = defaultdict(float)

        for i in range(7):
            day_start = today - datetime.timedelta(days=i)
            day_end = day_start + datetime.timedelta(days=1)
            
            sales_for_day = list(deals_collection.find(
                {"createdAt": {"$gte": day_start, "$lt": day_end}, "amount": {"$exists": True, "$ne": None}}
            ))

            for record in sales_for_day:
                amount_value = record.get('amount')
                if isinstance(amount_value, str):
                    cleaned_amount_str = amount_value.replace('₹', '').replace('$', '').replace(',', '').strip()
                    try:
                        daily_sales[day_start.strftime('%Y-%m-%d')] += float(cleaned_amount_str)
                    except ValueError:
                        app.logger.warning(f"Could not convert amount '{amount_value}' to float for deal: {record.get('dealName', 'Unnamed')}")
                elif isinstance(amount_value, (int, float)):
                    daily_sales[day_start.strftime('%Y-%m-%d')] += amount_value
        
        client.close()
        report = ["Daily sales for the past week:"]
        for date_str in sorted(daily_sales.keys()):
            report.append(f"{date_str}: ₹{daily_sales[date_str]:,.2f}")
        return "\n".join(report)
    except Exception as e:
        app.logger.error(f"Error fetching daily sales from MongoDB: {e}")
        return "I encountered an error trying to retrieve daily sales."

def get_top_revenue_sources_this_year():
    """Identifies the top 5 revenue sources (by deal owner) for the current year."""
    app.logger.info("Executing get_top_revenue_sources_this_year function.")
    try:
        client = get_mongo_client()
        db = client.team1
        deals_collection = db.deals

        current_year_start = datetime.datetime(datetime.datetime.now().year, 1, 1)
        next_year_start = datetime.datetime(datetime.datetime.now().year + 1, 1, 1)

        pipeline = [
            {"$match": {"createdAt": {"$gte": current_year_start, "$lt": next_year_start}, "amount": {"$exists": True, "$ne": None}}},
            {"$addFields": {
                "parsedAmount": {
                    "$cond": {
                        "if": {"$and": [{"$ne": [{"$type": "$amount"}, "double"]}, {"$ne": [{"$type": "$amount"}, "int"]}]},
                        "then": {"$toDouble": {"$replaceAll": {"input": {"$replaceAll": {"input": "$amount", "find": "₹", "replacement": ""}}, "find": ",", "replacement": ""}}},
                        "else": "$amount"
                    }
                }
            }},
            {"$group": {"_id": "$dealOwner", "total_revenue": {"$sum": "$parsedAmount"}}},
            {"$sort": {"total_revenue": -1}},
            {"$limit": 5}
        ]
        top_sources = list(deals_collection.aggregate(pipeline))

        client.close()
        if top_sources:
            formatted_sources = ", ".join([f"{s['_id']} (₹{s['total_revenue']:,.2f})" for s in top_sources])
            return f"Top 5 revenue sources this year (by Deal Owner): {formatted_sources}."
        return "No top revenue sources found for this year."
    except Exception as e:
        app.logger.error(f"Error fetching top revenue sources from MongoDB: {e}")
        return "I encountered an error trying to retrieve top revenue sources."

def get_biggest_deal_in_quarter(quarter=None, year=None):
    """Finds the biggest deal (by amount) in a specified quarter and year."""
    app.logger.info(f"Executing get_biggest_deal_in_quarter function for Q{quarter} {year}.")
    try:
        client = get_mongo_client()
        db = client.team1
        deals_collection = db.deals

        target_year = year if year else datetime.datetime.now().year
        target_quarter = quarter if quarter else (datetime.datetime.now().month - 1) // 3 + 1

        q_start_month = (target_quarter - 1) * 3 + 1
        q_start = datetime.datetime(target_year, q_start_month, 1)
        q_end = datetime.datetime(target_year, q_start_month + 3, 1) if q_start_month + 3 <= 12 else datetime.datetime(target_year + 1, 1, 1)

        pipeline = [
            {"$match": {"createdAt": {"$gte": q_start, "$lt": q_end}, "amount": {"$exists": True, "$ne": None}}},
            {"$addFields": {
                "parsedAmount": {
                    "$cond": {
                        "if": {"$and": [{"$ne": [{"$type": "$amount"}, "double"]}, {"$ne": [{"$type": "$amount"}, "int"]}]},
                        "then": {"$toDouble": {"$replaceAll": {"input": {"$replaceAll": {"input": "$amount", "find": "₹", "replacement": ""}}, "find": ",", "replacement": ""}}},
                        "else": "$amount"
                    }
                }
            }},
            {"$sort": {"parsedAmount": -1}}, # Sort by the parsed amount
            {"$limit": 1}
        ]
        biggest_deal = list(deals_collection.aggregate(pipeline))

        client.close()
        if biggest_deal:
            deal = biggest_deal[0]
            # Use the parsedAmount for display
            return f"The biggest deal in Q{target_quarter} {target_year} was '{deal.get('dealName', 'Unnamed Deal')}' for ₹{deal.get('parsedAmount', 0):,.2f}, closed by {deal.get('dealOwner', 'Unknown Owner')}."
        return f"No deals found in Q{target_quarter} {target_year} to determine the biggest."
    except Exception as e:
        app.logger.error(f"Error fetching biggest deal from MongoDB: {e}")
        return "I encountered an error trying to retrieve the biggest deal."

# --- Seller Prediction & Scoring (Placeholders for ML/complex logic) ---
def get_sellers_likely_to_convert_this_week():
    """Placeholder for advanced seller prediction based on ML."""
    app.logger.info("Executing get_sellers_likely_to_convert_this_week function (placeholder).")
    # This would require a predictive model (ML) and a 'conversion_likelihood' field
    return "Predicting seller conversion likelihood requires a trained machine learning model. I can highlight sellers with high engagement or recent activity if you have those metrics."

def get_sellers_by_score_above(min_score):
    """Retrieves sellers with a seller score above a specified minimum."""
    app.logger.info(f"Executing get_sellers_by_score_above function (placeholder for score field).")
    try:
        client = get_mongo_client()
        db = client.team1
        sellers_collection = db.sellers
        # This assumes a 'score' field exists in your sellers collection as a number
        high_score_sellers = list(sellers_collection.find({"score": {"$gte": min_score}}))
        client.close()
        if high_score_sellers:
            names = ", ".join([f"{l.get('firstName', '')} {l.get('lastName', '')} (Score: {l.get('score')})" for l in high_score_sellers])
            return f"Sellers with a score above {min_score}: {names}."
        return f"No sellers found with a score above {min_score}."
    except Exception as e:
        app.logger.error(f"Error fetching sellers by score from MongoDB: {e}")
        return "I encountered an error trying to retrieve sellers by score. Make sure 'score' field exists in your sellers collection and is a numerical type."

def get_conversion_probability_for_seller(first_name, last_name):
    """Placeholder for retrieving conversion probability of a specific seller."""
    app.logger.info(f"Executing get_conversion_probability_for_seller for {first_name} {last_name} (placeholder).")
    # This would require a predictive model and potentially a 'probability' field
    return f"To predict the conversion probability for {first_name} {last_name}, I would need access to a seller scoring model. Based on static info, if {first_name} {last_name} exists, I can tell you their known attributes."

def get_coldest_sellers():
    """Placeholder for identifying sellers with least recent activity."""
    app.logger.info("Executing get_coldest_sellers function (placeholder).")
    # Define "coldest" (e.g., last_contacted_date, no activity in X days)
    # Requires a 'last_contacted_date' field in sellers or contacts
    return "Identifying the 'coldest' sellers requires tracking recent engagement or last contact dates. Can you define what 'cold' means in terms of days since last contact or activity?"

def get_sellers_needing_immediate_attention():
    """Placeholder for identifying high-priority sellers."""
    app.logger.info("Executing get_sellers_needing_immediate_attention function (placeholder).")
    # This could be high score, recent activity, nearing due date for a task, etc.
    return "Sellers needing immediate attention often have high engagement scores, upcoming key milestones, or specific flags. I can show newly created sellers or high-priority tasks linked to sellers if you clarify what defines 'immediate attention'."


# --- Smart Alerts & Suggestions (Placeholders for complex logic/pre-set thresholds) ---
def check_weekly_goal_track():
    """Placeholder for checking progress against weekly sales goals."""
    app.logger.info("Executing check_weekly_goal_track function (placeholder).")
    return "Tracking weekly goals requires knowing your defined weekly target and accessing real-time sales data. If you tell me your weekly sales target, I can compare it to your current weekly sales."

def suggest_sellers_for_follow_up():
    """Placeholder for suggesting sellers that require follow-up."""
    app.logger.info("Executing suggest_sellers_for_follow_up function (placeholder).")
    # Could be based on last contact date, seller score, recent activity
    return "Suggesting sellers for follow-up requires a strategy, such as sellers not contacted in a while, or sellers with recent engagement. What criteria would you like to use?"

def alert_deal_stalling(deal_name=None):
    """Placeholder for alerting about deals that are stalled in the pipeline."""
    app.logger.info(f"Executing alert_deal_stalling function for {deal_name} (placeholder).")
    # Requires tracking deal stage duration.
    return "Alerting on stalling deals requires tracking the time spent in each sales stage and comparing it to predefined benchmarks. I can show you all deals currently in the 'Negotiation' stage if that helps."

def highlight_overdue_tasks():
    """Highlights all tasks that are past their due date and not completed."""
    app.logger.info("Executing highlight_overdue_tasks function.")
    try:
        client = get_mongo_client()
        db = client.team1
        tasks_collection = db.tasks

        # Find tasks where status is not 'Completed' and dueDate is in the past (as YYYY-MM-DD string)
        today = datetime.datetime.now().strftime("%Y-%m-%d")
        overdue_tasks = list(tasks_collection.find(
            {"status": {"$ne": "Completed"}, "dueDate": {"$lt": today}}
        ))
        client.close()

        if overdue_tasks:
            task_details = "\n".join([f"- '{t.get('subject', 'Unnamed Task')}' for {t.get('contact', 'Unknown Contact')} (Due: {t.get('dueDate')}, Priority: {t.get('priority', 'N/A')})" for t in overdue_tasks])
            return f"You have {len(overdue_tasks)} overdue tasks:\n{task_details}"
        return "You have no overdue tasks."
    except Exception as e:
        app.logger.error(f"Error fetching overdue tasks from MongoDB: {e}")
        return "I encountered an error trying to retrieve overdue tasks."

def get_deals_nearing_close_dates():
    """Lists deals that are expected to close within the next 7 days and are not yet closed."""
    app.logger.info("Executing get_deals_nearing_close_dates function.")
    try:
        client = get_mongo_client()
        db = client.team1
        deals_collection = db.deals

        today = datetime.datetime.now()
        next_7_days = today + datetime.timedelta(days=7)

        # Assuming closeDate is stored as a string in "YYYY-MM-DD" format
        nearing_close_deals = list(deals_collection.find({
            "closeDate": {"$lte": next_7_days.strftime("%Y-%m-%d")}, # Compare as strings
            "salesStage": {"$nin": ["Closed Won", "Closed Lost"]} # Not already closed
        }))
        client.close()

        if nearing_close_deals:
            deal_info = "\n".join([f"- '{d.get('dealName', 'Unnamed Deal')}' with {d.get('contactName', 'Unknown Contact')} (Stage: {d.get('salesStage')}, Amount: ₹{d.get('amount', 0):,.2f})" for d in nearing_close_deals])
            return f"Deals nearing close dates in the next 7 days:\n{deal_info}"
        return "No deals are nearing their close dates this week."
    except Exception as e:
        app.logger.error(f"Error fetching deals nearing close dates from MongoDB: {e}")
        return "I encountered an error trying to retrieve deals nearing close dates."

# --- CRM Data Lookup Functions ---
# These functions retrieve specific details about CRM entities.

def get_client_status_from_db(client_name):
    """Retrieves basic status and industry information for a given client."""
    app.logger.info(f"Executing get_client_status_from_db for {client_name}.")
    try:
        client = get_mongo_client()
        db = client.team1
        accounts_collection = db.accounts

        client_record = accounts_collection.find_one({"accountName": client_name})
        client.close()

        if client_record:
            status_proxy = client_record.get('accountType', 'N/A (type not found)')
            industry = client_record.get('industry', 'Unknown Industry')
            billing_address = client_record.get('billingAddress', 'N/A')
            phone = client_record.get('phone', 'N/A')
            email = client_record.get('email', 'N/A')
            return f"Based on live data, client '{client_name}' is an '{status_proxy}' type account in the '{industry}' industry. Billing Address: {billing_address}, Phone: {phone}, Email: {email}."
        return f"I could not find client '{client_name}' in the database."
    except Exception as e:
        app.logger.error(f"Error fetching client status from MongoDB: {e}")
        return "I encountered an error trying to retrieve client status. Please check the backend logs for details."

def get_last_contact_date_from_db(contact_name):
    """Retrieves the most recent contact date for a given contact based on task due dates."""
    app.logger.info(f"Executing get_last_contact_date_from_db for {contact_name}.")
    try:
        client = get_mongo_client()
        db = client.team1
        tasks_collection = db.tasks

        # Find the most recent task associated with the contact name
        related_tasks = list(tasks_collection.find(
            {"contact": contact_name}
        ).sort("dueDate", -1).limit(1)) # Sort by dueDate descending to get most recent

        client.close()

        if related_tasks:
            most_recent_task = related_tasks[0]
            due_date_str = most_recent_task.get('dueDate')
            subject = most_recent_task.get('subject', 'a task')

            last_contact_date = parse_date_from_str(due_date_str)
            if last_contact_date:
                return f"Based on live data, the last recorded interaction with '{contact_name}' was a task ('{subject}') due on: {last_contact_date.strftime('%Y-%m-%d')}."
            return f"Based on live data, the last recorded interaction with '{contact_name}' was a task ('{subject}'), but the date format was unexpected."
        return f"No recent tasks or direct contact records found for '{contact_name}'."
    except Exception as e:
        app.logger.error(f"Error fetching last contact date from MongoDB: {e}")
        return "I encountered an error trying to retrieve last contact date. Please check the backend logs for details."

def get_owner_of_deal(deal_name):
    """Retrieves the owner of a specific deal."""
    app.logger.info(f"Executing get_owner_of_deal for {deal_name}.")
    try:
        client = get_mongo_client()
        db = client.team1
        deals_collection = db.deals

        deal_record = deals_collection.find_one({"dealName": deal_name})
        client.close()

        if deal_record:
            owner = deal_record.get('dealOwner', 'N/A')
            return f"The owner of the deal '{deal_name}' is {owner}."
        return f"Deal '{deal_name}' not found."
    except Exception as e:
        app.logger.error(f"Error fetching deal owner from MongoDB: {e}")
        return "I encountered an error trying to retrieve the deal owner."

def get_deal_value(deal_name):
    """Retrieves the value of a specific deal."""
    app.logger.info(f"Executing get_deal_value for {deal_name}.")
    try:
        client = get_mongo_client()
        db = client.team1
        deals_collection = db.deals

        deal_record = deals_collection.find_one({"dealName": deal_name})
        client.close()

        if deal_record:
            amount_value = deal_record.get('amount', 0)
            # Ensure amount is a number for formatting
            if isinstance(amount_value, str):
                cleaned_amount_str = amount_value.replace('₹', '').replace('$', '').replace(',', '').strip()
                try:
                    amount_value = float(cleaned_amount_str)
                except ValueError:
                    app.logger.warning(f"Could not convert amount '{amount_value}' to float for deal: {deal_name}")
                    amount_value = 0 # Default to 0 if conversion fails

            return f"The deal value for '{deal_name}' is ₹{amount_value:,.2f}."
        return f"Deal '{deal_name}' not found."
    except Exception as e:
        app.logger.error(f"Error fetching deal value from MongoDB: {e}")
        return "I encountered an error trying to retrieve the deal value."

def get_expected_close_date_of_deal(deal_name):
    """Retrieves the expected close date of a specific deal."""
    app.logger.info(f"Executing get_expected_close_date_of_deal for {deal_name}.")
    try:
        client = get_mongo_client()
        db = client.team1
        deals_collection = db.deals

        deal_record = deals_collection.find_one({"dealName": deal_name})
        client.close()

        if deal_record:
            close_date = deal_record.get('closeDate', 'N/A')
            return f"The expected close date for '{deal_name}' is {close_date}."
        return f"Deal '{deal_name}' not found."
    except Exception as e:
        app.logger.error(f"Error fetching expected close date from MongoDB: {e}")
        return "I encountered an error trying to retrieve the expected close date."

def get_notes_for_seller(first_name, last_name):
    """Retrieves notes/description for a specific seller."""
    app.logger.info(f"Executing get_notes_for_seller for {first_name} {last_name}.")
    try:
        client = get_mongo_client()
        db = client.team1
        sellers_collection = db.sellers

        seller_record = sellers_collection.find_one({"firstName": first_name, "lastName": last_name})
        client.close()

        if seller_record:
            description = seller_record.get('description', 'No specific notes found.')
            return f"Notes for seller {first_name} {last_name}: {description}"
        return f"Seller '{first_name} {last_name}' not found."
    except Exception as e:
        app.logger.error(f"Error fetching notes for seller from MongoDB: {e}")
        return "I encountered an error trying to retrieve notes for the seller."

def get_communication_history_with_client(client_name):
    """Retrieves recent communication history for a client based on tasks."""
    app.logger.info(f"Executing get_communication_history_with_client for {client_name}.")
    try:
        client = get_mongo_client()
        db = client.team1
        tasks_collection = db.tasks # Assuming tasks capture communication (meetings, calls)

        # Find tasks related to the client (by account name in task's 'account' field)
        # This is a simplification; a full communication history might need dedicated 'interactions'
        # collection linked to accounts/contacts.
        client_tasks = list(tasks_collection.find(
            {"account": client_name}
        ).sort("createdAt", -1).limit(5)) # Get last 5 tasks for this account

        client.close()

        if client_tasks:
            history_items = "\n".join([
                f"- {t.get('subject')} with {t.get('contact', 'N/A')} (Due: {t.get('dueDate')}, Created: {t.get('createdAt').strftime('%Y-%m-%d')})"
                for t in client_tasks
            ])
            return f"Recent communication history with {client_name} (based on tasks):\n{history_items}"
        return f"No recent communication history found for {client_name} based on tasks."
    except Exception as e:
        app.logger.error(f"Error fetching communication history from MongoDB: {e}")
        return "I encountered an error trying to retrieve communication history."

# --- Deals & Pipelines Functions ---

def get_all_open_deals():
    """Lists all deals that are not yet "Closed Won" or "Closed Lost"."""
    app.logger.info("Executing get_all_open_deals function.")
    try:
        client = get_mongo_client()
        db = client.team1
        deals_collection = db.deals

        # Deals not in 'Closed Won' or 'Closed Lost' stages
        open_deals = list(deals_collection.find(
            {"salesStage": {"$nin": ["Closed Won", "Closed Lost"]}}
        ))
        client.close()

        if open_deals:
            deal_info = "\n".join([f"- '{d.get('dealName')}' (Stage: {d.get('salesStage')}, Amount: ₹{d.get('amount', 0):,.2f})" for d in open_deals])
            return f"You have {len(open_deals)} open deals:\n{deal_info}"
        return "You have no open deals at the moment."
    except Exception as e:
        app.logger.error(f"Error fetching open deals from MongoDB: {e}")
        return "I encountered an error trying to retrieve open deals."

def get_deals_in_negotiation_stage():
    """Lists all deals currently in the "Negotiation" sales stage."""
    app.logger.info("Executing get_deals_in_negotiation_stage function.")
    try:
        client = get_mongo_client()
        db = client.team1
        deals_collection = db.deals

        negotiation_deals = list(deals_collection.find(
            {"salesStage": "Negotiation"}
        ))
        client.close()

        if negotiation_deals:
            deal_info = "\n".join([f"- '{d.get('dealName')}' (Amount: ₹{d.get('amount', 0):,.2f}, Close Date: {d.get('closeDate')})" for d in negotiation_deals])
            return f"You have {len(negotiation_deals)} deals in the negotiation stage:\n{deal_info}"
        return "No deals are currently in the negotiation stage."
    except Exception as e:
        app.logger.error(f"Error fetching deals in negotiation stage from MongoDB: {e}")
        return "I encountered an error trying to retrieve deals in negotiation stage."

def get_deals_closed_this_month():
    """Provides a summary of deals closed (won and lost) this month."""
    app.logger.info("Executing get_deals_closed_this_month function.")
    try:
        client = get_mongo_client()
        db = client.team1
        deals_collection = db.deals

        today = datetime.datetime.now()
        start_of_month = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        next_month = start_of_month + datetime.timedelta(days=32)
        end_of_month = next_month.replace(day=1)

        closed_deals = list(deals_collection.find(
            {"salesStage": {"$in": ["Closed Won", "Closed Lost"]},
             # Assuming 'createdAt' marks the deal's entry, not necessarily its closure date.
             # For accurate "closed this month", you'd need a 'closedAt' field updated upon closure.
             "createdAt": {"$gte": start_of_month, "$lt": end_of_month}}
        ))
        client.close()

        if closed_deals:
            won_deals = [d for d in closed_deals if d.get('salesStage') == "Closed Won"]
            lost_deals = [d for d in closed_deals if d.get('salesStage') == "Closed Lost"]
            
            won_revenue = 0
            for deal in won_deals:
                amount_value = deal.get('amount')
                if isinstance(amount_value, str):
                    cleaned_amount_str = amount_value.replace('₹', '').replace('$', '').replace(',', '').strip()
                    try:
                        won_revenue += float(cleaned_amount_str)
                    except ValueError:
                        app.logger.warning(f"Could not convert amount '{amount_value}' to float for won deal: {deal.get('dealName', 'Unnamed')}")
                elif isinstance(amount_value, (int, float)):
                    won_revenue += amount_value

            lost_revenue = 0
            for deal in lost_deals:
                amount_value = deal.get('amount')
                if isinstance(amount_value, str):
                    cleaned_amount_str = amount_value.replace('₹', '').replace('$', '').replace(',', '').strip()
                    try:
                        lost_revenue += float(cleaned_amount_str)
                    except ValueError:
                        app.logger.warning(f"Could not convert amount '{amount_value}' to float for lost deal: {deal.get('dealName', 'Unnamed')}")
                elif isinstance(amount_value, (int, float)):
                    lost_revenue += amount_value


            return (f"This month, {len(closed_deals)} deals closed:\n"
                    f"- Won: {len(won_deals)} deals (₹{won_revenue:,.2f})\n"
                    f"- Lost: {len(lost_deals)} deals (₹{lost_revenue:,.2f})")
        return "No deals closed this month."
    except Exception as e:
        app.logger.error(f"Error fetching closed deals this month from MongoDB: {e}")
        return "I encountered an error trying to retrieve closed deals this month."

def get_deals_closing_this_week():
    """Lists deals expected to close this week that are not yet closed."""
    app.logger.info("Executing get_deals_closing_this_week function.")
    try:
        client = get_mongo_client()
        db = client.team1
        deals_collection = db.deals

        today = datetime.datetime.now()
        # Calculate start (Monday) and end (Sunday) of the current week
        start_of_week = today - datetime.timedelta(days=today.weekday()) 
        end_of_week = start_of_week + datetime.timedelta(days=7) 

        # Assuming closeDate is a string in "YYYY-MM-DD" format
        closing_deals = list(deals_collection.find({
            "closeDate": {"$gte": start_of_week.strftime("%Y-%m-%d"), "$lte": end_of_week.strftime("%Y-%m-%d")},
            "salesStage": {"$nin": ["Closed Won", "Closed Lost"]}
        }))
        client.close()

        if closing_deals:
            deal_info = "\n".join([f"- '{d.get('dealName')}' (Stage: {d.get('salesStage')}, Amount: ₹{d.get('amount', 0):,.2f})" for d in closing_deals])
            return f"You have {len(closing_deals)} deals expected to close this week:\n{deal_info}"
        return "No deals are expected to close this week."
    except Exception as e:
        app.logger.error(f"Error fetching deals closing this week from MongoDB: {e}")
        return "I encountered an error trying to retrieve deals closing this week."

def get_average_time_to_close_deal():
    """Placeholder for calculating average deal closure time (requires specific date fields)."""
    app.logger.info("Executing get_average_time_to_close_deal function (placeholder).")
    # This requires 'createdAt' and 'closedDate' fields, and deals marked as 'Closed Won'
    # 'closedDate' would need to be added to your schema if not there, or inferred from last status update.
    return "Calculating average time to close a deal requires 'createdAt' and 'closedDate' (or inferred closed date) for deals marked as 'Closed Won'. This functionality is not yet fully implemented."

def get_overdue_deals():
    """Lists all deals that have passed their close date and are not yet closed."""
    app.logger.info("Executing get_overdue_deals function.")
    try:
        client = get_mongo_client()
        db = client.team1
        deals_collection = db.deals

        today_str = datetime.datetime.now().strftime("%Y-%m-%d")

        # Overdue deals are those with a closeDate in the past and not yet won/lost
        overdue_deals = list(deals_collection.find({
            "closeDate": {"$lt": today_str},
            "salesStage": {"$nin": ["Closed Won", "Closed Lost"]}
        }))
        client.close()

        if overdue_deals:
            deal_info = "\n".join([f"- '{d.get('dealName')}' (Stage: {d.get('salesStage')}, Due: {d.get('closeDate')})" for d in overdue_deals])
            return f"You have {len(overdue_deals)} overdue deals:\n{deal_info}"
        return "You have no overdue deals."
    except Exception as e:
        app.logger.error(f"Error fetching overdue deals from MongoDB: {e}")
        return "I encountered an error trying to retrieve overdue deals."

def get_top_deal_closer_this_month():
    """Identifies the top deal closer for the current month based on won deal amounts."""
    app.logger.info("Executing get_top_deal_closer_this_month function.")
    try:
        client = get_mongo_client()
        db = client.team1
        deals_collection = db.deals

        today = datetime.datetime.now()
        start_of_month = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        next_month = start_of_month + datetime.timedelta(days=32)
        end_of_month = next_month.replace(day=1)

        pipeline = [
            {"$match": {"createdAt": {"$gte": start_of_month, "$lt": end_of_month}, "salesStage": "Closed Won"}},
            {"$addFields": {
                "parsedAmount": {
                    "$cond": {
                        "if": {"$and": [{"$ne": [{"$type": "$amount"}, "double"]}, {"$ne": [{"$type": "$amount"}, "int"]}]},
                        "then": {"$toDouble": {"$replaceAll": {"input": {"$replaceAll": {"input": "$amount", "find": "₹", "replacement": ""}}, "find": ",", "replacement": ""}}},
                        "else": "$amount"
                    }
                }
            }},
            {"$group": {"_id": "$dealOwner", "total_won_amount": {"$sum": "$parsedAmount"}, "deals_won_count": {"$sum": 1}}},
            {"$sort": {"total_won_amount": -1}},
            {"$limit": 1}
        ]
        top_closer = list(deals_collection.aggregate(pipeline))

        client.close()
        if top_closer:
            closer = top_closer[0]
            return (f"The top deal closer this month is {closer['_id']} with {closer['deals_won_count']} "
                    f"deals won totaling ₹{closer['total_won_amount']:,.2f}.")
        return "No deals closed and won this month yet."
    except Exception as e:
        app.logger.error(f"Error fetching top deal closer from MongoDB: {e}")
        return "I encountered an error trying to retrieve the top deal closer."

# --- Contacts & Accounts Functions ---

def get_contacts_by_city_region(city_region):
    """Retrieves contacts associated with accounts in a given city or region."""
    app.logger.info(f"Executing get_contacts_by_city_region for {city_region}.")
    try:
        client = get_mongo_client()
        db = client.team1
        accounts_collection = db.accounts
        contacts_collection = db.contacts

        # Find accounts matching the city/region in billingState or billingCountry
        matching_accounts = list(accounts_collection.find(
            {"$or": [{"billingState": city_region}, {"billingCountry": city_region}]}
        ))
        
        # Get the names of these accounts to link to contacts
        matching_company_names = [acc.get('accountName') for acc in matching_accounts if acc.get('accountName')]
        
        # Find contacts associated with these company names
        contacts_in_region = list(contacts_collection.find({"company": {"$in": matching_company_names}}))

        client.close()
        if contacts_in_region:
            contact_names = ", ".join([f"{c.get('firstName', '')} {c.get('lastName', '')} ({c.get('company', 'Unknown Company')})" for c in contacts_in_region])
            return f"Contacts in {city_region}: {contact_names}."
        return f"No contacts found linked to accounts in {city_region}."
    except Exception as e:
        app.logger.error(f"Error fetching contacts by city/region from MongoDB: {e}")
        return "I encountered an error trying to retrieve contacts by region."

def get_contacts_unresponsive_in_weeks(weeks=2):
    """Identifies contacts who haven't had a task-based interaction in a specified number of weeks."""
    app.logger.info(f"Executing get_contacts_unresponsive_in_weeks for {weeks} weeks.")
    try:
        client = get_mongo_client()
        db = client.team1
        tasks_collection = db.tasks
        contacts_collection = db.contacts

        # Aggregate tasks to find the latest interaction date for each contact
        pipeline = [
            {"$group": {
                "_id": "$contact", # Group by contact name
                "latest_interaction": {"$max": "$createdAt"} # Find the maximum (latest) creation date for tasks
            }}
        ]
        latest_interactions = list(tasks_collection.aggregate(pipeline))
        
        unresponsive_contact_names = []
        threshold_date = datetime.datetime.now() - datetime.timedelta(weeks=weeks)

        # Check which contacts' latest interaction is older than the threshold
        for interaction in latest_interactions:
            # Ensure 'latest_interaction' is a datetime object for comparison
            if isinstance(interaction["latest_interaction"], datetime.datetime) and interaction["latest_interaction"] < threshold_date:
                unresponsive_contact_names.append(interaction["_id"])
        
        client.close()
        if unresponsive_contact_names:
            names = ", ".join(unresponsive_contact_names)
            return f"Contacts who haven't had a task-based interaction in over {weeks} weeks: {names}."
        return f"No contacts found who haven't responded in over {weeks} weeks based on task history."
    except Exception as e:
        app.logger.error(f"Error fetching unresponsive contacts from MongoDB: {e}")
        return "I encountered an error trying to retrieve unresponsive contacts."

def get_job_title_of_contact(first_name, last_name):
    """Retrieves the job title for a specific contact."""
    app.logger.info(f"Executing get_job_title_of_contact for {first_name} {last_name}.")
    try:
        client = get_mongo_client()
        db = client.team1
        contacts_collection = db.contacts

        contact_record = contacts_collection.find_one({"firstName": first_name, "lastName": last_name})
        client.close()

        if contact_record:
            title = contact_record.get('title', 'N/A') # Assuming 'title' is the job title field
            return f"The job title for {first_name} {last_name} is: {title}."
        return f"Contact '{first_name} {last_name}' not found."
    except Exception as e:
        app.logger.error(f"Error fetching job title from MongoDB: {e}")
        return "I encountered an error trying to retrieve the job title."

def get_clients_contacted_last_week():
    """Lists clients who had tasks created in the last week."""
    app.logger.info("Executing get_clients_contacted_last_week function.")
    try:
        client = get_mongo_client()
        db = client.team1
        tasks_collection = db.tasks

        end_date = datetime.datetime.now()
        start_date = end_date - datetime.timedelta(days=7)

        # Assuming 'createdAt' of tasks indicates when a contact interaction (task) was logged
        contacted_tasks = list(tasks_collection.find(
            {"createdAt": {"$gte": start_date, "$lt": end_date}, "contact": {"$exists": True, "$ne": ""}}
        ))
        
        client.close()
        
        contacted_names = set() # Use a set to avoid duplicate client names
        for task in contacted_tasks:
            contacted_names.add(task.get('contact'))

        if contacted_names:
            return f"Clients contacted last week (based on tasks): {', '.join(sorted(list(contacted_names)))}."
        return "No clients were contacted last week (based on tasks)."
    except Exception as e:
        app.logger.error(f"Error fetching clients contacted last week from MongoDB: {e}")
        return "I encountered an error trying to retrieve clients contacted last week."

# --- Tasks & Follow-ups Functions ---
def get_tasks_due_today():
    """Lists all tasks that are due today and are not yet completed."""
    app.logger.info("Executing get_tasks_due_today function.")
    try:
        client = get_mongo_client()
        db = client.team1
        tasks_collection = db.tasks

        today_str = datetime.datetime.now().strftime("%Y-%m-%d")
        
        tasks_today = list(tasks_collection.find(
            {"dueDate": today_str, "status": {"$ne": "Completed"}}
        ))
        client.close()

        if tasks_today:
            task_info = "\n".join([f"- '{t.get('subject')}' for {t.get('contact', 'N/A')} (Priority: {t.get('priority', 'N/A')})" for t in tasks_today])
            return f"You have {len(tasks_today)} tasks due today:\n{task_info}"
        return "You have no tasks due today."
    except Exception as e:
        app.logger.error(f"Error fetching tasks due today from MongoDB: {e}")
        return "I encountered an error trying to retrieve tasks due today."

def get_completed_tasks_this_week():
    """Lists tasks marked as 'Completed' within the current week."""
    app.logger.info("Executing get_completed_tasks_this_week function.")
    try:
        client = get_mongo_client()
        db = client.team1
        tasks_collection = db.tasks

        today = datetime.datetime.now()
        start_of_week = today - datetime.timedelta(days=today.weekday()) # Monday of current week
        end_of_week = start_of_week + datetime.timedelta(days=7) # End of Sunday of current week

        # Query for tasks completed within the current week
        # Assuming 'createdAt' is when the task was created/logged.
        # For actual completion, you'd ideally need a 'completedAt' timestamp.
        completed_tasks = list(tasks_collection.find(
            {"status": "Completed", "createdAt": {"$gte": start_of_week, "$lt": end_of_week}}
        ))
        client.close()

        if completed_tasks:
            task_info = "\n".join([f"- '{t.get('subject')}' for {t.get('contact', 'N/A')}" for t in completed_tasks])
            return f"You have completed {len(completed_tasks)} tasks this week:\n{task_info}"
        return "No tasks completed this week."
    except Exception as e:
        app.logger.error(f"Error fetching completed tasks this week from MongoDB: {e}")
        return "I encountered an error trying to retrieve completed tasks this week."

def get_tasks_assigned_to_user(user_name):
    """Lists tasks assigned to a specific user."""
    app.logger.info(f"Executing get_tasks_assigned_to_user for {user_name}.")
    try:
        client = get_mongo_client()
        db = client.team1
        tasks_collection = db.tasks

        assigned_tasks = list(tasks_collection.find({"taskOwner": user_name})) # Assuming 'taskOwner' field exists
        client.close()

        if assigned_tasks:
            task_info = "\n".join([f"- '{t.get('subject')}' (Due: {t.get('dueDate')}, Status: {t.get('status')})" for t in assigned_tasks])
            return f"{user_name} has {len(assigned_tasks)} tasks assigned:\n{task_info}"
        return f"No tasks found assigned to {user_name}."
    except Exception as e:
        app.logger.error(f"Error fetching tasks assigned to user from MongoDB: {e}")
        return "I encountered an error trying to retrieve tasks assigned to the user."

def get_tasks_linked_to_deal(deal_name):
    """Lists tasks that are linked to a specific deal."""
    app.logger.info(f"Executing get_tasks_linked_to_deal for {deal_name}.")
    try:
        client = get_mongo_client()
        db = client.team1
        tasks_collection = db.tasks
        
        # Assuming tasks are linked to deals via an 'account' or 'dealName' field in the task document
        linked_tasks = list(tasks_collection.find({"account": deal_name})) 
        client.close()

        if linked_tasks:
            task_info = "\n".join([f"- '{t.get('subject')}' (Due: {t.get('dueDate')}, Status: {t.get('status')})" for t in linked_tasks])
            return f"Tasks linked to deal '{deal_name}':\n{task_info}"
        return f"No tasks found linked to deal '{deal_name}'."
    except Exception as e:
        app.logger.error(f"Error fetching tasks linked to deal from MongoDB: {e}")
        return "I encountered an error trying to retrieve tasks linked to the deal."

def get_meetings_scheduled_this_week():
    """Lists meetings scheduled for the current week."""
    app.logger.info("Executing get_meetings_scheduled_this_week function.")
    try:
        client = get_mongo_client()
        db = client.team1
        tasks_collection = db.tasks

        today = datetime.datetime.now()
        start_of_week = today - datetime.timedelta(days=today.weekday())
        end_of_week = start_of_week + datetime.timedelta(days=7)

        # Assuming tasks with 'Meeting' in the subject or a dedicated 'type' field are meetings
        meetings = list(tasks_collection.find({
            "subject": {"$regex": "Meeting", "$options": "i"}, # Case-insensitive search for "Meeting"
            "dueDate": {"$gte": start_of_week.strftime("%Y-%m-%d"), "$lte": end_of_week.strftime("%Y-%m-%d")}
        }))
        client.close()

        if meetings:
            meeting_info = "\n".join([f"- '{m.get('subject')}' with {m.get('contact', 'N/A')} (Due: {m.get('dueDate')})" for m in meetings])
            return f"You have {len(meetings)} meetings scheduled this week:\n{meeting_info}"
        return "No meetings scheduled this week."
    except Exception as e:
        app.logger.error(f"Error fetching meetings scheduled this week from MongoDB: {e}")
        return "I encountered an error trying to retrieve scheduled meetings."

def get_calls_made_this_month():
    """Counts and lists calls made this month (assuming 'Call' in subject and 'Completed' status)."""
    app.logger.info("Executing get_calls_made_this_month function.")
    try:
        client = get_mongo_client()
        db = client.team1
        tasks_collection = db.tasks

        today = datetime.datetime.now()
        start_of_month = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        next_month = start_of_month + datetime.timedelta(days=32)
        end_of_month = next_month.replace(day=1)

        # Assuming tasks with 'Call' in subject and 'Completed' status are recorded calls
        calls_made = list(tasks_collection.find({
            "subject": {"$regex": "Call", "$options": "i"},
            "status": "Completed", # Assuming completed calls are marked as such
            "createdAt": {"$gte": start_of_month, "$lt": end_of_month}
        }))
        client.close()

        if calls_made:
            call_info = "\n".join([f"- '{c.get('subject')}' with {c.get('contact', 'N/A')} (Completed: {c.get('createdAt').strftime('%Y-%m-%d')})" for c in calls_made])
            return f"You have recorded {len(calls_made)} calls made this month:\n{call_info}"
        return "No calls recorded as completed this month."
    except Exception as e:
        app.logger.error(f"Error fetching calls made this month from MongoDB: {e}")
        return "I encountered an error trying to retrieve calls made this month."

def get_total_acquired_deals_revenue_by_timeframe(timeframe_unit='all_time'):
    """
    Calculates the total revenue from deals marked as 'Closed Won' for a given timeframe.
    timeframe_unit can be 'this_week', 'this_month', 'this_quarter', 'this_year', or 'all_time'.
    """
    app.logger.info(f"Executing get_total_acquired_deals_revenue_by_timeframe function for {timeframe_unit}.")
    try:
        client = get_mongo_client()
        db = client.team1
        deals_collection = db.deals

        # Base query to find 'Closed Won' deals with an existing amount
        query_filter = {"salesStage": {"$regex": "Closed Won", "$options": "i"}, "amount": {"$exists": True, "$ne": None}}

        today = datetime.datetime.now()
        start_date = None
        end_date = None

        # Add date filtering based on timeframe_unit
        if timeframe_unit == 'this_week':
            start_date = today - datetime.timedelta(days=today.weekday()) # Monday
            end_date = start_date + datetime.timedelta(days=7) # End of Sunday
        elif timeframe_unit == 'this_month':
            start_date = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            end_date = (start_date + datetime.timedelta(days=32)).replace(day=1) # Start of next month
        elif timeframe_unit == 'this_quarter':
            current_quarter = (today.month - 1) // 3 + 1
            q_start_month = (current_quarter - 1) * 3 + 1
            start_date = datetime.datetime(today.year, q_start_month, 1)
            q_end_month = q_start_month + 3
            q_end_year = today.year
            if q_end_month > 12:
                q_end_month -= 12
                q_end_year += 1
            end_date = datetime.datetime(q_end_year, q_end_month, 1) # Start of next quarter
        elif timeframe_unit == 'this_year':
            start_date = datetime.datetime(today.year, 1, 1)
            end_date = datetime.datetime(today.year + 1, 1, 1)
        # If 'all_time' or no timeframe, no date filter is added to the query_filter.

        if start_date and end_date:
            query_filter["createdAt"] = {"$gte": start_date, "$lt": end_date}
        
        acquired_deals = list(deals_collection.find(query_filter))
        
        total_revenue = 0
        for deal in acquired_deals:
            amount_value = deal.get('amount')
            if isinstance(amount_value, str):
                # Clean the string: remove currency symbols (₹, $) and commas
                cleaned_amount_str = amount_value.replace('₹', '').replace('$', '').replace(',', '').strip()
                try:
                    total_revenue += float(cleaned_amount_str)
                except ValueError:
                    app.logger.warning(f"Could not convert amount '{amount_value}' to float for deal: {deal.get('dealName', 'Unnamed')}")
            elif isinstance(amount_value, (int, float)):
                total_revenue += amount_value
            # If amount_value is None or another unexpected type, it's ignored due to initial 0 value.

        num_deals = len(acquired_deals)

        client.close()
        
        timeframe_text = timeframe_unit.replace('_', ' ') # Format for display
        return f"Based on live data, the total revenue from '{timeframe_text}' acquired deals ('Closed Won') is ₹{total_revenue:,.2f} from {num_deals} deals."
    except Exception as e:
        app.logger.error(f"Error fetching acquired deals revenue for {timeframe_unit} from MongoDB: {e}")
        return f"I encountered an error trying to retrieve revenue from acquired deals for {timeframe_unit}. Please check the backend logs for details."

def get_total_acquired_deals_revenue():
    """Defaults to all_time revenue for acquired deals."""
    return get_total_acquired_deals_revenue_by_timeframe('all_time')

def get_high_priority_tasks_count():
    """
    Retrieves the count of high-priority tasks that are not yet completed.
    Assumes 'priority' field in tasks can be 'High'.
    """
    app.logger.info("Executing get_high_priority_tasks_count function.")
    try:
        client = get_mongo_client()
        db = client.team1
        tasks_collection = db.tasks

        high_priority_tasks = list(tasks_collection.find({
            "priority": {"$regex": "High", "$options": "i"}, # Case-insensitive "High"
            "status": {"$ne": "Completed"} # Tasks that are not yet completed
        }))
        
        count = len(high_priority_tasks)
        client.close()
        
        if count > 0:
            task_details = "\n".join([f"- '{t.get('subject')}' for {t.get('contact', 'N/A')} (Due: {t.get('dueDate')})" for t in high_priority_tasks])
            return f"You have {count} high-priority tasks that are not yet completed:\n{task_details}"
        return "You have no high-priority tasks that are not yet completed."
    except Exception as e:
        app.logger.error(f"Error fetching high priority tasks count from MongoDB: {e}")
        return "I encountered an error trying to retrieve the high priority tasks count. Please check the backend logs for details."

def get_total_sellers_count():
    """
    Retrieves the total count of sellers in the sellers collection.
    """
    app.logger.info("Executing get_total_sellers_count function.")
    try:
        client = get_mongo_client()
        db = client.team1
        sellers_collection = db.sellers

        count = sellers_collection.count_documents({}) # Count all documents in the sellers collection
        client.close()
        
        return f"You have a total of {count} sellers in your system."
    except Exception as e:
        app.logger.error(f"Error fetching total sellers count from MongoDB: {e}")
        return "I encountered an error trying to retrieve the total sellers count. Please check the backend logs for details."


# --- API Route for Chatbot Interaction ---
@app.route('/chat', methods=['POST'])
def chat():
    app.logger.info("Received /chat request.")
    user_message = request.json.get('message')
    chat_history_from_frontend = request.json.get('history', [])

    if not user_message:
        app.logger.error("No message provided in request.")
        return jsonify({"error": "No message provided"}), 400

    # Initialize dynamic_data_context, which will hold the data retrieved from MongoDB
    dynamic_data_context = ""
    lower_user_message = user_message.lower()

    # --- Intent Recognition and Dynamic Data Injection ---
    # This section tries to identify the user's intent and call the appropriate backend function
    # to retrieve relevant data from MongoDB. This data is then injected into the LLM's context.

    # Pre-process for "yes" or short answers based on the last bot question
    if len(chat_history_from_frontend) >= 2:
        last_bot_message_parts = chat_history_from_frontend[-2]['parts']
        last_bot_message_text = last_bot_message_parts[0]['text'].lower() if last_bot_message_parts else ""

        if lower_user_message == "yes":
            # Specific handling for "yes" after revenue clarification
            if "potential revenue from deals within the crm?" in last_bot_message_text or \
               "would you like to know the total revenue from all \"closed won\" deals, or would you like to specify a time frame?" in last_bot_message_text or \
               "i can provide the total revenue from all 'closed won' deals. would you like me to proceed?" in last_bot_message_text:
                dynamic_data_context = get_total_acquired_deals_revenue_by_timeframe('all_time')
                user_message = "" # Consume the user message as it's a direct follow-up
                lower_user_message = ""
            elif "specify the time frame you're interested in" in last_bot_message_text:
                 # This is a placeholder; you might need to infer the timeframe from previous conversation
                 dynamic_data_context = get_total_sales_last_week() 
                 user_message = ""
                 lower_user_message = ""


    # Standard Intent Recognition for Dynamic Data Injection (only if not already handled by "yes")
    # This block is executed only if the user_message was not a simple "yes" follow-up
    if user_message: 
        # Sales & Performance Queries
        if "total sales last week" in lower_user_message or "sales last week" in lower_user_message:
            dynamic_data_context = get_total_sales_last_week()
        elif "revenue this month" in lower_user_message:
            dynamic_data_context = get_monthly_revenue(month_offset=0)
        elif "compare this month sales with last month" in lower_user_message or "compare this month's sales with last month's" in lower_user_message:
            dynamic_data_context = compare_monthly_sales()
        elif "revenue trend for the last 6 months" in lower_user_message:
            dynamic_data_context = get_revenue_trend_last_n_months(n=6)
        elif "average deal size this quarter" in lower_user_message:
            dynamic_data_context = get_average_deal_size_this_quarter()
        elif "daily sales for the past week" in lower_user_message:
            dynamic_data_context = get_daily_sales_last_week()
        elif "top revenue sources this year" in lower_user_message:
            dynamic_data_context = get_top_revenue_sources_this_year()
        elif "biggest deal in q2" in lower_user_message:
            dynamic_data_context = get_biggest_deal_in_quarter(quarter=2)
        elif "potential revenue this week" in lower_user_message or "deals acquired this week" in lower_user_message or ("amount of deals acquired" in lower_user_message and "this week" in lower_user_message):
            dynamic_data_context = get_total_acquired_deals_revenue_by_timeframe('this_week')
        elif "potential revenue this month" in lower_user_message or "deals acquired this month" in lower_user_message or ("amount of deals acquired" in lower_user_message and "this month" in lower_user_message):
            dynamic_data_context = get_total_acquired_deals_revenue_by_timeframe('this_month')
        elif "potential revenue this quarter" in lower_user_message or "deals acquired this quarter" in lower_user_message or ("amount of deals acquired" in lower_user_message and "this quarter" in lower_user_message):
            dynamic_data_context = get_total_acquired_deals_revenue_by_timeframe('this_quarter')
        elif "potential revenue this year" in lower_user_message or "deals acquired this year" in lower_user_message or ("amount of deals acquired" in lower_user_message and "this year" in lower_user_message):
            dynamic_data_context = get_total_acquired_deals_revenue_by_timeframe('this_year')
        elif "amount of closed win" in lower_user_message or "potential revenue" in lower_user_message or "deals won revenue" in lower_user_message or "revenue from acquired deals" in lower_user_message or "amount of deals acquired" in lower_user_message:
            dynamic_data_context = get_total_acquired_deals_revenue_by_timeframe('all_time')
            
        # Seller Prediction & Scoring
        elif "how much seller" in lower_user_message or "total sellers" in lower_user_message or "number of sellers" in lower_user_message or "count of sellers" in lower_user_message:
            dynamic_data_context = get_total_sellers_count()
        elif "sellers most likely to convert this week" in lower_user_message or "sellers have the highest chance of converting" in lower_user_message:
            dynamic_data_context = get_sellers_likely_to_convert_this_week()
        elif "sellers with a score above" in lower_user_message:
            try:
                # Extract score from message (e.g., "above 80?")
                score_str = lower_user_message.split("sellers with a score above ")[1].split("?")[0].strip()
                min_score = int(score_str.split()[0])
                dynamic_data_context = get_sellers_by_score_above(min_score)
            except (ValueError, IndexError):
                dynamic_data_context = "Please specify a valid score, e.g., 'Show me sellers with a score above 80'."
        elif "conversion probability for" in lower_user_message:
            try:
                name_parts = lower_user_message.split("conversion probability for ")[1].split("?")[0].strip().split()
                first_name = name_parts[0].title() if name_parts else ""
                last_name = name_parts[1].title() if len(name_parts) > 1 else ""
                dynamic_data_context = get_conversion_probability_for_seller(first_name, last_name)
            except IndexError:
                dynamic_data_context = "Please specify a seller's full name, e.g., 'What’s the conversion probability for John Doe?'"
        elif "coldest sellers" in lower_user_message:
            dynamic_data_context = get_coldest_sellers()
        elif "sellers need immediate attention" in lower_user_message or "high-priority sellers today" in lower_user_message or "top 5 high-priority sellers today" in lower_user_message or "urgent sellers" in lower_user_message:
            dynamic_data_context = get_sellers_needing_immediate_attention()
        
        # Smart Alerts & Suggestions - Mostly placeholders for complex logic that might need ML or more data
        elif "on track to hit my weekly goal" in lower_user_message or "hit my monthly target" in lower_user_message or "reach my quarterly goal" in lower_user_message or "falling behind on any targets" in lower_user_message:
            dynamic_data_context = check_weekly_goal_track()
        elif "task should i prioritize today" in lower_user_message:
            dynamic_data_context = "Prioritizing tasks requires a system for task importance and due dates. I can show you tasks due today or overdue tasks."
        elif "suggest sellers i should follow up with" in lower_user_message:
            dynamic_data_context = suggest_sellers_for_follow_up()
        elif "alert me if any deal is stalling" in lower_user_message:
            dynamic_data_context = alert_deal_stalling()
        elif "highlight any overdue tasks" in lower_user_message:
            dynamic_data_context = highlight_overdue_tasks()
        elif "deals are nearing close dates" in lower_user_message:
            dynamic_data_context = get_deals_nearing_close_dates()

        # CRM Data Lookup
        elif "status of" in lower_user_message and "client" in lower_user_message:
            try:
                client_name = lower_user_message.split("status of ")[1].split("?")[0].strip().title()
                dynamic_data_context = get_client_status_from_db(client_name)
            except IndexError:
                dynamic_data_context = "Please specify a client name, e.g., 'What's the status of Havells India?'"
        elif "last speak with" in lower_user_message or "last contact with" in lower_user_message:
            try:
                contact_name = lower_user_message.split("last speak with ")[1].split("?")[0].strip().title() if "last speak with" in lower_user_message else \
                               lower_user_message.split("last contact with ")[1].split("?")[0].strip().title()
                dynamic_data_context = get_last_contact_date_from_db(contact_name)
            except IndexError:
                dynamic_data_context = "Please specify a contact's full name, e.g., 'When did I last speak with Parth Sarthi?'"
        elif "who's assigned to the" in lower_user_message and "deal" in lower_user_message:
            try:
                deal_name = lower_user_message.split("who's assigned to the ")[1].split(" deal")[0].strip().title()
                dynamic_data_context = get_owner_of_deal(deal_name)
            except IndexError:
                dynamic_data_context = "Please specify a deal name, e.g., 'Who's assigned to the HCL AppScan deal?'"
        elif "deal value for" in lower_user_message:
            try:
                deal_name = lower_user_message.split("deal value for ")[1].split("?")[0].strip().title()
                dynamic_data_context = get_deal_value(deal_name)
            except IndexError:
                dynamic_data_context = "Please specify a deal name, e.g., 'What's the deal value for HCL AppScan?'"
        elif "expected to close" in lower_user_message and "deal" in lower_user_message:
            try:
                deal_name = lower_user_message.split("when is ")[1].split(" expected to close")[0].strip().title()
                dynamic_data_context = get_expected_close_date_of_deal(deal_name)
            except IndexError:
                dynamic_data_context = "Please specify a deal name, e.g., 'When is HCL AppScan expected to close?'"
        elif "show all notes for" in lower_user_message and "seller" in lower_user_message:
            try:
                name_parts = lower_user_message.split("show all notes for ")[1].split(" seller")[0].strip().split()
                first_name = name_parts[0].title() if name_parts else ""
                last_name = name_parts[1].title() if len(name_parts) > 1 else ""
                dynamic_data_context = get_notes_for_seller(first_name, last_name)
            except IndexError:
                dynamic_data_context = "Please specify a seller's full name, e.g., 'Show all notes for Amit Seth seller.'"
        elif "communication history with" in lower_user_message and "client" in lower_user_message:
            try:
                client_name = lower_user_message.split("communication history with ")[1].split("client")[0].strip().title()
                dynamic_data_context = get_communication_history_with_client(client_name)
            except IndexError:
                dynamic_data_context = "Please specify a client name, e.g., 'Show communication history with Havells India.'"

        # Deals & Pipelines
        elif "show all open deals" in lower_user_message:
            dynamic_data_context = get_all_open_deals()
        elif "deals are in the negotiation stage" in lower_user_message:
            dynamic_data_context = get_deals_in_negotiation_stage()
        elif "how many deals closed this month" in lower_user_message:
            dynamic_data_context = get_deals_closed_this_month()
        elif "deals are expected to close this week" in lower_user_message:
            dynamic_data_context = get_deals_closing_this_week()
        elif "average time to close a deal" in lower_user_message:
            dynamic_data_context = get_average_time_to_close_deal()
        elif "how many deals are overdue" in lower_user_message:
            dynamic_data_context = get_overdue_deals()
        elif "who’s the top deal closer this month" in lower_user_message:
            dynamic_data_context = get_top_deal_closer_this_month()
        
        # Tasks & Follow-ups
        elif "what tasks are due today" in lower_user_message:
            dynamic_data_context = get_tasks_due_today()
        elif "show all completed tasks this week" in lower_user_message:
            dynamic_data_context = get_completed_tasks_this_week()
        elif "what tasks are assigned to" in lower_user_message:
            try:
                user_name = lower_user_message.split("what tasks are assigned to ")[1].split("?")[0].strip().title()
                dynamic_data_context = get_tasks_assigned_to_user(user_name)
            except IndexError:
                dynamic_data_context = "Please specify a user name, e.g., 'What tasks are assigned to Amit Seth?'"
        elif "what tasks are linked to" in lower_user_message and "deal" in lower_user_message:
            try:
                deal_name = lower_user_message.split("what tasks are linked to ")[1].split(" deal")[0].strip().title()
                dynamic_data_context = get_tasks_linked_to_deal(deal_name)
            except IndexError:
                dynamic_data_context = "Please specify a deal name, e.g., 'What tasks are linked to HCL AppScan deal?'"
        elif "how many meetings are scheduled this week" in lower_user_message:
            dynamic_data_context = get_meetings_scheduled_this_week()
        elif "show calls made this month" in lower_user_message:
            dynamic_data_context = get_calls_made_this_month()
        elif "number of high priority tasks" in lower_user_message:
            dynamic_data_context = get_high_priority_tasks_count()
        # If no specific dynamic data query matches, dynamic_data_context remains empty
        else:
            dynamic_data_context = "" 


    # Construct the base system instruction for the Large Language Model (LLM)
    base_system_instruction = f"""
    You are an AI assistant for Team1 Consulting's CRM portal.
    Your purpose is to answer questions about Team1 Consulting's services and the features of the CRM portal.
    You can also provide real-time insights by querying the company's internal MongoDB database for sales, sellers, accounts, contacts, and task information.
    Be helpful, informative, and concise.

    IMPORTANT: ALWAYS present all monetary values in Indian Rupees (₹) format. For example, use '₹12,34,567.89' instead of '$1,234,567.89' or '1,234,567.89 USD'. This is a strict requirement for all currency outputs.

    Here is general information about Team1 Consulting:
    {business_knowledge}

    Here is general information about the CRM Portal and its features:
    {crm_knowledge}

    Here is specific real-time data retrieved based on the user's current query from the MongoDB database:
    {dynamic_data_context}

    IMPORTANT CONTEXT GUIDELINES FOR RESPONDING:
    - If a user asks for "amount of seller generated" or "how much seller", always interpret this as a request for the *total count of sellers*.
    - If the user asks for "potential revenue from deals" or "amount of deals acquired" (including "amount of closed win"), and no specific timeframe is given, default to providing the *total revenue from all 'Closed Won' deals (all time)*.
    - If the user provides a timeframe after asking about "potential revenue" or "deals acquired" (e.g., "this week"), provide the revenue for 'Closed Won' deals within that specific timeframe.
    - If a question cannot be answered by the provided general knowledge or the specific real-time data (e.g., if the data is missing for a requested item, or the query is too complex for current tools, or requires a predictive model),
      politely state that you can only answer questions based on the available information and tools. Do NOT ask clarifying questions if the answer can be inferred from the current conversation history and available tools.
    - Do not make up information or financial figures.
    """

    # Construct the final chat history for the LLM, including the system instruction and conversation turns
    llm_chat_history = [
        {"role": "user", "parts": [{"text": base_system_instruction}]}, # System instruction is the first user message
        {"role": "model", "parts": [{"text": "Hello! How can I assist you with Team1 Consulting or our CRM portal today?"}]} # Initial bot greeting
    ]

    # Append actual conversation history from frontend, ensuring no duplicate initial greeting
    for msg in chat_history_from_frontend:
        if msg['role'] == 'user' or (msg['role'] == 'model' and msg['parts'][0]['text'] != "Hello! How can I assist you with Team1 Consulting or our CRM portal today?"):
            llm_chat_history.append(msg)
    
    # Ensure the current user message is always the very last message in the history for the LLM
    # This prevents the current message from being duplicated if it's already in history due to frontend state management
    if not llm_chat_history or llm_chat_history[-1]['parts'][0]['text'] != user_message:
        llm_chat_history.append({"role": "user", "parts": [{"text": user_message}]})

    # Log the dynamic_data_context before sending to Gemini
    app.logger.info(f"Dynamic Data Context for Gemini: {dynamic_data_context}")

    payload = {
        "contents": llm_chat_history, # Send the full conversation history for context
        "generationConfig": {
            "temperature": 0.7, # Controls randomness. Lower values are more deterministic.
            "topP": 0.9,      # Nucleus sampling. Limits tokens to those with cumulative probability up to topP.
            "topK": 40        # Top-K sampling. Limits tokens to the top K most likely options.
        }
    }

    # Gemini API endpoint for text generation
    api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
    app.logger.info(f"Attempting to call Gemini API at: {api_url}")

    try:
        # Make the POST request to the Gemini API
        response = requests.post(api_url, headers={'Content-Type': 'application/json'}, json=payload)
        response.raise_for_status() # Raise an HTTPError for bad responses (4xx or 5xx)
        result = response.json()
        app.logger.info(f"Gemini API response received: {result}")

        # Extract the assistant's response from the Gemini API result
        if result.get("candidates") and result["candidates"][0].get("content") and result["candidates"][0]["content"].get("parts"):
            assistant_response = result["candidates"][0]["content"].get("parts")[0].get("text", "")
            app.logger.info(f"AI response: {assistant_response[:100]}...") # Log first 100 chars of response
            return jsonify({"response": assistant_response})
        else:
            app.logger.error(f"Unexpected Gemini API response structure or empty content: {result}")
            return jsonify({"error": "Failed to get a valid response from the AI. Unexpected structure."}), 500

    except requests.exceptions.RequestException as e:
        app.logger.error(f"Error calling Gemini API: {e}")
        return jsonify({"error": f"Failed to connect to AI service: {e}"}), 500
    except Exception as e:
        app.logger.error(f"An unexpected error occurred in Flask app: {e}")
        return jsonify({"error": f"An internal server error occurred: {e}"}), 500

if __name__ == '__main__':
    # Run the Flask app
    # host='0.0.0.0' makes the server accessible externally (e.g., from your frontend)
    # port=5000 is the port for the Flask backend
    # debug=True enables debug mode (reloads on code changes, provides debugger)
    app.run(host='0.0.0.0', port=5000, debug=True)
