import tkinter as tk
from tkinter import messagebox, scrolledtext
import requests

# Function to handle the submission of the IP address
def on_submit():
    ip_address = entry.get()
    if validate_ip(ip_address):
        try:
            response = fetch_data_from_ip(ip_address)
            if response.status_code == 200:
                response_text.config(state=tk.NORMAL)  # Enable text widget for editing
                response_text.delete(1.0, tk.END)  # Clear previous content
                response_text.insert(tk.END, response.text)  # Insert new content
                response_text.config(state=tk.DISABLED)  # Disable editing
            else:
                messagebox.showwarning("Failed to Get Data", f"Status code: {response.status_code}")
        except requests.RequestException as e:
            messagebox.showerror("Request Failed", f"Request failed: {e}")
    else:
        messagebox.showwarning("Invalid Input", "Please enter a valid IP address.")

# Function to validate the IP address format
def validate_ip(ip):
    parts = ip.split('.')
    if len(parts) != 4:
        return False
    for part in parts:
        if not part.isdigit() or not (0 <= int(part) <= 255):
            return False
    return True

# Function to send a GET request and return the response
def fetch_data_from_ip(ip):
    url = f"http://{ip}:80/api"
    return requests.get(url)

# Create the main window
root = tk.Tk()
root.title("Server IP Input")

# Set the window size
root.geometry("600x400")

# Create a canvas and scrollbars for vertical and horizontal scrolling
canvas = tk.Canvas(root)
scroll_y = tk.Scrollbar(root, orient="vertical", command=canvas.yview)
scroll_x = tk.Scrollbar(root, orient="horizontal", command=canvas.xview)

# Create a frame to contain the widgets, which will be placed on the canvas
frame = tk.Frame(canvas)

# Add the frame to the canvas
canvas.create_window((0, 0), window=frame, anchor="nw")

# Configure the scrollbar
canvas.configure(yscrollcommand=scroll_y.set, xscrollcommand=scroll_x.set)

# Pack the canvas and scrollbars
canvas.pack(side="left", fill="both", expand=True)
scroll_y.pack(side="right", fill="y")
scroll_x.pack(side="bottom", fill="x")

# Bind the frame's size change to the canvas scroll region update
def on_frame_configure(event):
    canvas.configure(scrollregion=canvas.bbox("all"))

frame.bind("<Configure>", on_frame_configure)

# Create a label for the IP address input
label = tk.Label(frame, text="Enter Server IP Address:")
label.pack(pady=5)

# Create an entry widget for the IP address
entry = tk.Entry(frame, width=25)
entry.pack(pady=5)

# Create a submit button
submit_button = tk.Button(frame, text="Submit", command=on_submit)
submit_button.pack(pady=10)

# Create a Text widget for displaying the server response
response_text = scrolledtext.ScrolledText(frame, wrap=tk.WORD, height=10, width=60)
response_text.pack(pady=10, fill=tk.BOTH, expand=True)
response_text.config(state=tk.DISABLED)  # Initially disable editing

# Run the application
root.mainloop()
