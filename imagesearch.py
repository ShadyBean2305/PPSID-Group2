import webbrowser
import csv

def open_browser_tabs(start_index, drink_names):
    base_url = "https://www.google.com/search?q="
    end_index = min(start_index + 10, len(drink_names))
    
    for i, drink_name in enumerate(range(start_index, end_index)):
        drink = drink_names[drink_name].replace("#", "number") + " cocktail"
        if i == 0: # For the first tab, open a new window
            webbrowser.open_new(base_url + drink + "&tbm=isch")
        else: # For subsequent tabs, use the same window
            webbrowser.open(base_url + drink + "&tbm=isch")

    return end_index

def get_last_index():
    try:
        with open("last_index.txt", "r") as file:
            return int(file.read().strip())
    except FileNotFoundError:
        return 0

def save_last_index(index):
    with open("last_index.txt", "w") as file:
        file.write(str(index))

# Extract drink names from cocktails.csv and ensure order is maintained
def get_drink_names():
    with open('cocktails.csv', mode ='r') as file:
        csvFile = csv.reader(file)
        next(csvFile)  # skip the header
        drink_names = [row[0] for row in csvFile if row[0]]
    # Ensure the order is maintained by removing duplicates
    seen = set()
    ordered_drink_names = []
    for drink in drink_names:
        if drink not in seen:
            ordered_drink_names.append(drink)
            seen.add(drink)
    return ordered_drink_names

drink_names = get_drink_names()
start_index = get_last_index()
end_index = open_browser_tabs(start_index, drink_names)

if end_index >= len(drink_names):
    save_last_index(0)  # Reset if we've reached the end
else:
    save_last_index(end_index)
