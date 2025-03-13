from flask import Flask, render_template, request  # Importa o Flask, render_template e request

app = Flask(__name__)  # Cria a aplicação Flask

# Função para calcular a expressão fornecida
def calcular(expressao):
    try:
        resultado = eval(expressao)  # Usamos 'eval' para calcular a expressão matemática
        return resultado
    except Exception as e:
        return f"Erro: {str(e)}"  # Se houver erro (como divisão por zero), mostramos o erro

# Página principal da aplicação
@app.route("/", methods=["GET", "POST"])  # A rota para a página principal
def index():
    resultado = ""  # Inicializa a variável resultado (vai mostrar o resultado na página)
    if request.method == "POST":  # Se o formulário for enviado (POST)
        expressao = request.form["expressao"]  # Pega a expressão que o usuário digitou
        resultado = calcular(expressao)  # Chama a função para calcular a expressão
    return render_template("index.html", resultado=resultado)  # Retorna o HTML com o resultado

if __name__ == "__main__":
    app.run(debug=True)  # Roda a aplicação