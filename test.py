import requests

v = requests.get("https://servicodados.ibge.gov.br/api/v1/localidades/distritos").json()

v = list(map(lambda x: x['nome'], v))

print("const cities = [")
for city in v:
    print("\t\"" + city + "\",")
print("]")