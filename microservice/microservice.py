from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

def retornar_todos_los_datos(df):
    return df.to_json(orient='records')


def identificar_anomalias(df):
    # Definir criterios de anomalía basados en percentiles
    ceros_anomalias = (df == 0)
    tiempo_alto = df['DurationInSeconds'] > df['DurationInSeconds'].quantile(0.99)
    velocidad_alta = df['AverageSpeedInMetersPerSecond'] > df['AverageSpeedInMetersPerSecond'].quantile(0.99)
    ritmo_bajo = df['AveragePaceInMinutesPerKilometer'] < df['AveragePaceInMinutesPerKilometer'].quantile(0.01)
    frecuencia_cardiaca_baja = df['AverageHeartRateInBeatsPerMinute'] < df['AverageHeartRateInBeatsPerMinute'].quantile(0.01)
    frecuencia_cardiaca_alta = df['AverageHeartRateInBeatsPerMinute'] > df['AverageHeartRateInBeatsPerMinute'].quantile(0.99)
    elevacion_alta = df['TotalElevationGainInMeters'] > df['TotalElevationGainInMeters'].quantile(0.99)

    # Crear nuevas columnas para marcar los valores anormales
    df['TiempoCero'] = ceros_anomalias['DurationInSeconds']
    df['VelocidadCero'] = ceros_anomalias['AverageSpeedInMetersPerSecond']
    df['RitmoCero'] = ceros_anomalias['AveragePaceInMinutesPerKilometer']
    df['FrecuenciaCero'] = ceros_anomalias['AverageHeartRateInBeatsPerMinute']
    df['ElevacionCero'] = ceros_anomalias['TotalElevationGainInMeters']
    
    df['TiempoAlto'] = tiempo_alto
    df['VelocidadAlta'] = velocidad_alta
    df['RitmoBajo'] = ritmo_bajo
    df['FrecuenciaCardiacaBaja'] = frecuencia_cardiaca_baja
    df['FrecuenciaCardiacaAlta'] = frecuencia_cardiaca_alta
    df['ElevacionAlta'] = elevacion_alta

    # Resaltar valores anormales
    for indice, fila in df.iterrows():
        if fila['TiempoCero']:
            df.at[indice, 'DurationInSeconds'] = '0*'
        if fila['VelocidadCero']:
            df.at[indice, 'AverageSpeedInMetersPerSecond'] = '0*'
        if fila['RitmoCero']:
            df.at[indice, 'AveragePaceInMinutesPerKilometer'] = '0*'
        if fila['FrecuenciaCero']:
            df.at[indice, 'AverageHeartRateInBeatsPerMinute'] = '0*'
        if fila['ElevacionCero']:
            df.at[indice, 'TotalElevationGainInMeters'] = '0*'
        if fila['TiempoAlto']:
            df.at[indice, 'DurationInSeconds'] = str(fila['DurationInSeconds']) + '*'
        if fila['VelocidadAlta']:
            df.at[indice, 'AverageSpeedInMetersPerSecond'] = str(fila['AverageSpeedInMetersPerSecond']) + '*'
        if fila['RitmoBajo']:
            df.at[indice, 'AveragePaceInMinutesPerKilometer'] = str(fila['AveragePaceInMinutesPerKilometer']) + '*'
        if fila['FrecuenciaCardiacaBaja']:
            df.at[indice, 'AverageHeartRateInBeatsPerMinute'] = str(fila['AverageHeartRateInBeatsPerMinute']) + '*'
        if fila['FrecuenciaCardiacaAlta']:
            df.at[indice, 'AverageHeartRateInBeatsPerMinute'] = str(fila['AverageHeartRateInBeatsPerMinute']) + '*'
        if fila['ElevacionAlta']:
            df.at[indice, 'TotalElevationGainInMeters'] = str(fila['TotalElevationGainInMeters']) + '*'
        

    # Filtrar actividades anómalas
    actividades_anomalas = df[tiempo_alto | velocidad_alta | ritmo_bajo | frecuencia_cardiaca_baja | frecuencia_cardiaca_alta | elevacion_alta]

    return actividades_anomalas


def identificar_registros_normales(df):
    # Definiremos criterios de anomalías basados en percentiles
    ceros_anomalias = (df == 0)
    tiempo_normal = df['DurationInSeconds'] <= df['DurationInSeconds'].quantile(0.99)
    velocidad_normal = df['AverageSpeedInMetersPerSecond'] <= df['AverageSpeedInMetersPerSecond'].quantile(0.99)
    ritmo_normal = df['AveragePaceInMinutesPerKilometer'] >= df['AveragePaceInMinutesPerKilometer'].quantile(0.01)
    frecuencia_cardiaca_normal = (df['AverageHeartRateInBeatsPerMinute'] >= df['AverageHeartRateInBeatsPerMinute'].quantile(0.01)) & (df['AverageHeartRateInBeatsPerMinute'] <= df['AverageHeartRateInBeatsPerMinute'].quantile(0.99))
    elevacion_normal = df['TotalElevationGainInMeters'] <= df['TotalElevationGainInMeters'].quantile(0.99)

    # Filtrar para obtener solo actividades normales
    actividades_normales = df[tiempo_normal & velocidad_normal & ritmo_normal & frecuencia_cardiaca_normal & elevacion_normal & ~ceros_anomalias['DurationInSeconds'] & ~ceros_anomalias['AverageSpeedInMetersPerSecond'] & ~ceros_anomalias['AveragePaceInMinutesPerKilometer'] & ~ceros_anomalias['AverageHeartRateInBeatsPerMinute'] & ~ceros_anomalias['TotalElevationGainInMeters']]

    return actividades_normales


@app.route('/all', methods=['POST'])
def analyze_data_all():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        df = pd.read_csv(file)
        # Retornar todos los datos
        todos_los_datos = retornar_todos_los_datos(df)
        # Retorna los resultados
        return jsonify({"message": "Datos cargados", "data": todos_los_datos})


@app.route('/anormal', methods=['POST'])
def analyze_data_anormal():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        df = pd.read_csv(file)
        # Identificar anomalías
        anomalias = identificar_anomalias(df)
        # Retorna los resultados del análisis
        return jsonify({"message": "Análisis completado", "data": anomalias.to_json(orient='records')})
    

@app.route('/normal', methods=['POST'])
def analyze_data_normal():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        dfn = pd.read_csv(file)
        # Identificar registros normales
        anomalias = identificar_registros_normales(dfn)
        # Retorna los resultados del análisis
        return jsonify({"message": "Análisis completado", "data": anomalias.to_json(orient='records')})

if __name__ == '__main__':
    app.run(debug=True)