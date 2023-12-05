from sklearn.metrics import accuracy_score, recall_score, precision_score, f1_score

class Avaliador:

    def avaliar(self, modelo, X_test, Y_test):
        """ Faz uma predição e avalia o modelo. Poderia parametrizar o tipo de
        avaliação, entre outros.
        """
        rescaledX_test = modelo.scaler.transform(X_test)
        predicoes = modelo.predict(rescaledX_test)
        return (accuracy_score(Y_test, predicoes),
                recall_score(Y_test, predicoes),
                precision_score(Y_test, predicoes),
                f1_score(Y_test, predicoes))
    
